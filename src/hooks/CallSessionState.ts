// src/hooks/useCallSession.ts
import { create } from "zustand";
import { MemberProfile } from "../data/members";
import { useState } from "react";

interface CallSessionState {
  member?: MemberProfile;
  isVerified: boolean;
  setMember: (member: MemberProfile) => void;
  verify: () => void;
  reset: () => void;

  // 🆕 Assistant flow state
  reason?: string;
  articleId?: string;
  mustSayChecked: string[];
  actions: string[];
  closingChecks: Record<string, boolean>;

  setReason: (id: string) => void;
  setArticle: (id: string) => void;
  setMustSayChecked: (phrases: string[]) => void;
  setActions: (actions: string[]) => void;
  setClosingChecks: (checks: Record<string, boolean>) => void;

  toggleMustSay: (phrase: string) => void;
  toggleAction: (action: string) => void;
  toggleClosingCheck: (id: string) => void;
}

export const useCallSession = create<CallSessionState>((set) => ({
  member: undefined,
  isVerified: false,
  setMember: (member) => set({ member }),
  verify: () =>
    set((state) => (!state.member ? {} : { isVerified: true })),
  reset: () =>
    set({
      member: undefined,
      isVerified: false,
      reason: undefined,
      articleId: undefined,
      mustSayChecked: [],
      actions: [],
      closingChecks: {},
    }),

  // 💡 New state entries
  reason: undefined,
  articleId: undefined,
  mustSayChecked: [],
  actions: [],
  closingChecks: {},

  setReason: (id) => set({ reason: id }),
  setArticle: (id) => set({ articleId: id }),
  setMustSayChecked: (phrases) => set({ mustSayChecked: phrases }),
  setActions: (actions) => set({ actions }),
  setClosingChecks: (checks) => set({ closingChecks: checks }),

  toggleMustSay: (phrase) =>
    set((state) => ({
      mustSayChecked: state.mustSayChecked.includes(phrase)
        ? state.mustSayChecked.filter((p) => p !== phrase)
        : [...state.mustSayChecked, phrase],
    })),
  toggleAction: (action) =>
    set((state) => ({
      actions: state.actions.includes(action)
        ? state.actions.filter((a) => a !== action)
        : [...state.actions, action],
    })),
  toggleClosingCheck: (id) =>
    set((state) => ({
      closingChecks: {
        ...state.closingChecks,
        [id]: !state.closingChecks[id],
      },
    })),
}));