// See PRD Section 4: Scope — MVP Features
// API layer with stubbed endpoints for PronouncePal

import { APIResponse, Scenario, Drill, PronunciationMistake } from '../types';

// API Configuration
const API_BASE_URL = 'https://api.pronouncepal.com'; // TODO: Replace with actual API URL
const API_VERSION = 'v1';

// Helper function for API requests
// TODO: This function will be used when implementing actual API calls
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const url = `${API_BASE_URL}/${API_VERSION}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Speech Recognition & Analysis API
export const speechAPI = {
  /**
   * Send audio for speech recognition and pronunciation analysis
   * POST /v1/speech
   */
  analyzeSpeech: async (audioData: string, targetText?: string): Promise<APIResponse<{
    transcript: string;
    pronunciation: {
      accuracy: number;
      mistakes: PronunciationMistake[];
    };
  }>> => {
    // TODO: Implement actual API call
    console.log('Analyzing speech:', { audioData, targetText });
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            transcript: "Hi, I'd like to order a large coffee please",
            pronunciation: {
              accuracy: 0.85,
              mistakes: [
                {
                  id: `mistake-${Date.now()}`,
                  word: 'coffee',
                  expectedPhoneme: 'kɔːfi',
                  actualPhoneme: 'kofi',
                  timestamp: 2.5,
                  severity: 'medium',
                },
              ],
            },
          },
        });
      }, 1500);
    });
  },
};

// AI Character Response API
export const conversationAPI = {
  /**
   * Get AI character response in conversation
   * POST /v1/reply
   */
  getCharacterReply: async (
    scenarioId: string,
    userMessage: string,
    conversationHistory: Array<{ role: 'user' | 'character'; message: string }>
  ): Promise<APIResponse<{
    reply: string;
    suggestions: string[];
    nextPrompt?: string;
  }>> => {
    // TODO: Implement actual API call
    console.log('Getting character reply:', { scenarioId, userMessage, conversationHistory });
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            reply: "Great! One large coffee coming right up. Would you like that black or with cream and sugar?",
            suggestions: [
              "I'll have it black, please",
              "Could I get some cream and sugar?",
              "Just a splash of milk, thanks",
            ],
            nextPrompt: "Respond to the barista's question about how you'd like your coffee prepared.",
          },
        });
      }, 1000);
    });
  },
};

// Drill Generation API
export const drillAPI = {
  /**
   * Generate targeted drills based on user mistakes
   * POST /v1/drills/generate
   */
  generateDrills: async (mistakes: PronunciationMistake[]): Promise<APIResponse<{
    drills: Drill[];
  }>> => {
    // TODO: Implement actual API call
    console.log('Generating drills for mistakes:', mistakes);
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            drills: [
              {
                id: `drill-${Date.now()}`,
                type: 'pronunciation',
                content: 'Practice the "th" sound in these words',
                targetWords: ['think', 'through', 'weather', 'brother'],
                difficulty: 'intermediate',
              },
              {
                id: `drill-${Date.now() + 1}`,
                type: 'pronunciation',
                content: 'Focus on vowel sounds in coffee-related words',
                targetWords: ['coffee', 'latte', 'espresso', 'cappuccino'],
                difficulty: 'beginner',
              },
            ],
          },
        });
      }, 800);
    });
  },

  /**
   * Get a specific drill by ID
   * GET /v1/drills/{id}
   */
  getDrill: async (drillId: string): Promise<APIResponse<Drill>> => {
    // TODO: Implement actual API call
    console.log('Getting drill:', drillId);
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: drillId,
            type: 'pronunciation',
            content: 'Practice the "th" sound in these words',
            targetWords: ['think', 'through', 'weather', 'brother'],
            difficulty: 'intermediate',
          },
        });
      }, 500);
    });
  },
};

// Scenarios API
export const scenariosAPI = {
  /**
   * Get available practice scenarios
   * GET /v1/scenarios
   */
  getScenarios: async (): Promise<APIResponse<{
    scenarios: Scenario[];
  }>> => {
    // TODO: Implement actual API call
    console.log('Getting scenarios');
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            scenarios: [
              {
                id: 'scenario-1',
                title: 'Coffee Shop Order',
                description: 'Practice ordering coffee and asking questions at a café',
                difficulty: 'beginner',
                category: 'Daily Life',
                estimatedDuration: 5,
              },
              {
                id: 'scenario-2',
                title: 'Job Interview',
                description: 'Prepare for common interview questions and responses',
                difficulty: 'intermediate',
                category: 'Professional',
                estimatedDuration: 10,
              },
              {
                id: 'scenario-3',
                title: 'Doctor Appointment',
                description: 'Learn to describe symptoms and understand medical advice',
                difficulty: 'intermediate',
                category: 'Healthcare',
                estimatedDuration: 8,
              },
            ],
          },
        });
      }, 600);
    });
  },

  /**
   * Get a specific scenario by ID
   * GET /v1/scenarios/{id}
   */
  getScenario: async (scenarioId: string): Promise<APIResponse<Scenario>> => {
    // TODO: Implement actual API call
    console.log('Getting scenario:', scenarioId);
    
    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: scenarioId,
            title: 'Coffee Shop Order',
            description: 'Practice ordering coffee and asking questions at a café',
            difficulty: 'beginner',
            category: 'Daily Life',
            estimatedDuration: 5,
          },
        });
      }, 400);
    });
  },
};

// Export all APIs
export const api = {
  speech: speechAPI,
  conversation: conversationAPI,
  drills: drillAPI,
  scenarios: scenariosAPI,
};
