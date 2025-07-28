// src/hooks/useCallSession.ts
import { create } from "zustand";
import { MemberProfile } from "../data/members";
import { useState } from "react";
import { Agent } from "../data/Agent";
import { v4 as uuid } from "uuid";

interface CallSessionState {
  member?: MemberProfile;
  isVerified: boolean;
  setMember: (member: MemberProfile) => void;
  verify: () => void;
  reset: () => void;
  callSessionId: string;
  initializeSession: () => void;
  // 🆕 Assistant flow state
  reason?: string;
  agent?: Agent
  setAgent: (agent: Agent) => void;
  articleId?: string;
  mustSayChecked: string[];
  actions: string[];
  closingChecks: Record<string, boolean>
  setReason: (id: string) => void;
  setArticle: (id: string) => void;
  setMustSayChecked: (phrases: string[]) => void;
  setActions: (actions: string[]) => void;
  setClosingChecks: (checks: Record<string, boolean>) => void;
  toggleMustSay: (phrase: string) => void;
  toggleAction: (action: string) => void;
  toggleClosingCheck: (id: string) => void;
  sessionStartTime?: number;
  setSessionStart: () => void;
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
    callSessionId: uuid(), // initialize with a unique session ID
    initializeSession: () => set({ callSessionId: uuid(), sessionStartTime: Date.now() }),
    //^ group events across a timeline
    //^ reconstruct flows for auidts or debugging
    //^ link summaries and final outcomes to specific sessions
  // 💡 New state entries
  reason: undefined,
  articleId: undefined,
  mustSayChecked: [],
  actions: [],
  closingChecks: {},
  agent: undefined,
  setAgent: (agent: Agent) => set({ agent }),
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
    sessionStartTime: undefined,
    setSessionStart: () => set({ sessionStartTime: Date.now() }),
}));