import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import {
  Title1,
  Title2,
  Title3,
  Headline,
  Body,
  Callout,
  Subheadline,
  Caption1,
  FootnoteEmphasized
} from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Icon } from '../../components/ui/Icon';
import { gradients } from '../../lib/gradients';
import { palette, spacing, radius, elevation } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

type SessionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Session'>;
type SessionScreenRouteProp = RouteProp<RootStackParamList, 'Session'>;

interface Props {
  navigation: SessionScreenNavigationProp;
  route: SessionScreenRouteProp;
}

interface Message {
  id: string;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
  feedback?: PronunciationFeedback;
}

interface PronunciationFeedback {
  accuracy: number;
  mistakes: Array<{
    word: string;
    correct: string;
    phonetic: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  suggestions: string[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },

  // Header
  header: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing[3],
  },
  headerInfo: {
    flex: 1,
  },
  scenarioTitle: {
    marginBottom: spacing[0.5],
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterAvatar: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: palette.success + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[1.5],
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: palette.success,
    marginLeft: spacing[2],
  },

  // Chat Area
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  messageWrapper: {
    marginBottom: spacing[4],
  },

  // AI Messages
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  aiMessage: {
    maxWidth: width * 0.8,
    backgroundColor: palette.cardLight,
    borderRadius: radius.xl,
    borderBottomLeftRadius: radius.sm,
    padding: spacing[4],
    ...elevation.sm,
    shadowColor: palette.shadow,
  },
  aiMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: palette.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[2],
  },

  // User Messages
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  userMessage: {
    maxWidth: width * 0.8,
    borderRadius: radius.xl,
    borderBottomRightRadius: radius.sm,
    padding: spacing[4],
    ...elevation.sm,
  },
  userMessageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.xl,
    borderBottomRightRadius: radius.sm,
  },

  // System Messages
  systemMessage: {
    alignItems: 'center',
    marginVertical: spacing[2],
  },
  systemMessageContent: {
    backgroundColor: palette.bgLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
  },

  // Pronunciation Feedback
  feedbackContainer: {
    marginTop: spacing[3],
    padding: spacing[3],
    backgroundColor: palette.bgLight,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.borderLight,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
  },
  mistakesList: {
    gap: spacing[2],
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[2],
    backgroundColor: palette.cardLight,
    borderRadius: radius.md,
    borderLeftWidth: 3,
  },
  mistakeContent: {
    flex: 1,
    marginLeft: spacing[2],
  },

  // Recording Controls
  recordingContainer: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    backgroundColor: palette.cardLight,
    borderTopWidth: 1,
    borderTopColor: palette.borderLight,
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...elevation.lg,
  },
  recordButtonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.full,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: spacing[4],
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginLeft: spacing[3],
  },
  waveBar: {
    width: 3,
    backgroundColor: palette.primary,
    borderRadius: radius.sm,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: spacing[2],
    marginRight: spacing[4],
  },

  // Loading States
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  typingDots: {
    flexDirection: 'row',
    gap: spacing[1],
    marginLeft: spacing[2],
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: palette.textMuted,
  },
});

const SessionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { scenarioId } = route.params || { scenarioId: 'coffee-shop' };

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Refs
  const scrollViewRef = useRef<ScrollView>(null);

  // Animations
  const recordButtonScale = useSharedValue(1);
  const waveformHeights = [
    useSharedValue(8),
    useSharedValue(12),
    useSharedValue(16),
    useSharedValue(10),
    useSharedValue(14),
  ];
  const typingDotOpacities = [
    useSharedValue(0.3),
    useSharedValue(0.3),
    useSharedValue(0.3),
  ];

  // Scenario data
  const scenarioData = {
    title: 'Coffee Shop Order',
    character: {
      name: 'Emma',
      role: 'Barista',
      personality: 'Friendly and helpful',
    },
    initialMessage: "Hi there! Welcome to Brew & Bean Coffee. What can I get started for you today?",
  };

  useEffect(() => {
    if (!sessionStarted) {
      initializeSession();
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      // Animate waveform
      waveformHeights.forEach((height, index) => {
        height.value = withRepeat(
          withSequence(
            withTiming(Math.random() * 20 + 8, { duration: 300 }),
            withTiming(Math.random() * 20 + 8, { duration: 300 })
          ),
          -1,
          true
        );
      });
    } else {
      waveformHeights.forEach(height => {
        height.value = withTiming(8, { duration: 200 });
      });
    }
  }, [isRecording]);

  useEffect(() => {
    if (isTyping) {
      typingDotOpacities.forEach((opacity, index) => {
        opacity.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.3, { duration: 400 })
          ),
          -1,
          true
        );
      });
    } else {
      typingDotOpacities.forEach(opacity => {
        opacity.value = withTiming(0.3, { duration: 200 });
      });
    }
  }, [isTyping]);

  const initializeSession = () => {
    const initialMessage: Message = {
      id: '1',
      type: 'system',
      content: 'Session started. Tap the microphone to begin speaking.',
      timestamp: new Date(),
    };

    const aiMessage: Message = {
      id: '2',
      type: 'ai',
      content: scenarioData.initialMessage,
      timestamp: new Date(),
    };

    setMessages([initialMessage, aiMessage]);
    setSessionStarted(true);
  };

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      HapticFeedback.trigger('impactLight');
      recordButtonScale.value = withSpring(1.1);

      // Simulate recording for 3 seconds
      setTimeout(() => {
        handleStopRecording();
      }, 3000);
    } else {
      handleStopRecording();
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    recordButtonScale.value = withSpring(1);

    // Simulate processing user speech
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: "Hi, I'd like to order a large coffee please.",
      timestamp: new Date(),
      feedback: {
        accuracy: 87,
        mistakes: [
          {
            word: 'coffee',
            correct: 'COF-fee',
            phonetic: '/ˈkɔːfi/',
            severity: 'low',
          }
        ],
        suggestions: ['Try emphasizing the first syllable: COF-fee'],
      },
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "Perfect! A large coffee coming right up. Would you like that hot or iced today?",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }, 500);
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Session',
      'Are you sure you want to end this practice session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return palette.success;
    if (accuracy >= 70) return palette.warning;
    return palette.danger;
  };

  const getMistakeSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return palette.danger;
      case 'medium': return palette.warning;
      default: return palette.info;
    }
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'ai':
        return (
          <View key={message.id} style={[styles.messageWrapper, styles.aiMessageContainer]}>
            <Card variant="default" padding="none" style={styles.aiMessage}>
              <View style={styles.aiMessageHeader}>
                <View style={styles.aiAvatar}>
                  <Icon name="user-check" size="sm" color={palette.primary} />
                </View>
                <Callout weight="semibold">{scenarioData.character.name}</Callout>
                <Caption1 style={{ marginLeft: spacing[1], opacity: 0.6 }}>
                  {scenarioData.character.role}
                </Caption1>
              </View>
              <Body>{message.content}</Body>
            </Card>
          </View>
        );

      case 'user':
        return (
          <View key={message.id} style={[styles.messageWrapper, styles.userMessageContainer]}>
            <Card variant="gradient" padding="none" style={styles.userMessage}>
              <LinearGradient
                colors={gradients.primary}
                style={styles.userMessageGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <Body color={palette.textOnPrimary}>{message.content}</Body>

              {message.feedback && (
                <View style={styles.feedbackContainer}>
                  <View style={styles.feedbackHeader}>
                    <Callout weight="semibold">Pronunciation Feedback</Callout>
                    <View style={[
                      styles.accuracyBadge,
                      { backgroundColor: getAccuracyColor(message.feedback.accuracy) + '20' }
                    ]}>
                      <Icon
                        name="target"
                        size="xs"
                        color={getAccuracyColor(message.feedback.accuracy)}
                      />
                      <Caption1
                        color={getAccuracyColor(message.feedback.accuracy)}
                        weight="semibold"
                        style={{ marginLeft: spacing[1] }}
                      >
                        {message.feedback.accuracy}%
                      </Caption1>
                    </View>
                  </View>

                  {message.feedback.mistakes.length > 0 && (
                    <View style={styles.mistakesList}>
                      {message.feedback.mistakes.map((mistake, index) => (
                        <View
                          key={index}
                          style={[
                            styles.mistakeItem,
                            { borderLeftColor: getMistakeSeverityColor(mistake.severity) }
                          ]}
                        >
                          <Icon
                            name="alert-circle"
                            size="sm"
                            color={getMistakeSeverityColor(mistake.severity)}
                          />
                          <View style={styles.mistakeContent}>
                            <FootnoteEmphasized>
                              {mistake.word} → {mistake.correct}
                            </FootnoteEmphasized>
                            <Caption1 style={{ opacity: 0.7 }}>
                              {mistake.phonetic}
                            </Caption1>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {message.feedback.suggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      variant="info"
                      size="sm"
                      icon="lightbulb"
                      style={{ marginTop: spacing[2] }}
                    >
                      {suggestion}
                    </Chip>
                  ))}
                </View>
              )}
            </Card>
          </View>
        );

      case 'system':
        return (
          <View key={message.id} style={styles.systemMessage}>
            <View style={styles.systemMessageContent}>
              <Caption1 style={{ opacity: 0.7 }}>{message.content}</Caption1>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const recordButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: recordButtonScale.value }],
  }));

  const waveformAnimatedStyles = waveformHeights.map(height =>
    useAnimatedStyle(() => ({
      height: height.value,
    }))
  );

  const typingDotAnimatedStyles = typingDotOpacities.map(opacity =>
    useAnimatedStyle(() => ({
      opacity: opacity.value,
    }))
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={gradients.surface}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Button
                variant="ghost"
                size="sm"
                icon="arrow-left"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              />
              <View style={styles.headerInfo}>
                <Headline style={styles.scenarioTitle}>{scenarioData.title}</Headline>
                <View style={styles.characterInfo}>
                  <View style={styles.characterAvatar}>
                    <Icon name="user-check" size="xs" color={palette.success} />
                  </View>
                  <Caption1>{scenarioData.character.name}</Caption1>
                  <View style={styles.statusIndicator} />
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Button variant="ghost" size="sm" icon="more-horizontal" />
            </View>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}

          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.aiAvatar}>
                <Icon name="user-check" size="sm" color={palette.primary} />
              </View>
              <Caption1>{scenarioData.character.name} is typing</Caption1>
              <View style={styles.typingDots}>
                {typingDotAnimatedStyles.map((style, index) => (
                  <Animated.View key={index} style={[styles.typingDot, style]} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        
        {/* Recording Controls */}
        <View style={styles.recordingContainer}>
          <View style={styles.recordingControls}>
            <Animated.View style={recordButtonAnimatedStyle}>
              <TouchableOpacity
                style={styles.recordButton}
                onPress={handleRecord}
                disabled={isTyping}
              >
                <LinearGradient
                  colors={isRecording ? gradients.danger : gradients.primary}
                  style={styles.recordButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Icon
                  name={isRecording ? "x" : "mic"}
                  size="lg"
                  color={palette.textOnPrimary}
                />
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.recordingIndicator}>
              {isRecording ? (
                <>
                  <Icon name="mic" size="sm" color={palette.danger} />
                  <Caption1 color={palette.danger} weight="semibold" style={{ marginLeft: spacing[2] }}>
                    Recording...
                  </Caption1>
                  <View style={styles.waveform}>
                    {waveformAnimatedStyles.map((style, index) => (
                      <Animated.View key={index} style={[styles.waveBar, style]} />
                    ))}
                  </View>
                </>
              ) : (
                <Caption1 style={{ opacity: 0.7 }}>
                  Tap microphone to speak
                </Caption1>
              )}
            </View>

            <Button
              variant="ghost"
              size="sm"
              icon="x"
              onPress={handleEndSession}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SessionScreen;