// See PRD Section 4: Scope — MVP Features
// Core types for PronouncePal app

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: 'free' | 'premium';
  createdAt: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedDuration: number; // in minutes
  estimatedMinutes: number; // alias for estimatedDuration
  isPremium: boolean;
}

export interface Session {
  id: string;
  scenarioId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'active' | 'completed' | 'paused';
  mistakes: PronunciationMistake[];
}

export interface PronunciationMistake {
  id: string;
  word: string;
  expectedPhoneme: string;
  actualPhoneme: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high';
}

export interface Drill {
  id: string;
  type: 'pronunciation' | 'vocabulary' | 'conversation';
  content: string;
  targetWords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Session: { scenarioId: string };
  Drill: { drillId: string };
  Paywall: undefined;
  Profile: undefined;
  ScenarioPicker: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  ScenariosTab: undefined;
  DrillsTab: undefined;
  ProfileTab: undefined;
};
