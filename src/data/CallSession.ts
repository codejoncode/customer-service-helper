import { Agent } from "http";
import { Article } from "./Article";
import { CallReason } from "./CallReason";
import { MemberProfile } from "./members";

export interface CallSession {
  agent: Agent;
  member: MemberProfile;
  verified: boolean;
  reason: CallReason | null;
  article: Article | null;
  mustSayChecked: string[];
  actions: string[];
  closingChecklist: Record<string, boolean>;
}