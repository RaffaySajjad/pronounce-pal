import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TabParamList } from '../../types';
import { Title, Subtitle, Body, Caption } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Section } from '../../components/ui/Section';
import { palette, spacing } from '../../theme/colors';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeTab'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeNavigationProp;
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
  greeting: {
    marginBottom: spacing.xs,
  },
  streakCard: {
    marginBottom: spacing.lg,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  streakBadge: {
    backgroundColor: `${palette.success}20`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContent: {
    flex: 1,
  },
  progressText: {
    marginBottom: spacing.xs,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: palette.border,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  progressFill: {
    width: '60%',
    height: 8,
    backgroundColor: palette.primary,
    borderRadius: 4,
  },
  streakIcon: {
    width: 48,
    height: 48,
    backgroundColor: `${palette.primary}20`,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  actionButtons: {
    gap: spacing.md,
  },
  button: {
    width: '100%',
    marginBottom: spacing.md,
  },
  lastButton: {
    width: '100%',
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  recentText: {
    marginBottom: spacing.sm,
  },
});

const Home: React.FC<Props> = ({ navigation }) => {
  const handleStartConversation = () => {
    navigation.navigate('Session', { scenarioId: 'coffee-shop' });
  };

  const handlePracticeDrills = () => {
    navigation.navigate('DrillsTab');
  };

  const handleViewProgress = () => {
    navigation.navigate('ProfileTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Title style={styles.greeting}>Good morning! 👋</Title>
            <Caption color={palette.textMuted}>
              Ready to practice your pronunciation?
            </Caption>
          </View>

          <Section>
            <Card variant="elevated" style={styles.streakCard}>
              <View style={styles.streakHeader}>
                <Subtitle>Daily Streak</Subtitle>
                <View style={styles.streakBadge}>
                  <Caption color={palette.success} style={{ fontWeight: '600' }}>7 days</Caption>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressContent}>
                  <Body color={palette.textMuted} style={styles.progressText}>Today's Progress</Body>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View style={styles.progressFill} />
                    </View>
                    <Caption color={palette.textMuted}>3/5</Caption>
                  </View>
                </View>
                <View style={styles.streakIcon}>
                  <Body color={palette.primary} style={{ fontSize: 18 }}>🔥</Body>
                </View>
              </View>
            </Card>

            <View style={styles.actionButtons}>
              <Button
                variant="primary"
                onPress={handleStartConversation}
                style={styles.button}
              >
                Start Conversation
              </Button>

              <Button
                variant="secondary"
                onPress={handlePracticeDrills}
                style={styles.button}
              >
                Practice Drills
              </Button>

              <Button
                variant="ghost"
                onPress={handleViewProgress}
                style={styles.lastButton}
              >
                View Progress
              </Button>
            </View>
          </Section>

          <Section title="Recent Activity">
            <Card>
              <View style={styles.recentHeader}>
                <Body style={{ fontWeight: '600' }}>Coffee Shop Scenario</Body>
                <Caption color={palette.success}>Completed</Caption>
              </View>
              <Body color={palette.textMuted} style={styles.recentText}>
                Pronunciation accuracy: 87%
              </Body>
              <Caption color={palette.textMuted}>2 hours ago</Caption>
            </Card>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;