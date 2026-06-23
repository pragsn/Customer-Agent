import { AgentLog } from "@/lib/types";

const logs: AgentLog[] = [];

export function addLog(log: AgentLog) {
  logs.unshift(log);
}

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs.length = 0;
}

export function deleteLogById(id: string) {
  const index = logs.findIndex((log) => log.id === id);

  if (index !== -1) {
    logs.splice(index, 1);
    return true;
  }

  return false;
}