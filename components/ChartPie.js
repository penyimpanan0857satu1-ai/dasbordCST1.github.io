'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
const colors = ['#facc15','#38bdf8','#92400e'];
export default function ChartPie({ cpo=0, water=0, sludge=0 }) {
  const data = [{name:'CPO', value:cpo},{name:'Water',value:water},{name:'Sludge',value:sludge}];
  return <div className="glass p-4"><h3 className="font-semibold mb-3">Volume Distribution</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={60} outerRadius={90}>{data.map((_,i)=><Cell key={i} fill={colors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>;
}
