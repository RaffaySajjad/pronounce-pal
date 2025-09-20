import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList, TabParamList } from '../../types';
import {
  LargeTitle,
  Title1,
  Title2,
  Title3,
  Headline,
  Body,
  Callout,
  Subheadline,
  Caption1
} from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Icon } from '../../components/ui/Icon';
import { gradients } from '../../lib/gradients';
import { palette, spacing, radius, elevation } from '../../theme/colors';

const { width } = Dimensions.get('window');

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
  scrollContent: {
    paddingBottom: spacing[8],
  },

  // Header Section
  header: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[6],
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  greetingContainer: {
    marginBottom: spacing[6],
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    marginBottom: spacing[1],
  },
  statLabel: {
    textAlign: 'center',
    opacity: 0.8,
  },

  // Content Section
  content: {
    paddingHorizontal: spacing[6],
  },

  // Quick Actions
  quickActionsSection: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    marginBottom: spacing[4],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  quickActionCard: {
    width: (width - spacing[6] * 2 - spacing[3]) / 2,
    aspectRatio: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: radius['2xl'],
    backgroundColor: palette.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  quickActionTitle: {
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  quickActionSubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },

  // Progress Section
  progressSection: {
    marginBottom: spacing[8],
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressIcon: {
    width: 60,
    height: 60,
    borderRadius: radius['2xl'],
    backgroundColor: palette.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    marginBottom: spacing[1],
  },
  progressSubtitle: {
    marginBottom: spacing[2],
  },
  progressBar: {
    height: 8,
    backgroundColor: palette.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '65%',
    borderRadius: radius.sm,
  },

  // Recent Activity Section
  recentSection: {
    marginBottom: spacing[8],
  },
  activityList: {
    gap: spacing[3],
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: palette.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    marginBottom: spacing[0.5],
  },
  activityTime: {
    opacity: 0.6,
  },
  activityChip: {
    alignSelf: 'flex-start',
  },

  // Recommendations Section
  recommendationsSection: {
    marginBottom: spacing[8],
  },
  recommendationsList: {
    gap: spacing[3],
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  recommendationIcon: {
    marginRight: spacing[3],
  },
  recommendationContent: {
    flex: 1,
    marginRight: spacing[3],
  },
  recommendationTitle: {
    marginBottom: spacing[1],
  },

  // CTA Section
  ctaSection: {
    marginBottom: spacing[6],
  },
  ctaCard: {
    alignItems: 'center',
    padding: spacing[6],
  },
  ctaIcon: {
    marginBottom: spacing[4],
  },
  ctaTitle: {
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  ctaSubtitle: {
    textAlign: 'center',
    marginBottom: spacing[6],
    opacity: 0.8,
  },
  ctaButton: {
    width: '100%',
  },
});

const Home: React.FC<Props> = ({ navigation }) => {
  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const statsOpacity = useSharedValue(0);
  const statsTranslateY = useSharedValue(30);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(40);

  useEffect(() => {
    // Staggered animations for premium feel
    headerOpacity.value = withDelay(100, withSpring(1));
    headerTranslateY.value = withDelay(100, withSpring(0));

    statsOpacity.value = withDelay(300, withSpring(1));
    statsTranslateY.value = withDelay(300, withSpring(0));

    contentOpacity.value = withDelay(500, withSpring(1));
    contentTranslateY.value = withDelay(500, withSpring(0));
  }, []);

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
    transform: [{ translateY: statsTranslateY.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const handleStartPractice = () => {
    navigation.navigate('ScenariosTab');
  };

  const handlePracticeDrills = () => {
    navigation.navigate('DrillsTab');
  };

  const handleViewProfile = () => {
    navigation.navigate('ProfileTab');
  };

  const handleStartSession = () => {
    navigation.navigate('Session', { scenarioId: 'coffee-shop' });
  };

  const quickActions = [
    {
      title: 'Start Session',
      subtitle: 'AI conversation practice',
      icon: 'mic' as const,
      onPress: handleStartSession,
      color: palette.primary,
    },
    {
      title: 'Practice Drills',
      subtitle: 'Targeted exercises',
      icon: 'target' as const,
      onPress: handlePracticeDrills,
      color: palette.secondary,
    },
    {
      title: 'View Progress',
      subtitle: 'Track improvement',
      icon: 'trending-up' as const,
      onPress: handleViewProfile,
      color: palette.accent,
    },
    {
      title: 'Scenarios',
      subtitle: 'Real-world practice',
      icon: 'users' as const,
      onPress: handleStartPractice,
      color: palette.success,
    },
  ];

  const recentActivities = [
    {
      title: 'Completed Restaurant Scenario',
      time: '2 hours ago',
      type: 'success',
      icon: 'check-circle' as const,
    },
    {
      title: 'Practiced TH sounds',
      time: '1 day ago',
      type: 'drill',
      icon: 'target' as const,
    },
    {
      title: 'Achieved 7-day streak!',
      time: '2 days ago',
      type: 'achievement',
      icon: 'trophy' as const,
    },
  ];

  const recommendations = [
    {
      title: 'Practice R sounds',
      subtitle: 'Based on recent mistakes',
      icon: 'brain' as const,
      action: 'Practice',
    },
    {
      title: 'Try Job Interview scenario',
      subtitle: 'New challenge available',
      icon: 'users' as const,
      action: 'Start',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <LinearGradient
            colors={gradients.heroSoft}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          <Animated.View style={headerAnimatedStyle}>
            <View style={styles.greetingContainer}>
              <View style={styles.greetingRow}>
                <View>
                  <Title2 color={palette.textOnPrimary}>Good morning!</Title2>
                  <Body color={palette.textOnPrimary} style={{ opacity: 0.9 }}>
                    Ready to improve your pronunciation?
                  </Body>
                </View>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="user"
                  onPress={handleViewProfile}
                  style={styles.profileButton}
                />
              </View>
            </View>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View style={[styles.statsContainer, statsAnimatedStyle]}>
            <Card variant="glass" padding="md" style={styles.statCard}>
              <Title1 color={palette.textOnPrimary} style={styles.statNumber}>7</Title1>
              <Caption1 color={palette.textOnPrimary} style={styles.statLabel}>
                Day Streak
              </Caption1>
            </Card>

            <Card variant="glass" padding="md" style={styles.statCard}>
              <Title1 color={palette.textOnPrimary} style={styles.statNumber}>24</Title1>
              <Caption1 color={palette.textOnPrimary} style={styles.statLabel}>
                Sessions
              </Caption1>
            </Card>

            <Card variant="glass" padding="md" style={styles.statCard}>
              <Title1 color={palette.textOnPrimary} style={styles.statNumber}>89%</Title1>
              <Caption1 color={palette.textOnPrimary} style={styles.statLabel}>
                Accuracy
              </Caption1>
            </Card>
          </Animated.View>
        </View>

        {/* Content Section */}
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Title3 style={styles.sectionTitle}>Quick Actions</Title3>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  padding="lg"
                  style={styles.quickActionCard}
                  onPress={action.onPress}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                    <Icon name={action.icon} size="lg" color={action.color} />
                  </View>
                  <Headline style={styles.quickActionTitle}>{action.title}</Headline>
                  <Caption1 style={styles.quickActionSubtitle}>{action.subtitle}</Caption1>
                </Card>
              ))}
            </View>
          </View>

          {/* Progress Overview */}
          <View style={styles.progressSection}>
            <Title3 style={styles.sectionTitle}>Today's Progress</Title3>
            <Card variant="elevated" padding="lg" style={styles.progressCard}>
              <View style={styles.progressIcon}>
                <Icon name="trending-up" size="lg" color={palette.success} />
              </View>
              <View style={styles.progressContent}>
                <Headline style={styles.progressTitle}>Great progress!</Headline>
                <Subheadline style={styles.progressSubtitle}>
                  2 of 3 daily goals completed
                </Subheadline>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={gradients.success}
                    style={styles.progressFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </View>
            </Card>
          </View>

          {/* Recent Activity */}
          <View style={styles.recentSection}>
            <Title3 style={styles.sectionTitle}>Recent Activity</Title3>
            <View style={styles.activityList}>
              {recentActivities.map((activity, index) => (
                <Card key={index} variant="default" padding="none" style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Icon name={activity.icon} size="md" color={palette.accent} />
                  </View>
                  <View style={styles.activityContent}>
                    <Callout style={styles.activityTitle}>{activity.title}</Callout>
                    <Caption1 style={styles.activityTime}>{activity.time}</Caption1>
                  </View>
                  <Chip
                    variant={activity.type === 'success' ? 'success' : 'primary'}
                    size="sm"
                    style={styles.activityChip}
                  >
                    {activity.type}
                  </Chip>
                </Card>
              ))}
            </View>
          </View>

          {/* Recommendations */}
          <View style={styles.recommendationsSection}>
            <Title3 style={styles.sectionTitle}>Recommended for You</Title3>
            <View style={styles.recommendationsList}>
              {recommendations.map((rec, index) => (
                <Card key={index} variant="outlined" style={styles.recommendationCard}>
                  <Icon
                    name={rec.icon}
                    size="lg"
                    color={palette.primary}
                    style={styles.recommendationIcon}
                  />
                  <View style={styles.recommendationContent}>
                    <Callout style={styles.recommendationTitle}>{rec.title}</Callout>
                    <Caption1>{rec.subtitle}</Caption1>
                  </View>
                  <Button variant="ghost" size="sm">
                    {rec.action}
                  </Button>
                </Card>
              ))}
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Card variant="gradient" padding="none" style={styles.ctaCard}>
              <Icon name="zap" size="2xl" color={palette.textOnPrimary} style={styles.ctaIcon} />
              <Title3 color={palette.textOnPrimary} style={styles.ctaTitle}>
                Ready for your next challenge?
              </Title3>
              <Body color={palette.textOnPrimary} style={styles.ctaSubtitle}>
                Start a new conversation and keep improving!
              </Body>
              <Button
                variant="glass"
                size="lg"
                icon="mic"
                onPress={handleStartSession}
                style={styles.ctaButton}
              >
                Start Practice Session
              </Button>
            </Card>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;