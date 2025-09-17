// See PRD Section 4: Scope — MVP Features
// Home screen with quick actions and progress overview

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Button from '../components/Button';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartPractice = () => {
    navigation.navigate('ScenarioPicker');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const handlePracticeDrills = () => {
    // TODO: Navigate to drill selection or generate new drill
    navigation.navigate('Drill', { drillId: 'sample-drill-1' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.subtitle}>Ready to practice your pronunciation?</Text>
      </View>

      {/* TODO: Add progress overview widget */}
      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Today's Progress</Text>
        <Text style={styles.progressText}>0 sessions completed</Text>
        <Text style={styles.progressText}>0 mistakes corrected</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <Button
          title="Start Practice Session"
          onPress={handleStartPractice}
          style={styles.actionButton}
        />
        
        <Button
          title="Practice Drills"
          onPress={handlePracticeDrills}
          variant="secondary"
          style={styles.actionButton}
        />
        
        <Button
          title="View Profile"
          onPress={handleViewProfile}
          variant="outline"
          style={styles.actionButton}
        />
      </View>

      {/* TODO: Add recent mistakes widget */}
      <View style={styles.mistakesCard}>
        <Text style={styles.cardTitle}>Recent Mistakes</Text>
        <Text style={styles.emptyState}>No mistakes tracked yet. Start practicing!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  actionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  mistakesCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyState: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
