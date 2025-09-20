import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
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
import { RootStackParamList, Drill } from '../../types';
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

const { width } = Dimensions.get('window');

type DrillScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drill'>;
type DrillScreenRouteProp = RouteProp<RootStackParamList, 'Drill'>;

interface Props {
  navigation: DrillScreenNavigationProp;
  route: DrillScreenRouteProp;
}

interface DrillWord {
  word: string;
  phonetic: string;
  audio?: string;
  tip: string;
}

interface DrillExercise {
  id: string;
  type: 'minimal-pairs' | 'shadowing' | 'tongue-twister' | 'stress-pattern';
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  words: DrillWord[];
  pairs?: Array<{ word1: DrillWord; word2: DrillWord }>;
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
    backgroundColor: palette.cardLight,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
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

  // Progress
  progressSection: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    backgroundColor: palette.cardLight,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  progressBar: {
    height: 8,
    backgroundColor: palette.borderLight,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.sm,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[6],
  },

  // Drill Card
  drillCard: {
    marginBottom: spacing[6],
    alignItems: 'center',
    padding: spacing[6],
  },
  drillIcon: {
    width: 80,
    height: 80,
    borderRadius: radius['2xl'],
    backgroundColor: palette.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  drillTitle: {
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  drillDescription: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: spacing[4],
  },
  difficultyBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.lg,
    marginBottom: spacing[4],
  },

  // Word Practice
  wordPracticeSection: {
    marginBottom: spacing[6],
  },
  currentWordCard: {
    alignItems: 'center',
    padding: spacing[8],
    marginBottom: spacing[4],
  },
  wordText: {
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  phoneticText: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: spacing[4],
    opacity: 0.8,
  },
  playButton: {
    marginBottom: spacing[4],
  },

  // Minimal Pairs
  pairsSection: {
    marginBottom: spacing[6],
  },
  pairCard: {
    marginBottom: spacing[4],
  },
  pairContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: spacing[6],
  },
  pairWord: {
    alignItems: 'center',
    flex: 1,
  },
  pairDivider: {
    width: 2,
    height: 40,
    backgroundColor: palette.border,
    marginHorizontal: spacing[4],
  },

  // Tips Section
  tipsSection: {
    marginBottom: spacing[6],
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing[4],
    backgroundColor: palette.infoLight,
    borderLeftWidth: 4,
    borderLeftColor: palette.info,
  },
  tipIcon: {
    marginRight: spacing[3],
    marginTop: spacing[0.5],
  },
  tipContent: {
    flex: 1,
  },

  // Recording Section
  recordingSection: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
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
  recordingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginLeft: spacing[3],
  },
  waveBar: {
    width: 3,
    backgroundColor: palette.danger,
    borderRadius: radius.sm,
  },

  // Feedback Section
  feedbackSection: {
    marginBottom: spacing[6],
  },
  feedbackCard: {
    padding: spacing[4],
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
  },
  feedbackList: {
    gap: spacing[2],
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[2],
    backgroundColor: palette.bgLight,
    borderRadius: radius.md,
    borderLeftWidth: 3,
  },
  feedbackContent: {
    flex: 1,
    marginLeft: spacing[2],
  },

  // Controls
  controlsSection: {
    flexDirection: 'row',
    gap: spacing[3],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: palette.borderLight,
  },
  controlButton: {
    flex: 1,
  },
});

