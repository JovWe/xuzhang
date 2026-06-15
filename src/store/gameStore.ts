import { create } from 'zustand';

export type InteractionPhase = 'idle' | 'ringing' | 'connected' | 'chatting' | 'ended';

export interface GameState {
  currentSegmentIndex: number;
  isTyping: boolean;
  displayedSegments: number;
  activeInteraction: string | null;
  interactionPhase: InteractionPhase;
  dialogueIndex: number;
  isInteractionComplete: boolean;

  // Actions
  advanceSegment: () => void;
  setTyping: (typing: boolean) => void;
  triggerInteraction: (interactionId: string) => void;
  setInteractionPhase: (phase: InteractionPhase) => void;
  advanceDialogue: () => void;
  completeInteraction: () => void;
  resetGame: () => void;
}

const initialState = {
  currentSegmentIndex: 0,
  isTyping: false,
  displayedSegments: 0,
  activeInteraction: null as string | null,
  interactionPhase: 'idle' as InteractionPhase,
  dialogueIndex: 0,
  isInteractionComplete: false,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  advanceSegment: () =>
    set((state) => ({
      currentSegmentIndex: state.currentSegmentIndex + 1,
      displayedSegments: state.displayedSegments + 1,
    })),

  setTyping: (typing) => set({ isTyping: typing }),

  triggerInteraction: (interactionId) =>
    set({
      activeInteraction: interactionId,
      interactionPhase: 'ringing',
      dialogueIndex: 0,
      isInteractionComplete: false,
    }),

  setInteractionPhase: (phase) => set({ interactionPhase: phase }),

  advanceDialogue: () =>
    set((state) => ({
      dialogueIndex: state.dialogueIndex + 1,
    })),

  completeInteraction: () =>
    set({
      isInteractionComplete: true,
      interactionPhase: 'ended',
    }),

  resetGame: () => set(initialState),
}));