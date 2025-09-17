// See PRD Section 4: Scope — MVP Features
// Onboarding screen for user introduction and permissions

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Button from '../components/Button';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    // TODO: Implement onboarding logic
    // - Request microphone permissions
    // - Show app features
    // - Navigate to home
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PronouncePal</Text>
      <Text style={styles.subtitle}>
        Practice English pronunciation with AI characters and get instant feedback
      </Text>
      
      {/* TODO: Add onboarding slides/carousel */}
      <View style={styles.features}>
        <Text style={styles.feature}>🎯 AI-powered pronunciation feedback</Text>
        <Text style={styles.feature}>🎭 Interactive scenarios with characters</Text>
        <Text style={styles.feature}>📊 Track your mistakes and progress</Text>
        <Text style={styles.feature}>🔄 Targeted drills for improvement</Text>
      </View>

      <Button
        title="Get Started"
        onPress={handleGetStarted}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    textAlign: 'left',
  },
  button: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
