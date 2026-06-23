import { AgentLog } from "@/lib/types";
import { addLog, getLogs } from "@/store/logStore";

export function saveAgentLog(log: Omit<AgentLog, "id" | "timestamp">) {
  const fullLog: AgentLog = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...log
  };

  addLog(fullLog);
  return fullLog;
}

export function getAgentLogs() {
  return getLogs();
}