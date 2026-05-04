'use client';
import { FaChartLine, FaCog, FaDatabase, FaExclamationTriangle, FaFileAlt, FaHistory, FaHome, FaInfoCircle } from 'react-icons/fa';

const items = [
  ['Dashboard', FaHome], ['Realtime Data', FaDatabase], ['Trends', FaChartLine], ['Alarms', FaExclamationTriangle],
  ['History', FaHistory], ['Reports', FaFileAlt], ['Settings', FaCog], ['About', FaInfoCircle]
];

export default function Sidebar() {
  return (
    <aside className="glass neon-border w-full lg:w-64 p-4 space-y-3">
      {items.map(([label, Icon], i) => (
        <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${i===0?'bg-cyan-500/20 text-cyan-300':'text-slate-300 hover:bg-slate-800/60'}`}>
          <Icon /> <span>{label}</span>
        </div>
      ))}
    </aside>
  );
}
