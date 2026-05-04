'use client';
import { useEffect, useState } from 'react';
import { FaBell, FaClock } from 'react-icons/fa';

export default function Header({ connected }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="glass p-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">CST Monitoring System</h1>
        <p className="text-slate-400 text-sm">Continuous Settling Tank</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${connected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{connected ? 'Connected' : 'Disconnected'}</span>
        <span className="text-slate-300 flex items-center gap-2"><FaClock /> {time.toLocaleTimeString()}</span>
        <FaBell className="text-cyan-300" />
      </div>
    </header>
  );
}
