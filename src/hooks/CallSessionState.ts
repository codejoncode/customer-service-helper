// src/hooks/useCallSession.ts
import { create } from "zustand";
import { MemberProfile } from "../data/members";

interface CallSessionState {
  member?: MemberProfile;
  isVerified: boolean;
  setMember: (member: MemberProfile) => void;
  verify: () => void;
  reset: () => void;
}

export const useCallSession = create<CallSessionState>((set) => ({
  member: undefined,
  isVerified: false,
  setMember: (member) => set({ member }),
  verify: () => set({ isVerified: true }),
  reset: () => set({ member: undefined, isVerified: false }),
}));