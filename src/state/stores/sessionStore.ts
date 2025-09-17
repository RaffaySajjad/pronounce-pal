// See PRD Section 4: Scope — MVP Features
// Session state management for practice sessions

import { create } from 'zustand';
import { Session, PronunciationMistake, Scenario } from '../../types';

interface SessionState {
  // Current session data
  currentSession: Session | null;
  currentScenario: Scenario | null;
  isRecording: boolean;
  mistakes: PronunciationMistake[];
  
  // Session history
  sessionHistory: Session[];
  
  // Actions
  startSession: (scenario: Scenario, userId: string) => void;
  endSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  addMistake: (mistake: PronunciationMistake) => void;
  setRecording: (recording: boolean) => void;
  clearSession: () => void;
  
  // History actions
  addToHistory: (session: Session) => void;
  clearHistory: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  // Initial state
  currentSession: null,
  currentScenario: null,
  isRecording: false,
  mistakes: [],
  sessionHistory: [],

  // Actions
  startSession: (scenario: Scenario, userId: string) => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      scenarioId: scenario.id,
      userId,
      startedAt: new Date(),
      status: 'active',
      mistakes: [],
    };

    set({
      currentSession: newSession,
      currentScenario: scenario,
      mistakes: [],
      isRecording: false,
    });
  },

  endSession: () => {
    const { currentSession, mistakes } = get();
    if (currentSession) {
      const completedSession: Session = {
        ...currentSession,
        completedAt: new Date(),
        status: 'completed',
        mistakes,
      };

      set({
        currentSession: null,
        currentScenario: null,
        mistakes: [],
        isRecording: false,
      });

      // Add to history
      get().addToHistory(completedSession);
    }
  },

  pauseSession: () => {
    const { currentSession } = get();
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          status: 'paused',
        },
        isRecording: false,
      });
    }
  },

  resumeSession: () => {
    const { currentSession } = get();
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          status: 'active',
        },
      });
    }
  },

  addMistake: (mistake: PronunciationMistake) => {
    set((state) => ({
      mistakes: [...state.mistakes, mistake],
    }));
  },

  setRecording: (recording: boolean) => {
    set({ isRecording: recording });
  },

  clearSession: () => {
    set({
      currentSession: null,
      currentScenario: null,
      mistakes: [],
      isRecording: false,
    });
  },

  // History actions
  addToHistory: (session: Session) => {
    set((state) => ({
      sessionHistory: [session, ...state.sessionHistory],
    }));
  },

  clearHistory: () => {
    set({ sessionHistory: [] });
  },
}));

// Selectors
export const useCurrentSession = () => useSessionStore((state) => state.currentSession);
export const useCurrentScenario = () => useSessionStore((state) => state.currentScenario);
export const useIsRecording = () => useSessionStore((state) => state.isRecording);
export const useSessionMistakes = () => useSessionStore((state) => state.mistakes);
export const useSessionHistory = () => useSessionStore((state) => state.sessionHistory);
