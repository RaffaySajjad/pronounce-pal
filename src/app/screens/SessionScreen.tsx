// See PRD Section 4: Scope — MVP Features  
// Main practice session screen with AI character interaction

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Button from '../components/Button';

type SessionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Session'
>;

type SessionScreenRouteProp = RouteProp<RootStackParamList, 'Session'>;

interface Props {
  navigation: SessionScreenNavigationProp;
  route: SessionScreenRouteProp;
}

const SessionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { scenarioId } = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // TODO: Replace with actual scenario data from API
  // Using scenarioId for future API integration
  console.log('Session started for scenario:', scenarioId);
  const scenarioTitle = 'Coffee Shop Order';
  const characterName = 'Sarah (Barista)';

  const handleStartSession = () => {
    setSessionStarted(true);
    // TODO: Initialize speech recognition
    // TODO: Load scenario dialogue
  };

  const handleStartRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // TODO: Start speech recognition
      // TODO: Send audio to speech API
    } else {
      setIsRecording(false);
      // TODO: Stop recording and process speech
    }
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Session',
      'Are you sure you want to end this practice session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            // TODO: Save session data
            // TODO: Navigate to results/home
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const handleViewMistakes = () => {
    // TODO: Show mistakes modal or navigate to mistakes screen
    Alert.alert('Mistakes', 'Mistakes tracking will be implemented soon!');
  };

  if (!sessionStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.setupContainer}>
          <Text style={styles.title}>Get Ready to Practice</Text>
          <Text style={styles.subtitle}>Scenario: {scenarioTitle}</Text>
          <Text style={styles.character}>You'll be talking with: {characterName}</Text>
          
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            <Text style={styles.instruction}>• Speak clearly into your microphone</Text>
            <Text style={styles.instruction}>• Listen to the character's responses</Text>
            <Text style={styles.instruction}>• Follow the scenario dialogue</Text>
            <Text style={styles.instruction}>• Get real-time pronunciation feedback</Text>
          </View>

          <Button
            title="Start Practice Session"
            onPress={handleStartSession}
            style={styles.startButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Character Section */}
      <View style={styles.characterSection}>
        <View style={styles.characterAvatar}>
          <Text style={styles.avatarText}>👩‍💼</Text>
        </View>
        <Text style={styles.characterName}>{characterName}</Text>
        <View style={styles.speechBubble}>
          <Text style={styles.characterSpeech}>
            "Hi! Welcome to our coffee shop. What can I get started for you today?"
          </Text>
        </View>
      </View>

      {/* Recording Section */}
      <View style={styles.recordingSection}>
        <Text style={styles.promptText}>Your turn to speak:</Text>
        <Text style={styles.suggestionText}>
          Try saying: "Hi, I'd like to order a large coffee please"
        </Text>
        
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
          onPress={handleStartRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '🔴 Recording...' : '🎤 Tap to Speak'}
          </Text>
        </TouchableOpacity>

        {/* TODO: Add real-time pronunciation feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>
            Pronunciation feedback will appear here
          </Text>
        </View>
      </View>

      {/* Session Controls */}
      <View style={styles.controlsSection}>
        <Button
          title="View Mistakes"
          onPress={handleViewMistakes}
          variant="outline"
          style={styles.controlButton}
        />
        <Button
          title="End Session"
          onPress={handleEndSession}
          variant="secondary"
          style={styles.controlButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  setupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#2563eb',
    marginBottom: 4,
    textAlign: 'center',
  },
  character: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
  startButton: {
    marginTop: 20,
  },
  characterSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  characterAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd6fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  speechBubble: {
    backgroundColor: '#e0e7ff',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: '90%',
  },
  characterSpeech: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
  recordingSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    fontStyle: 'italic',
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  recordButtonActive: {
    backgroundColor: '#dc2626',
  },
  recordButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  feedbackText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default SessionScreen;
