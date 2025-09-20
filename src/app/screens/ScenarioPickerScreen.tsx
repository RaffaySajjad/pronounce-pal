// See PRD Section 4: Scope — MVP Features
// Screen for selecting practice scenarios

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Scenario } from '../../types';

type ScenarioPickerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScenarioPicker'
>;

interface Props {
  navigation: ScenarioPickerScreenNavigationProp;
}

// Mock scenarios - TODO: Replace with API call
const MOCK_SCENARIOS: Scenario[] = [
  {
    id: 'scenario-1',
    title: 'Coffee Shop Order',
    description: 'Practice ordering coffee and asking questions at a café',
    difficulty: 'beginner',
    category: 'Daily Life',
    estimatedDuration: 5,
    estimatedMinutes: 5,
    isPremium: false,
  },
  {
    id: 'scenario-2',
    title: 'Job Interview',
    description: 'Prepare for common interview questions and responses',
    difficulty: 'intermediate',
    category: 'Professional',
    estimatedDuration: 10,
    estimatedMinutes: 10,
    isPremium: true,
  },
  {
    id: 'scenario-3',
    title: 'Doctor Appointment',
    description: 'Learn to describe symptoms and understand medical advice',
    difficulty: 'intermediate',
    category: 'Healthcare',
    estimatedDuration: 8,
    estimatedMinutes: 8,
    isPremium: false,
  },
];

const ScenarioPickerScreen: React.FC<Props> = ({ navigation }) => {
  const handleScenarioSelect = (scenario: Scenario) => {
    // TODO: Check if premium required
    navigation.navigate('Session', { scenarioId: scenario.id });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Scenario</Text>
        <Text style={styles.subtitle}>Select a practice scenario to get started</Text>
      </View>

      <View style={styles.scenariosContainer}>
        {MOCK_SCENARIOS.map((scenario) => (
          <TouchableOpacity
            key={scenario.id}
            style={styles.scenarioCard}
            onPress={() => handleScenarioSelect(scenario)}
          >
            <View style={styles.scenarioHeader}>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(scenario.difficulty) },
                ]}
              >
                <Text style={styles.difficultyText}>
                  {scenario.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <Text style={styles.scenarioDescription}>{scenario.description}</Text>
            
            <View style={styles.scenarioMeta}>
              <Text style={styles.metaText}>📂 {scenario.category}</Text>
              <Text style={styles.metaText}>⏱️ ~{scenario.estimatedDuration} min</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* TODO: Add premium upgrade prompt */}
      <View style={styles.premiumPrompt}>
        <Text style={styles.premiumText}>
          Want more scenarios? Upgrade to Premium for 50+ scenarios!
        </Text>
        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() => navigation.navigate('Paywall')}
        >
          <Text style={styles.premiumButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  scenariosContainer: {
    padding: 16,
  },
  scenarioCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  scenarioMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  premiumPrompt: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    alignItems: 'center',
  },
  premiumText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 12,
  },
  premiumButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ScenarioPickerScreen;
