import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { RootStackParamList } from '../../types';
import { Title, Subtitle, Body, Caption1 } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { palette, spacing } from '../../theme/colors';

const AnimatedView = Animated.createAnimatedComponent(View);

type SessionNavigationProp = StackNavigationProp<RootStackParamList, 'Session'>;
type SessionRouteProp = RouteProp<RootStackParamList, 'Session'>;

interface Props {
  navigation: SessionNavigationProp;
  route: SessionRouteProp;
}

const MIC_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  startHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scenarioIcon: {
    width: 80,
    height: 80,
    backgroundColor: `${palette.primary}20`,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  instructionsList: {
    gap: spacing.sm,
  },
  sessionContainer: {
    flex: 1,
  },
  characterSection: {
    backgroundColor: palette.surfaceLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  characterAvatar: {
    width: 64,
    height: 64,
    backgroundColor: `${palette.primary}20`,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  recordingSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  micButton: {
    width: MIC_SIZE,
    height: MIC_SIZE,
    borderRadius: MIC_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: palette.danger,
  },
  micButtonIdle: {
    backgroundColor: palette.primary,
  },
  feedbackChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  controls: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  ringAnimation: {
    position: 'absolute',
    backgroundColor: `${palette.primary}30`,
    borderRadius: MIC_SIZE,
  },
});

const Session: React.FC<Props> = ({ navigation, route }) => {
  const { scenarioId } = route.params;
  console.log('Session started for scenario:', scenarioId);
  
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const scale = useSharedValue(1);
  const ringScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    width: MIC_SIZE * 2,
    height: MIC_SIZE * 2,
  }));

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    HapticFeedback.trigger('impactLight');
    
    if (!isRecording) {
      // Start recording animation
      ringScale.value = withRepeat(
        withTiming(1.3, { duration: 1000 }),
        -1,
        true
      );
    } else {
      // Stop recording animation
      ringScale.value = withTiming(1, { duration: 200 });
    }
  };

  const handleStartSession = () => {
    setSessionStarted(true);
  };

  const handleEndSession = () => {
    navigation.goBack();
  };

  if (!sessionStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startContainer}>
          <View style={styles.startHeader}>
            <View style={styles.scenarioIcon}>
              <Body color={palette.primary} style={{ fontSize: 24 }}>☕</Body>
            </View>
            <Title style={{ textAlign: 'center', marginBottom: spacing.md }}>Ready to Practice?</Title>
            <Subtitle color={palette.textMuted} style={{ textAlign: 'center', marginBottom: spacing.xl }}>
              Coffee Shop Scenario
            </Subtitle>
          </View>

          <Card variant="elevated" style={{ marginBottom: spacing.xl }}>
            <Body style={{ fontWeight: '600', marginBottom: spacing.md }}>Instructions:</Body>
            <View style={styles.instructionsList}>
              <Body color={palette.textMuted}>• Speak clearly into your microphone</Body>
              <Body color={palette.textMuted}>• Listen to Sarah's responses</Body>
              <Body color={palette.textMuted}>• Follow the conversation naturally</Body>
              <Body color={palette.textMuted}>• Get real-time pronunciation feedback</Body>
            </View>
          </Card>

          <Button size="lg" onPress={handleStartSession} style={{ width: '100%' }}>
            Start Practice Session
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sessionContainer}>
        {/* Character Section */}
        <View style={styles.characterSection}>
          <View style={styles.characterAvatar}>
            <Body color={palette.primary} style={{ fontSize: 20 }}>👩‍💼</Body>
          </View>
          <Subtitle style={{ marginBottom: spacing.md }}>Sarah (Barista)</Subtitle>
          <Card style={{ maxWidth: 280 }}>
            <Body color={palette.primary} style={{ textAlign: 'center' }}>
              "Hi! Welcome to our coffee shop. What can I get started for you today?"
            </Body>
          </Card>
        </View>

        {/* Recording Section */}
        <View style={styles.recordingSection}>
          <Caption1 color={palette.textMuted} style={{ textAlign: 'center', marginBottom: spacing.md }}>
            Your turn to speak:
          </Caption1>
          
          <Body color={palette.textMuted} style={{ textAlign: 'center', marginBottom: spacing.xl, fontStyle: 'italic' }}>
            Try saying: "Hi, I'd like to order a large coffee please"
          </Body>

          {/* Microphone Button */}
          <View style={styles.micContainer}>
            {isRecording && (
              <AnimatedView
                style={[styles.ringAnimation, ringStyle]}
              />
            )}
            <TouchableOpacity
              onPress={handleMicPress}
              style={[
                styles.micButton,
                isRecording ? styles.micButtonRecording : styles.micButtonIdle
              ]}
            >
              <Body color={palette.textOnPrimary} style={{ fontSize: 24 }}>
                {isRecording ? '⏹️' : '🎤'}
              </Body>
            </TouchableOpacity>
          </View>

          {/* Live Caption1 Area */}
          <Card style={{ width: '100%', marginBottom: spacing.lg }}>
            <Caption1 color={palette.textMuted} style={{ textAlign: 'center', fontStyle: 'italic' }}>
              {isRecording ? 'Listening...' : 'Tap microphone to speak'}
            </Caption1>
          </Card>

          {/* Feedback Chips */}
          <View style={styles.feedbackChips}>
            <Chip variant="success" delay={0}>
              Great pace!
            </Chip>
            <Chip variant="warning" delay={200}>
              Work on "coffee"
            </Chip>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Button
            variant="secondary"
            onPress={handleEndSession}
            style={{ width: '100%' }}
          >
            End Session
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Session;