"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import LogTable from "@/components/LogTable";
import Navbar from "@/components/Navbar";
import { AgentLog } from "@/lib/types";

export default function AdminPage() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLogs() {
    try {
      const response = await fetch("/api/logs");
      const data = await response.json();
      setLogs(data.logs || []);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }
  async function deleteSingleLog(id: string) {
  await fetch(`/api/logs?id=${id}`, {
    method: "DELETE",
  });

  setLogs((prev) => prev.filter((log) => log.id !== id));
}

  async function clearAllLogs() {
    await fetch("/api/logs", {
      method: "DELETE"
    });

    setLogs([]);
  }

  useEffect(() => {
    fetchLogs();

    const interval = setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, []);

  const approvedCount = logs.filter((log) => log.decision === "APPROVED").length;
  const deniedCount = logs.filter((log) => log.decision === "DENIED").length;

  const approvalRate =
    logs.length === 0 ? 0 : Math.round((approvedCount / logs.length) * 100);

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Internal Operations View
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Monitor refund decisions, policy validation steps, and agent
              reasoning logs in real time.
            </p>
          </div>

          <button
            onClick={clearAllLogs}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Clear Logs
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Requests"
            value={logs.length}
            description="Refund requests processed"
          />

          <DashboardCard
            title="Approved"
            value={approvedCount}
            description="Requests that passed policy checks"
          />

          <DashboardCard
            title="Denied"
            value={deniedCount}
            description="Requests blocked by policy"
          />

          <DashboardCard
            title="Approval Rate"
            value={`${approvalRate}%`}
            description="Approved requests percentage"
          />
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading agent logs...</p>
        ) : (
          <LogTable logs={logs} onDeleteLog={deleteSingleLog} />
        )}
      </main>
    </>
  );
}