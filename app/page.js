'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import mqtt from 'mqtt';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DataCard from '../components/DataCard';
import Tank from '../components/Tank';
import ChartLine from '../components/ChartLine';
import ChartPie from '../components/ChartPie';
import AlarmPanel from '../components/AlarmPanel';
import { MAX_HISTORY, MAX_LEVEL_CM, MQTT_CONFIG } from '../lib/mqttConfig';

const initData = { temp1:0,temp2:0,cpo:0,water:0,sludge:0,total_level_cm:0,vol_cpo_l:0,vol_water_l:0,vol_sludge_l:0,mass_cpo:0,mass_water:0,mass_sludge:0,weight_cpo:0,weight_water:0,weight_sludge:0,humidity_avg:0,pressure_ref:0 };

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [liveData, setLiveData] = useState(initData);
  const [history, setHistory] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = mqtt.connect(MQTT_CONFIG.brokerUrl, {
      username: MQTT_CONFIG.username,
      password: MQTT_CONFIG.password,
      reconnectPeriod: 3000,
      connectTimeout: 10000,
      clean: true
    });
    clientRef.current = client;

    client.on('connect', () => {
      console.log('[MQTT] Connected');
      setConnected(true);
      client.subscribe(MQTT_CONFIG.topic, (err) => err && console.error('[MQTT] Subscribe error:', err));
    });
    client.on('reconnect', () => console.log('[MQTT] Reconnecting...'));
    client.on('close', () => { console.log('[MQTT] Disconnected'); setConnected(false); });
    client.on('error', (err) => console.error('[MQTT] Error:', err));

    client.on('message', (_, payload) => {
      try {
        const parsed = JSON.parse(payload.toString());
        console.log('[MQTT] Incoming data:', parsed);
        setLiveData((prev) => ({ ...prev, ...parsed }));
        setHistory((prev) => ([...prev, {
          time: new Date().toLocaleTimeString(),
          ...parsed
        }]).slice(-MAX_HISTORY));
      } catch (e) {
        console.error('[MQTT] JSON parse error:', e);
      }
    });

    return () => client.end(true);
  }, []);

  const tempAvg = useMemo(() => ((liveData.temp1 + liveData.temp2) / 2 || 0), [liveData.temp1, liveData.temp2]);
  const pressureBar = useMemo(() => (liveData.pressure_ref * 100).toFixed(2), [liveData.pressure_ref]);
  const levelPct = Math.min((liveData.total_level_cm / MAX_LEVEL_CM) * 100, 100);

  return (
    <main className="p-4 md:p-6 space-y-4">
      <Header connected={connected} />
      <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-4">
        <Sidebar />
        <section className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass p-4 space-y-3 md:col-span-2">
              <h3 className="font-semibold">Temperature</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <DataCard title="temp1" value={liveData.temp1} unit="°C" />
                <DataCard title="temp2" value={liveData.temp2} unit="°C" />
                <DataCard title="average" value={tempAvg} unit="°C" />
              </div>
            </div>
            <div className="glass p-4">
              <h3 className="font-semibold mb-2">Pressure</h3>
              <p className="text-3xl font-bold text-cyan-300">{Number(liveData.pressure_ref ?? 0).toFixed(2)} bar</p>
              <div className="w-full h-3 bg-slate-800 rounded-full mt-3"><div className="h-3 rounded-full bg-cyan-400" style={{width:`${Math.min(Number(pressureBar),100)}%`}} /></div>
            </div>
          </div>

          <div className="grid xl:grid-cols-3 gap-4">
            <Tank cpo={liveData.cpo} water={liveData.water} sludge={liveData.sludge} />
            <div className="glass p-4"><h3 className="font-semibold mb-2">Total Level</h3><p className="text-3xl text-cyan-300 font-bold">{liveData.total_level_cm?.toFixed?.(2) ?? '0.00'} cm</p><div className="w-full h-3 bg-slate-800 rounded-full mt-3"><div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{width:`${levelPct}%`}} /></div><p className="text-slate-400 mt-2">{levelPct.toFixed(1)}%</p></div>
            <AlarmPanel tempAvg={tempAvg} totalLevel={liveData.total_level_cm} pressure={liveData.pressure_ref} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <DataCard title="vol_cpo_l" value={liveData.vol_cpo_l} unit="L" /><DataCard title="vol_water_l" value={liveData.vol_water_l} unit="L" /><DataCard title="vol_sludge_l" value={liveData.vol_sludge_l} unit="L" />
            <DataCard title="mass_cpo" value={liveData.mass_cpo} unit="kg" /><DataCard title="mass_water" value={liveData.mass_water} unit="kg" /><DataCard title="mass_sludge" value={liveData.mass_sludge} unit="kg" />
            <DataCard title="weight_cpo" value={liveData.weight_cpo} unit="N" /><DataCard title="weight_water" value={liveData.weight_water} unit="N" /><DataCard title="weight_sludge" value={liveData.weight_sludge} unit="N" />
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <ChartPie cpo={liveData.vol_cpo_l} water={liveData.vol_water_l} sludge={liveData.vol_sludge_l} />
            <ChartLine data={history} />
          </div>

          <div className="glass p-4 overflow-auto">
            <h3 className="font-semibold mb-3">Latest Readings</h3>
            <table className="w-full text-sm min-w-[800px]"><thead><tr className="text-slate-400"><th>Timestamp</th><th>temp1</th><th>temp2</th><th>cpo</th><th>water</th><th>sludge</th><th>total_level_cm</th><th>pressure_ref</th><th>humidity_avg</th></tr></thead>
              <tbody>{[...history].reverse().slice(0,10).map((row, i)=><tr key={i} className="border-t border-slate-800"><td>{row.time}</td><td>{row.temp1??0}</td><td>{row.temp2??0}</td><td>{row.cpo??0}</td><td>{row.water??0}</td><td>{row.sludge??0}</td><td>{row.total_level_cm??0}</td><td>{row.pressure_ref??0}</td><td>{row.humidity_avg??0}</td></tr>)}</tbody></table>
          </div>
        </section>
      </div>
    </main>
  );
}
