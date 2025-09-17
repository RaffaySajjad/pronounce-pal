// See PRD Section 4: Scope — MVP Features
// Targeted pronunciation drill screen for practicing specific mistakes

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Drill } from '../../types';
import Button from '../components/Button';

type DrillScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drill'>;
type DrillScreenRouteProp = RouteProp<RootStackParamList, 'Drill'>;

interface Props {
  navigation: DrillScreenNavigationProp;
  route: DrillScreenRouteProp;
}

// Mock drill data - TODO: Replace with API call
const MOCK_DRILL: Drill = {
  id: 'drill-1',
  type: 'pronunciation',
  content: 'Practice the "th" sound in these words',
  targetWords: ['think', 'through', 'weather', 'brother'],
  difficulty: 'intermediate',
};

const DrillScreen: React.FC<Props> = ({ navigation, route }) => {
  const { drillId } = route.params;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  // TODO: Load drill data based on drillId
  // Using drillId for future API integration
  console.log('Drill started with ID:', drillId);
  const drill = MOCK_DRILL;
  const currentWord = drill.targetWords[currentWordIndex];
  const isLastWord = currentWordIndex === drill.targetWords.length - 1;

  const handleStartRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // TODO: Start speech recognition for current word
    } else {
      setIsRecording(false);
      // TODO: Stop recording and analyze pronunciation
      // TODO: Provide feedback and move to next word
      handleNextWord();
    }
  };

  const handleNextWord = () => {
    setCompletedWords([...completedWords, currentWord]);
    
    if (isLastWord) {
      // Drill completed
      // TODO: Show completion summary
      navigation.navigate('Home');
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleSkipWord = () => {
    if (isLastWord) {
      navigation.navigate('Home');
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handlePlayExample = () => {
    // TODO: Play correct pronunciation audio
    console.log(`Playing pronunciation for: ${currentWord}`);
  };

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Word {currentWordIndex + 1} of {drill.targetWords.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentWordIndex + 1) / drill.targetWords.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Drill Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.drillTitle}>{drill.content}</Text>
        
        <View style={styles.wordContainer}>
          <Text style={styles.targetWord}>{currentWord}</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayExample}
          >
            <Text style={styles.playButtonText}>🔊 Play Example</Text>
          </TouchableOpacity>
        </View>

        {/* Phonetic Guide */}
        <View style={styles.phoneticContainer}>
          <Text style={styles.phoneticLabel}>Phonetic Guide:</Text>
          <Text style={styles.phoneticText}>
            {/* TODO: Add actual phonetic transcription */}
            /{currentWord === 'think' ? 'θɪŋk' : 'phonetic'}/
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Pronunciation Tip:</Text>
          <Text style={styles.tipText}>
            {drill.type === 'pronunciation' && currentWord.includes('th')
              ? 'Place your tongue between your teeth and blow air gently for the "th" sound.'
              : 'Focus on clear articulation and proper stress patterns.'}
          </Text>
        </View>
      </View>

      {/* Recording Section */}
      <View style={styles.recordingContainer}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
          onPress={handleStartRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '🔴 Recording...' : '🎤 Practice Now'}
          </Text>
        </TouchableOpacity>

        {/* TODO: Add real-time pronunciation feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>
            Pronunciation feedback will appear here
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <Button
          title="Skip Word"
          onPress={handleSkipWord}
          variant="outline"
          style={styles.controlButton}
        />
        <Button
          title={isLastWord ? 'Finish Drill' : 'Next Word'}
          onPress={handleNextWord}
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
  progressContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  contentContainer: {
    padding: 20,
  },
  drillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  targetWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playButtonText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
  },
  phoneticContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  phoneticLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  phoneticText: {
    fontSize: 18,
    color: '#1f2937',
    fontFamily: 'monospace',
  },
  tipsContainer: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  recordingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordButtonActive: {
    backgroundColor: '#dc2626',
  },
  recordButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  feedbackText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default DrillScreen;
