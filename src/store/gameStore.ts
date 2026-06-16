import { create } from 'zustand';

export type InteractionPhase = 'idle' | 'ringing' | 'connected' | 'chatting' | 'ended';
export type PhoneView = 'wechat_list' | 'wechat_chat' | 'dialer' | 'call_screen';

export interface GameState {
  currentSegmentIndex: number;
  isTyping: boolean;
  displayedSegments: number;
  activeInteraction: string | null;
  interactionPhase: InteractionPhase;
  dialogueIndex: number;
  isInteractionComplete: boolean;
  phoneView: PhoneView;
  currentChatContact: string | null;
  collectedItems: string[];

  // Actions
  advanceSegment: () => void;
  setTyping: (typing: boolean) => void;
  triggerInteraction: (interactionId: string) => void;
  setInteractionPhase: (phase: InteractionPhase) => void;
  advanceDialogue: () => void;
  completeInteraction: () => void;
  setPhoneView: (view: PhoneView) => void;
  setCurrentChatContact: (contact: string | null) => void;
  collectItem: (itemId: string) => void;
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
  phoneView: 'wechat_list' as PhoneView,
  currentChatContact: null as string | null,
  collectedItems: [] as string[],
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

  setPhoneView: (view) => set({ phoneView: view }),

  setCurrentChatContact: (contact) => set({ currentChatContact: contact }),

  collectItem: (itemId) =>
    set((state) => ({
      collectedItems: state.collectedItems.includes(itemId)
        ? state.collectedItems
        : [...state.collectedItems, itemId],
    })),

  resetGame: () => set(initialState),
}));
