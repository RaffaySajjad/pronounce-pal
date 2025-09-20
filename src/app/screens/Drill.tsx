import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types';
import { Title, Body, Caption1 } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Section } from '../../components/ui/Section';
import { palette, spacing } from '../../theme/colors';

type DrillNavigationProp = BottomTabNavigationProp<TabParamList, 'DrillsTab'>;

interface Props {
  navigation: DrillNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  drillCard: {
    marginBottom: spacing.md,
  },
  drillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scoreContainer: {
    backgroundColor: palette.surfaceLight,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  wordPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  wordButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: palette.surfaceLight,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  wordButtonActive: {
    borderColor: palette.primary,
    backgroundColor: `${palette.primary}10`,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
});

const drills = [
  {
    id: 'minimal-pairs',
    title: 'Minimal Pairs',
    description: 'Practice distinguishing similar sounds',
    difficulty: 'Beginner',
    completed: true,
  },
  {
    id: 'word-stress',
    title: 'Word Stress',
    description: 'Learn proper syllable emphasis',
    difficulty: 'Intermediate',
    completed: false,
  },
  {
    id: 'intonation',
    title: 'Intonation Patterns',
    description: 'Master sentence melody and rhythm',
    difficulty: 'Advanced',
    completed: false,
  },
];

const Drill: React.FC<Props> = ({ navigation: _ }) => {
  const [selectedDrill, setSelectedDrill] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDrillSelect = (drillId: string) => {
    setSelectedDrill(drillId);
    setCurrentScore(0);
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCurrentScore(prev => prev + 10);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return palette.success;
      case 'Intermediate':
        return palette.warning;
      case 'Advanced':
        return palette.danger;
      default:
        return palette.textMuted;
    }
  };

  if (selectedDrill) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Title style={{ marginBottom: spacing.xs }}>Minimal Pairs</Title>
            <Caption1 color={palette.textMuted}>
              Listen and choose the correct pronunciation
            </Caption1>
          </View>

          <View style={styles.scoreContainer}>
            <Title color={palette.primary} style={styles.scoreText}>
              {currentScore}
            </Title>
            <Caption1 color={palette.textMuted}>Points</Caption1>
          </View>

          <Section title="Round 1">
            <Card style={{ marginBottom: spacing.lg }}>
              <Body style={{ fontWeight: '600', marginBottom: spacing.md, textAlign: 'center' }}>
                Which word do you hear?
              </Body>
              
              <View style={styles.wordPair}>
                <TouchableOpacity 
                  style={styles.wordButton}
                  onPress={() => handleAnswer(true)}
                >
                  <Body style={{ fontWeight: '600' }}>ship</Body>
                  <Caption1 color={palette.textMuted}>/ʃɪp/</Caption1>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.wordButton}
                  onPress={() => handleAnswer(false)}
                >
                  <Body style={{ fontWeight: '600' }}>sheep</Body>
                  <Caption1 color={palette.textMuted}>/ʃiːp/</Caption1>
                </TouchableOpacity>
              </View>

              <View style={styles.actionButtons}>
                <Button
                  variant="secondary"
                  onPress={handlePlayAudio}
                  style={styles.actionButton}
                >
                  {isPlaying ? 'Playing...' : '🔊 Play Audio'}
                </Button>
                
                <Button
                  variant="ghost"
                  onPress={() => setSelectedDrill(null)}
                  style={styles.actionButton}
                >
                  Back to Drills
                </Button>
              </View>
            </Card>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
              <Chip variant="success">Great job!</Chip>
              <Chip variant="default">Keep practicing</Chip>
            </View>
          </Section>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Title style={{ marginBottom: spacing.xs }}>Pronunciation Drills</Title>
          <Caption1 color={palette.textMuted}>
            Practice specific sounds and patterns
          </Caption1>
        </View>

        <Section>
          {drills.map((drill) => (
            <TouchableOpacity
              key={drill.id}
              onPress={() => handleDrillSelect(drill.id)}
            >
              <Card style={styles.drillCard}>
                <View style={styles.drillHeader}>
                  <Body style={{ fontWeight: '600' }}>{drill.title}</Body>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                    <Chip variant="default">
                      <Caption1 color={getDifficultyColor(drill.difficulty)}>
                        {drill.difficulty}
                      </Caption1>
                    </Chip>
                    {drill.completed && (
                      <Chip variant="success">
                        <Caption1>✓</Caption1>
                      </Chip>
                    )}
                  </View>
                </View>

                <Body color={palette.textMuted}>
                  {drill.description}
                </Body>
              </Card>
            </TouchableOpacity>
          ))}
        </Section>
      </View>
    </SafeAreaView>
  );
};

export default Drill;