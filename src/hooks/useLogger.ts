import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useCallSession } from "./CallSessionState";
import { useLocation } from "react-router";


interface LogEvent {
  id: string;
  type: string;
  timestamp: string;
  payload?: Record<string, unknown>;
}

let logStore: LogEvent[] = [];

export const useLogger = () => {
  const { pathname } = useLocation();
  const { member, reason, agent, sessionStartTime } = useCallSession();
  const logEvent = (type: string, payload: Record<string, unknown> = {}) => {
    const timestamp = new Date().toISOString();
    const durationMs = sessionStartTime ? Date.now() - sessionStartTime: undefined
    const enrichedPayload = {
      ...payload,
      timestamp,
        route: pathname,
        agentId: agent?.id,
      memberId: member?.memberId,
      reasonId: reason,
    };

    const entry: LogEvent = {
      id: uuid(),
      type,
      timestamp,
      payload: enrichedPayload
    };
    logStore.push(entry);
    console.debug(`[LOG] ${type}`, enrichedPayload);
  };

  const getLog = (): LogEvent[] => [...logStore];

  const clearLog = () => {
    logStore = [];
  };

  useEffect(() => {
    logEvent("logger-initialized");
    return () => {
      logEvent("logger-destroyed");
    };
  }, []);

  return {
    logEvent,
    getLog,
    clearLog,
  }
};