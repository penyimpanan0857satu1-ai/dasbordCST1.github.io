'use client';
export default function AlarmPanel({ tempAvg=0, totalLevel=0, pressure=0 }) {
  const alarms = [];
  if (tempAvg > 95) alarms.push('Temperature high (>95°C)');
  if (totalLevel > 85) alarms.push('Total level too high');
  if (pressure > 2) alarms.push('Abnormal pressure');
  return <div className="glass p-4"><h3 className="font-semibold mb-3">Process Alarms</h3><div className="space-y-2">{alarms.length?alarms.map(a=><div key={a} className="border border-red-500/40 bg-red-500/10 text-red-300 px-3 py-2 rounded-lg">{a}</div>):<div className="text-emerald-300">No active alarms</div>}</div></div>;
}