const DrillScreen: React.FC<Props> = ({ navigation, route }) => {
  const { drillId } = route.params || { drillId: 'th-sounds' };

  // State
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Animations
  const recordButtonScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);
  const waveformHeights = [
    useSharedValue(8),
    useSharedValue(12),
    useSharedValue(16),
    useSharedValue(10),
    useSharedValue(14),
  ];

  // Mock drill data
  const drillData: DrillExercise = {
    id: drillId,
    type: 'minimal-pairs',
    title: 'TH Sounds Practice',
    description: 'Master the difference between /θ/ and /ð/ sounds',
    difficulty: 'intermediate',
    words: [
      {
        word: 'think',
        phonetic: '/θɪŋk/',
        tip: 'Place tongue between teeth, blow air gently'
      },
      {
        word: 'this',
        phonetic: '/ðɪs/',
        tip: 'Voice the TH sound, tongue touches teeth'
      },
      {
        word: 'through',
        phonetic: '/θruː/',
        tip: 'Voiceless TH followed by R sound'
      },
      {
        word: 'brother',
        phonetic: '/ˈbrʌðər/',
        tip: 'Voiced TH in the middle of the word'
      }
    ],
    pairs: [
      {
        word1: { word: 'think', phonetic: '/θɪŋk/', tip: 'Voiceless TH' },
        word2: { word: 'sink', phonetic: '/sɪŋk/', tip: 'S sound' }
      },
      {
        word1: { word: 'this', phonetic: '/ðɪs/', tip: 'Voiced TH' },
        word2: { word: 'dis', phonetic: '/dɪs/', tip: 'D sound' }
      }
    ]
  };

  const currentWord = drillData.words[currentWordIndex];
  const progress = (currentWordIndex + 1) / drillData.words.length;
  const isLastWord = currentWordIndex === drillData.words.length - 1;

  useEffect(() => {
    progressWidth.value = withSpring(progress);
  }, [currentWordIndex]);

  useEffect(() => {
    if (isRecording) {
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

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setShowFeedback(false);
      HapticFeedback.trigger('impactLight');
      recordButtonScale.value = withSpring(1.1);

      // Simulate recording for 2 seconds
      setTimeout(() => {
        handleStopRecording();
      }, 2000);
    } else {
      handleStopRecording();
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    recordButtonScale.value = withSpring(1);

    // Simulate feedback
    const mockFeedback = {
      accuracy: Math.floor(Math.random() * 30) + 70, // 70-100%
      mistakes: Math.random() > 0.5 ? [
        {
          issue: 'TH sound needs more tongue placement',
          suggestion: 'Place tongue firmly between teeth',
          severity: 'medium'
        }
      ] : [],
      strengths: ['Good rhythm', 'Clear vowel sounds']
    };

    setFeedback(mockFeedback);
    setShowFeedback(true);
    HapticFeedback.trigger('notificationSuccess');
  };

  const handleNextWord = () => {
    if (isLastWord) {
      Alert.alert(
        'Drill Complete!',
        `Great job! You completed the ${drillData.title} drill.`,
        [
          { text: 'Practice Again', onPress: () => setCurrentWordIndex(0) },
          { text: 'Back to Home', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const handleSkip = () => {
    if (isLastWord) {
      navigation.goBack();
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const handlePlayExample = () => {
    HapticFeedback.trigger('impactLight');
    // TODO: Play audio example
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return palette.success;
      case 'intermediate': return palette.warning;
      case 'advanced': return palette.danger;
      default: return palette.primary;
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return palette.success;
    if (accuracy >= 70) return palette.warning;
    return palette.danger;
  };

  const recordButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: recordButtonScale.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  const waveformAnimatedStyles = waveformHeights.map(height =>
    useAnimatedStyle(() => ({
      height: height.value,
    }))
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
              <Headline>Pronunciation Drills</Headline>
              <Caption1 style={{ opacity: 0.7 }}>{drillData.title}</Caption1>
            </View>
          </View>

          <Button variant="ghost" size="sm" icon="more-horizontal" />
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Caption1>
            Word {currentWordIndex + 1} of {drillData.words.length}
          </Caption1>
          <Caption1 weight="semibold">
            {Math.round(progress * 100)}% Complete
          </Caption1>
        </View>
        <View style={styles.progressBar}>
          <Animated.View style={[progressAnimatedStyle]}>
            <LinearGradient
              colors={gradients.primary}
              style={{ height: '100%', borderRadius: radius.sm }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Drill Info */}
        <Card variant="gradient" padding="none" style={styles.drillCard}>
          <View style={styles.drillIcon}>
            <Icon name="target" size="2xl" color={palette.primary} />
          </View>
          <Title3 color={palette.textOnPrimary} style={styles.drillTitle}>
            {drillData.title}
          </Title3>
          <Body color={palette.textOnPrimary} style={styles.drillDescription}>
            {drillData.description}
          </Body>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(drillData.difficulty) + '30' }
          ]}>
            <Caption1
              color={getDifficultyColor(drillData.difficulty)}
              weight="semibold"
            >
              {drillData.difficulty.toUpperCase()}
            </Caption1>
          </View>
        </Card>
        
        {/* Current Word */}
        <View style={styles.wordPracticeSection}>
          <Card variant="elevated" padding="none" style={styles.currentWordCard}>
            <Title1 style={styles.wordText}>{currentWord.word}</Title1>
            <Callout style={styles.phoneticText}>{currentWord.phonetic}</Callout>
            <Button
              variant="secondary"
              size="sm"
              icon="volume"
              onPress={handlePlayExample}
              style={styles.playButton}
          >
              Play Example
            </Button>
          </Card>
        </View>

        {/* Minimal Pairs (if applicable) */}
        {drillData.pairs && (
          <View style={styles.pairsSection}>
            <Title3 style={{ marginBottom: spacing[4] }}>Compare Sounds</Title3>
            {drillData.pairs.map((pair, index) => (
              <Card key={index} variant="outlined" padding="none" style={styles.pairCard}>
                <View style={styles.pairContent}>
                  <TouchableOpacity style={styles.pairWord} onPress={handlePlayExample}>
                    <Headline>{pair.word1.word}</Headline>
                    <Caption1 style={{ opacity: 0.7 }}>{pair.word1.phonetic}</Caption1>
                    <Icon name="volume" size="sm" color={palette.primary} style={{ marginTop: spacing[1] }} />
                  </TouchableOpacity>

                  <View style={styles.pairDivider} />

                  <TouchableOpacity style={styles.pairWord} onPress={handlePlayExample}>
                    <Headline>{pair.word2.word}</Headline>
                    <Caption1 style={{ opacity: 0.7 }}>{pair.word2.phonetic}</Caption1>
                    <Icon name="volume" size="sm" color={palette.primary} style={{ marginTop: spacing[1] }} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Pronunciation Tip */}
        <View style={styles.tipsSection}>
          <View style={styles.tipCard}>
            <Icon name="lightbulb" size="md" color={palette.info} style={styles.tipIcon} />
            <View style={styles.tipContent}>
              <FootnoteEmphasized color={palette.info}>Pronunciation Tip</FootnoteEmphasized>
              <Caption1 color={palette.info} style={{ marginTop: spacing[1] }}>
                {currentWord.tip}
              </Caption1>
            </View>
          </View>
        </View>

        {/* Recording Section */}
        <View style={styles.recordingSection}>
          <Animated.View style={recordButtonAnimatedStyle}>
            <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
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

          <View style={styles.recordingStatus}>
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
                Tap to practice pronunciation
              </Caption1>
            )}
          </View>
        </View>

        {/* Feedback */}
        {showFeedback && feedback && (
          <View style={styles.feedbackSection}>
            <Card variant="elevated" padding="none" style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <Callout weight="semibold">Pronunciation Feedback</Callout>
                <View style={[
                  styles.accuracyBadge,
                  { backgroundColor: getAccuracyColor(feedback.accuracy) + '20' }
                ]}>
                  <Icon
                    name="target"
                    size="xs"
                    color={getAccuracyColor(feedback.accuracy)}
                  />
                  <Caption1
                    color={getAccuracyColor(feedback.accuracy)}
                    weight="semibold"
                    style={{ marginLeft: spacing[1] }}
                  >
                    {feedback.accuracy}%
                  </Caption1>
                </View>
              </View>

              <View style={styles.feedbackList}>
                {feedback.mistakes.map((mistake: any, index: number) => (
                  <View key={index} style={[
                    styles.feedbackItem,
                    { borderLeftColor: palette.warning }
                  ]}>
                    <Icon name="alert-circle" size="sm" color={palette.warning} />
                    <View style={styles.feedbackContent}>
                      <FootnoteEmphasized>{mistake.issue}</FootnoteEmphasized>
                      <Caption1 style={{ opacity: 0.7, marginTop: spacing[0.5] }}>
                        {mistake.suggestion}
                      </Caption1>
                    </View>
                  </View>
                ))}

                {feedback.strengths.map((strength: string, index: number) => (
                  <View key={`strength-${index}`} style={[
                    styles.feedbackItem,
                    { borderLeftColor: palette.success }
                  ]}>
                    <Icon name="check-circle" size="sm" color={palette.success} />
                    <View style={styles.feedbackContent}>
                      <FootnoteEmphasized color={palette.success}>{strength}</FootnoteEmphasized>
                    </View>
      </View>
                ))}
              </View>
            </Card>
          </View>
        )}

      {/* Controls */}
        <View style={styles.controlsSection}>
        <Button
            variant="secondary"
            size="md"
            icon="skip-forward"
            onPress={handleSkip}
          style={styles.controlButton}
          >
            Skip
          </Button>

        <Button
            variant="primary"
            size="md"
            icon="arrow-right"
            iconPosition="right"
          onPress={handleNextWord}
          style={styles.controlButton}
            disabled={!showFeedback && !isRecording}
          >
            {isLastWord ? 'Finish' : 'Next'}
          </Button>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrillScreen;
