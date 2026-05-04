'use client';
import { motion } from 'framer-motion';

export default function DataCard({ title, value, unit }) {
  return (
    <motion.div layout className="glass p-4">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-cyan-300">{Number(value ?? 0).toFixed(2)} <span className="text-sm text-slate-300">{unit}</span></p>
    </motion.div>
  );
}
