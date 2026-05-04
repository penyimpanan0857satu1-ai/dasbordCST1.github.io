'use client';
export default function Tank({ cpo=0, water=0, sludge=0 }) {
  const total = cpo + water + sludge || 1;
  const cpoP = (cpo/total)*100, waterP=(water/total)*100, sludgeP=(sludge/total)*100;
  return <div className="glass p-4"><h3 className="font-semibold mb-3">CST Level Gauge</h3><div className="h-80 w-40 mx-auto rounded-b-3xl rounded-t-xl border-4 border-slate-400/50 overflow-hidden flex flex-col-reverse bg-slate-900/60">
    <div style={{height:`${sludgeP}%`}} className="bg-amber-800/90" />
    <div style={{height:`${waterP}%`}} className="bg-blue-500/90" />
    <div style={{height:`${cpoP}%`}} className="bg-yellow-400/90" />
  </div><p className="text-center mt-3 text-slate-300">CPO {cpoP.toFixed(1)}% • Water {waterP.toFixed(1)}% • Sludge {sludgeP.toFixed(1)}%</p></div>;
}
