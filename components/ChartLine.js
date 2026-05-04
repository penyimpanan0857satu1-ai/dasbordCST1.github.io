'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
export default function ChartLine({ data }) {
  return <div className="glass p-4"><h3 className="font-semibold mb-3">Level Trend</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid stroke="#1e293b" /><XAxis dataKey="time" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Line type="monotone" dataKey="cpo" stroke="#facc15" dot={false} /><Line type="monotone" dataKey="water" stroke="#38bdf8" dot={false} /><Line type="monotone" dataKey="sludge" stroke="#b45309" dot={false} /></LineChart></ResponsiveContainer></div></div>;
}
