import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types';
import { Title, Body, Caption1 } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ListItem } from '../../components/ui/ListItem';
import { Section } from '../../components/ui/Section';
import { Chip } from '../../components/ui/Chip';
import { palette, spacing, radius } from '../../theme/colors';

type ProfileNavigationProp = BottomTabNavigationProp<TabParamList, 'ProfileTab'>;

interface Props {
  navigation: ProfileNavigationProp;
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: `${palette.primary}20`,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  nameContainer: {
    marginBottom: spacing.xs,
  },
  emailContainer: {
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.xs / 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  subscriptionText: {
    marginBottom: spacing.lg,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    backgroundColor: palette.primary,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButton: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  accountActions: {
    marginTop: spacing.xl,
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  upgradeButton: {
    width: '100%',
  },
  signOutButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
});

const Profile: React.FC<Props> = ({ navigation: _ }) => {
  const handleUpgrade = () => {
    // TODO: Navigate to paywall
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Title color={palette.primary}>👤</Title>
            </View>
            
            <Title style={styles.nameContainer}>John Doe</Title>
            <Caption1 color={palette.textMuted} style={styles.emailContainer}>john.doe@email.com</Caption1>
            
            <Chip variant="warning">Free Plan</Chip>
          </View>

          {/* Stats Grid */}
          <Section title="Your Progress">
            <View style={styles.statsRow}>
              <Card variant="default" style={styles.statsCard}>
                <Title color={palette.primary} style={{ marginBottom: spacing.xs }}>127</Title>
                <Caption1 color={palette.textMuted} style={{ textAlign: 'center' }}>
                  Sessions Completed
                </Caption1>
              </Card>
              
              <Card variant="default" style={styles.statsCard}>
                <Title color={palette.success} style={{ marginBottom: spacing.xs }}>87%</Title>
                <Caption1 color={palette.textMuted} style={{ textAlign: 'center' }}>
                  Avg. Accuracy
                </Caption1>
              </Card>
            </View>

            <View style={styles.statsRow}>
              <Card variant="default" style={styles.statsCard}>
                <Title color={palette.warning} style={{ marginBottom: spacing.xs }}>23</Title>
                <Caption1 color={palette.textMuted} style={{ textAlign: 'center' }}>
                  Day Streak
                </Caption1>
              </Card>
              
              <Card variant="default" style={styles.statsCard}>
                <Title color={palette.primary} style={{ marginBottom: spacing.xs }}>4.2h</Title>
                <Caption1 color={palette.textMuted} style={{ textAlign: 'center' }}>
                  Practice Time
                </Caption1>
              </Card>
            </View>
          </Section>

          {/* Subscription */}
          <Section title="Subscription">
            <Card>
              <View style={styles.subscriptionHeader}>
                <Body style={{ fontWeight: '600' }}>Current Plan</Body>
                <Chip variant="warning">Free</Chip>
              </View>
              
              <Body color={palette.textMuted} style={styles.subscriptionText}>
                Upgrade to Premium for unlimited scenarios and advanced features
              </Body>
              
              <Button onPress={handleUpgrade} style={styles.upgradeButton}>
                Upgrade to Premium
              </Button>
            </Card>
          </Section>

          {/* Settings */}
          <Section title="Settings">
            <Card>
              <ListItem
                title="Notifications"
                subtitle="Practice reminders and updates"
                rightElement={
                  <TouchableOpacity style={styles.toggleContainer}>
                    <View style={styles.toggleButton} />
                  </TouchableOpacity>
                }
              />
              
              <ListItem
                title="Audio Quality"
                subtitle="High quality audio processing"
                rightElement={<Caption1 color={palette.textMuted}>High</Caption1>}
              />
              
              <ListItem
                title="Practice Reminders"
                subtitle="Daily practice notifications"
                rightElement={<Caption1 color={palette.textMuted}>8:00 AM</Caption1>}
              />
            </Card>
          </Section>

          {/* Support */}
          <Section title="Support">
            <Card>
              <ListItem
                title="Help Center"
                subtitle="FAQs and tutorials"
                rightElement={<Caption1 color={palette.textMuted}>›</Caption1>}
              />
              
              <ListItem
                title="Contact Support"
                subtitle="Get help from our team"
                rightElement={<Caption1 color={palette.textMuted}>›</Caption1>}
              />
              
              <ListItem
                title="Privacy Policy"
                subtitle="How we protect your data"
                rightElement={<Caption1 color={palette.textMuted}>›</Caption1>}
              />
              
              <ListItem
                title="Terms of Service"
                subtitle="App usage terms"
                rightElement={<Caption1 color={palette.textMuted}>›</Caption1>}
              />
            </Card>
          </Section>

          {/* Account Actions */}
          <View style={styles.accountActions}>
            <Button
              variant="ghost"
              style={styles.signOutButton}
            >
              Sign Out
            </Button>
            
            <TouchableOpacity style={styles.deleteButton}>
              <Caption1 color={palette.danger}>Delete Account</Caption1>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;