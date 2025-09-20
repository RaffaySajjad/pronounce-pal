import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import {
  LargeTitle,
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

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

interface UserStats {
  totalSessions: number;
  streakDays: number;
  accuracy: number;
  wordsImproved: number;
  totalMinutes: number;
  level: string;
  xp: number;
  nextLevelXp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: Date;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgLight,
  },

  // Header
  header: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[6],
    alignItems: 'center',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
    ...elevation.lg,
    shadowColor: palette.shadow,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: palette.primary + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  userEmail: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: spacing[4],
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: spacing[4],
  },

  // Content
  content: {
    paddingHorizontal: spacing[6],
  },

  // Stats Section
  statsSection: {
    marginBottom: spacing[8],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  statCard: {
    width: (width - spacing[6] * 2 - spacing[3]) / 2,
    alignItems: 'center',
    padding: spacing[4],
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  statNumber: {
    marginBottom: spacing[1],
  },
  statLabel: {
    textAlign: 'center',
    opacity: 0.7,
  },

  // Progress Section
  progressSection: {
    marginBottom: spacing[8],
  },
  levelCard: {
    padding: spacing[6],
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  levelBadge: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    backgroundColor: palette.primary + '20',
    marginBottom: spacing[3],
  },
  xpContainer: {
    width: '100%',
    marginTop: spacing[4],
  },
  xpBar: {
    height: 8,
    backgroundColor: palette.borderLight,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginTop: spacing[2],
  },
  xpFill: {
    height: '100%',
    borderRadius: radius.sm,
  },
  xpText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Achievements Section
  achievementsSection: {
    marginBottom: spacing[8],
  },
  achievementsList: {
    gap: spacing[3],
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    marginBottom: spacing[0.5],
  },
  achievementDate: {
    opacity: 0.6,
  },

  // Settings Section
  settingsSection: {
    marginBottom: spacing[8],
  },
  settingsList: {
    gap: spacing[1],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: palette.cardLight,
    borderRadius: radius.lg,
    marginBottom: spacing[2],
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: spacing[0.5],
  },
  settingDescription: {
    opacity: 0.7,
  },

  // Premium Section
  premiumSection: {
    marginBottom: spacing[8],
  },
  premiumCard: {
    alignItems: 'center',
    padding: spacing[8],
  },
  premiumIcon: {
    marginBottom: spacing[4],
  },
  premiumTitle: {
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  premiumDescription: {
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: spacing[6],
  },
  premiumFeatures: {
    alignSelf: 'stretch',
    marginBottom: spacing[6],
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  premiumFeatureIcon: {
    marginRight: spacing[2],
  },

  // Account Actions
  accountSection: {
    marginBottom: spacing[8],
  },
  dangerZone: {
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTopWidth: 1,
    borderTopColor: palette.borderLight,
  },
  logoutButton: {
    width: '100%',
  },
});

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // State
  const [isPremium, setIsPremium] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Animations
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const statsOpacity = useSharedValue(0);

  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: null,
    joinedDate: new Date('2024-01-15'),
  };

  const userStats: UserStats = {
    totalSessions: 47,
    streakDays: 12,
    accuracy: 89,
    wordsImproved: 156,
    totalMinutes: 340,
    level: 'Intermediate',
    xp: 2450,
    nextLevelXp: 3000,
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Practiced for 7 consecutive days',
      icon: 'zap',
      unlocked: true,
      date: new Date('2024-01-20'),
    },
    {
      id: '2',
      title: 'Perfect Score',
      description: 'Achieved 100% accuracy in a session',
      icon: 'trophy',
      unlocked: true,
      date: new Date('2024-01-18'),
    },
    {
      id: '3',
      title: 'Quick Learner',
      description: 'Improved 50 words',
      icon: 'brain',
      unlocked: true,
      date: new Date('2024-01-22'),
    },
    {
      id: '4',
      title: 'Pronunciation Master',
      description: 'Complete 100 sessions',
      icon: 'award',
      unlocked: false,
    },
  ];

  useEffect(() => {
    // Staggered animations
    headerOpacity.value = withDelay(100, withSpring(1));
    contentOpacity.value = withDelay(300, withSpring(1));
    statsOpacity.value = withDelay(500, withSpring(1));
  }, []);

  const handleUpgradeToPremium = () => {
    navigation.navigate('Paywall');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            HapticFeedback.trigger('notificationWarning');
            navigation.navigate('Onboarding');
          },
        },
      ]
    );
  };

  const handleSettingToggle = (setting: string, value: boolean) => {
    HapticFeedback.trigger('impactLight');
    switch (setting) {
      case 'notifications':
        setNotifications(value);
        break;
      case 'haptics':
        setHaptics(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        break;
    }
  };

  const xpProgress = userStats.xp / userStats.nextLevelXp;

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: interpolate(headerOpacity.value, [0, 1], [-20, 0]) }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: interpolate(contentOpacity.value, [0, 1], [30, 0]) }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
    transform: [{ translateY: interpolate(statsOpacity.value, [0, 1], [40, 0]) }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={headerAnimatedStyle}>
          <View style={styles.header}>
            <LinearGradient
              colors={gradients.primary}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />

            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Icon name="user" size="2xl" color={palette.primary} />
              </View>
            </View>

            <Title2 color={palette.textOnPrimary} style={styles.userName}>
              {userData.name}
            </Title2>
            <Body color={palette.textOnPrimary} style={styles.userEmail}>
              {userData.email}
            </Body>

            <View style={styles.subscriptionBadge}>
              <Icon
                name={isPremium ? "star" : "zap"}
                size="sm"
                color={palette.textOnPrimary}
              />
              <Caption1
                color={palette.textOnPrimary}
                weight="semibold"
                style={{ marginLeft: spacing[1] }}
              >
                {isPremium ? 'Premium Member' : 'Free Account'}
              </Caption1>
            </View>

            <Button
              variant="glass"
              size="sm"
              icon="edit"
              onPress={handleEditProfile}
            >
              Edit Profile
            </Button>
          </View>
        </Animated.View>

        <View style={styles.content}>
          {/* Stats Section */}
          <Animated.View style={[styles.statsSection, statsAnimatedStyle]}>
            <Title3 style={{ marginBottom: spacing[4] }}>Your Progress</Title3>
            <View style={styles.statsGrid}>
              <Card variant="elevated" padding="none" style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: palette.primary + '20' }]}>
                  <Icon name="calendar" size="lg" color={palette.primary} />
                </View>
                <Title2 style={styles.statNumber}>{userStats.streakDays}</Title2>
                <Caption1 style={styles.statLabel}>Day Streak</Caption1>
              </Card>

              <Card variant="elevated" padding="none" style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: palette.success + '20' }]}>
                  <Icon name="target" size="lg" color={palette.success} />
                </View>
                <Title2 style={styles.statNumber}>{userStats.accuracy}%</Title2>
                <Caption1 style={styles.statLabel}>Accuracy</Caption1>
              </Card>

              <Card variant="elevated" padding="none" style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: palette.accent + '20' }]}>
                  <Icon name="book" size="lg" color={palette.accent} />
                </View>
                <Title2 style={styles.statNumber}>{userStats.totalSessions}</Title2>
                <Caption1 style={styles.statLabel}>Sessions</Caption1>
              </Card>

              <Card variant="elevated" padding="none" style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: palette.warning + '20' }]}>
                  <Icon name="trending-up" size="lg" color={palette.warning} />
                </View>
                <Title2 style={styles.statNumber}>{userStats.wordsImproved}</Title2>
                <Caption1 style={styles.statLabel}>Words Improved</Caption1>
              </Card>
            </View>
          </Animated.View>

          {/* Progress Level */}
          <Animated.View style={[styles.progressSection, contentAnimatedStyle]}>
            <Title3 style={{ marginBottom: spacing[4] }}>Level Progress</Title3>
            <Card variant="gradient" padding="none" style={styles.levelCard}>
              <View style={styles.levelBadge}>
                <Caption1 color={palette.primary} weight="semibold">
                  {userStats.level}
                </Caption1>
              </View>
              <Title2 color={palette.textOnPrimary}>Level 8</Title2>
              <Body color={palette.textOnPrimary} style={{ opacity: 0.9 }}>
                Keep practicing to reach Level 9!
              </Body>

              <View style={styles.xpContainer}>
                <View style={styles.xpText}>
                  <Caption1 color={palette.textOnPrimary}>
                    {userStats.xp} XP
                  </Caption1>
                  <Caption1 color={palette.textOnPrimary}>
                    {userStats.nextLevelXp} XP
                  </Caption1>
                </View>
                <View style={styles.xpBar}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
                    style={[styles.xpFill, { width: `${xpProgress * 100}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </View>
            </Card>
          </Animated.View>

          {/* Achievements */}
          <Animated.View style={[styles.achievementsSection, contentAnimatedStyle]}>
            <Title3 style={{ marginBottom: spacing[4] }}>Achievements</Title3>
            <View style={styles.achievementsList}>
              {achievements.slice(0, 3).map((achievement) => (
                <Card
                  key={achievement.id}
                  variant="default"
                  padding="none"
                  style={styles.achievementCard}
                >
                  <View style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.unlocked
                        ? palette.success + '20'
                        : palette.textMuted + '20'
                    }
                  ]}>
                    <Icon
                      name={achievement.icon as any}
                      size="lg"
                      color={achievement.unlocked ? palette.success : palette.textMuted}
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <Callout style={styles.achievementTitle}>
                      {achievement.title}
                    </Callout>
                    <Caption1>{achievement.description}</Caption1>
                    {achievement.date && (
                      <Caption1 style={styles.achievementDate}>
                        {achievement.date.toLocaleDateString()}
                      </Caption1>
                    )}
                  </View>
                  {achievement.unlocked && (
                    <Icon name="check-circle" size="md" color={palette.success} />
                  )}
                </Card>
              ))}
            </View>
          </Animated.View>

          {/* Premium Upgrade */}
          {!isPremium && (
            <Animated.View style={[styles.premiumSection, contentAnimatedStyle]}>
              <Card variant="gradient" padding="none" style={styles.premiumCard}>
                <Icon
                  name="star"
                  size="3xl"
                  color={palette.textOnPrimary}
                  style={styles.premiumIcon}
                />
                <Title3 color={palette.textOnPrimary} style={styles.premiumTitle}>
                  Upgrade to Premium
                </Title3>
                <Body color={palette.textOnPrimary} style={styles.premiumDescription}>
                  Unlock advanced features and accelerate your learning
                </Body>

                <View style={styles.premiumFeatures}>
                  {[
                    'Unlimited practice sessions',
                    'Advanced pronunciation analysis',
                    'Personalized learning paths',
                    'Detailed progress insights'
                  ].map((feature, index) => (
                    <View key={index} style={styles.premiumFeature}>
                      <Icon
                        name="check"
                        size="sm"
                        color={palette.textOnPrimary}
                        style={styles.premiumFeatureIcon}
                      />
                      <Caption1 color={palette.textOnPrimary}>{feature}</Caption1>
                    </View>
                  ))}
                </View>

                <Button
                  variant="glass"
                  size="lg"
                  icon="star"
                  onPress={handleUpgradeToPremium}
                  style={{ width: '100%' }}
                >
                  Upgrade Now
                </Button>
              </Card>
            </Animated.View>
          )}

          {/* Settings */}
          <Animated.View style={[styles.settingsSection, contentAnimatedStyle]}>
            <Title3 style={{ marginBottom: spacing[4] }}>Settings</Title3>
            <View style={styles.settingsList}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: palette.info + '20' }]}>
                    <Icon name="bell" size="md" color={palette.info} />
                  </View>
                  <View style={styles.settingContent}>
                    <Callout style={styles.settingTitle}>Notifications</Callout>
                    <Caption1 style={styles.settingDescription}>
                      Daily reminders and progress updates
                    </Caption1>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={(value) => handleSettingToggle('notifications', value)}
                  trackColor={{ false: palette.border, true: palette.primary + '40' }}
                  thumbColor={notifications ? palette.primary : palette.textMuted}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: palette.warning + '20' }]}>
                    <Icon name="zap" size="md" color={palette.warning} />
                  </View>
                  <View style={styles.settingContent}>
                    <Callout style={styles.settingTitle}>Haptic Feedback</Callout>
                    <Caption1 style={styles.settingDescription}>
                      Vibration for interactions
                    </Caption1>
                  </View>
                </View>
                <Switch
                  value={haptics}
                  onValueChange={(value) => handleSettingToggle('haptics', value)}
                  trackColor={{ false: palette.border, true: palette.primary + '40' }}
                  thumbColor={haptics ? palette.primary : palette.textMuted}
                />
              </View>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: palette.accent + '20' }]}>
                    <Icon name="headphones" size="md" color={palette.accent} />
                  </View>
                  <View style={styles.settingContent}>
                    <Callout style={styles.settingTitle}>Audio Settings</Callout>
                    <Caption1 style={styles.settingDescription}>
                      Voice speed and quality
                    </Caption1>
                  </View>
                </View>
                <Icon name="chevron-right" size="md" color={palette.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: palette.secondary + '20' }]}>
                    <Icon name="shield" size="md" color={palette.secondary} />
                  </View>
                  <View style={styles.settingContent}>
                    <Callout style={styles.settingTitle}>Privacy</Callout>
                    <Caption1 style={styles.settingDescription}>
                      Data and privacy settings
                    </Caption1>
                  </View>
                </View>
                <Icon name="chevron-right" size="md" color={palette.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: palette.success + '20' }]}>
                    <Icon name="help-circle" size="md" color={palette.success} />
                  </View>
                  <View style={styles.settingContent}>
                    <Callout style={styles.settingTitle}>Help & Support</Callout>
                    <Caption1 style={styles.settingDescription}>
                      Get help and contact us
                    </Caption1>
                  </View>
                </View>
                <Icon name="chevron-right" size="md" color={palette.textMuted} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Account Actions */}
          <Animated.View style={[styles.accountSection, contentAnimatedStyle]}>
            <View style={styles.dangerZone}>
              <Button
                variant="danger"
                size="lg"
                icon="log-out"
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                Sign Out
              </Button>
            </View>

            <View style={{ alignItems: 'center', marginTop: spacing[6] }}>
              <Caption1 style={{ opacity: 0.6, marginBottom: spacing[1] }}>
                PronouncePal v1.0.0
              </Caption1>
              <Caption1 style={{ opacity: 0.6 }}>
                Member since {userData.joinedDate.toLocaleDateString()}
              </Caption1>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;