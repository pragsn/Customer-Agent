type AgentStatusProps = {
  logs: string[];
};

export default function AgentStatus({ logs }: AgentStatusProps) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-3 text-lg font-semibold">Agent Reasoning</h2>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-500">
          Agent steps will appear here after a refund request.
        </p>
      ) : (
        <ol className="space-y-2">
          {logs.map((log, index) => (
            <li key={index} className="text-sm text-gray-700">
              <span className="font-semibold">Step {index + 1}:</span> {log}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}