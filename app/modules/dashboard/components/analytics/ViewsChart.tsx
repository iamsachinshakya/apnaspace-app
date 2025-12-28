export function ViewsChart() {
  const data = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold mb-4">Views Over Time</h3>
      <div className="h-64 flex items-end justify-around gap-2">
        {data.map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
              style={{ height: `${height}%` }}
            ></div>
            <span className="text-xs text-gray-400">Day {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
