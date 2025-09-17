// See PRD Section 4: Scope — MVP Features
// User profile screen with settings and progress overview

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Button from '../components/Button';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

// Mock user data - TODO: Replace with actual user state
const MOCK_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  subscriptionStatus: 'free' as 'free' | 'premium',
  joinedDate: '2024-01-15',
  totalSessions: 12,
  totalMistakes: 45,
  improvedWords: 23,
  streakDays: 5,
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const handleUpgradeToPremium = () => {
    navigation.navigate('Paywall');
  };

  const handleEditProfile = () => {
    // TODO: Navigate to profile edit screen
    Alert.alert('Edit Profile', 'Profile editing will be implemented soon!');
  };

  const handleViewProgress = () => {
    // TODO: Navigate to detailed progress screen
    Alert.alert('Progress Details', 'Detailed progress tracking will be implemented soon!');
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
    Alert.alert('Settings', 'Settings screen will be implemented soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Clear user session and navigate to onboarding
            navigation.navigate('Onboarding');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>{MOCK_USER.name}</Text>
        <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
        
        <View style={styles.subscriptionBadge}>
          <Text style={styles.subscriptionText}>
            {MOCK_USER.subscriptionStatus === 'premium' ? '⭐ Premium' : '🆓 Free'}
          </Text>
        </View>

        {MOCK_USER.subscriptionStatus !== 'premium' && (
          <Button
            title="Upgrade to Premium"
            onPress={handleUpgradeToPremium}
            style={styles.upgradeButton}
          />
        )}
      </View>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{MOCK_USER.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{MOCK_USER.improvedWords}</Text>
            <Text style={styles.statLabel}>Words Improved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{MOCK_USER.totalMistakes}</Text>
            <Text style={styles.statLabel}>Mistakes Fixed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{MOCK_USER.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        <Button
          title="View Detailed Progress"
          onPress={handleViewProgress}
          variant="outline"
          style={styles.progressButton}
        />
      </View>

      {/* Account Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.actionItem} onPress={handleEditProfile}>
          <Text style={styles.actionText}>✏️ Edit Profile</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleSettings}>
          <Text style={styles.actionText}>⚙️ Settings</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <Text style={styles.actionText}>📊 Practice History</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <Text style={styles.actionText}>🎯 Mistake Analysis</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <Text style={styles.actionText}>❓ Help & Support</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <Text style={styles.actionText}>📄 Privacy Policy</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionItem, styles.logoutAction]} 
          onPress={handleLogout}
        >
          <Text style={[styles.actionText, styles.logoutText]}>🚪 Logout</Text>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfoSection}>
        <Text style={styles.appVersion}>PronouncePal v1.0.0</Text>
        <Text style={styles.joinedDate}>
          Member since {new Date(MOCK_USER.joinedDate).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  userSection: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd6fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  subscriptionBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  subscriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  upgradeButton: {
    marginTop: 8,
  },
  statsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  progressButton: {
    marginTop: 8,
  },
  actionsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionText: {
    fontSize: 16,
    color: '#374151',
  },
  actionArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  logoutAction: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#dc2626',
  },
  appInfoSection: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  appVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProfileScreen;
