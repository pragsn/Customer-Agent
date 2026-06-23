import { AgentLog } from "@/lib/types";

type LogTableProps = {
  logs: AgentLog[];
  onDeleteLog: (id: string) => void;
};

export default function LogTable({ logs, onDeleteLog }: LogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold">No logs yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Submit a refund request from the customer chat to see agent reasoning.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold">Agent Reasoning History</h2>
        <p className="text-sm text-gray-500">
          Every refund decision includes a step-by-step policy validation trace.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-4">Time</th>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Decision</th>
              <th className="p-4">Reasoning Trace</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t align-top">
                <td className="p-4 text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>

                <td className="p-4 font-semibold">{log.orderId}</td>

                <td className="p-4">{log.customerName}</td>

                <td className="p-4 capitalize">{log.reason}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      log.decision === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {log.decision}
                  </span>
                </td>

                <td className="p-4">
                  <ol className="space-y-2">
                    {log.logs.map((step, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="font-semibold text-gray-400">
                          {index + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="rounded-lg border px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}