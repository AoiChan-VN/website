import { ShieldCheck, Activity, Download Cloud } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Dashboard với hiệu ứng bản quyền */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">
          System <span className="text-primary">Panel</span>
        </h1>
        <div className="text-xs text-slate-500 font-mono">
          ID: LIC-8899-GLOBAL (VERIFIED)
        </div>
      </div>

      {/* SVG Dashboard Data Viz */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-panel border border-white/5 p-4 rounded-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm">System Health</p>
            <h2 className="text-3xl font-mono text-green-400">99.9%</h2>
          </div>
          {/* SVG Background Map/Graph */}
          <svg className="absolute bottom-0 right-0 w-32 h-16 opacity-20 group-hover:opacity-40 transition-opacity" viewBox="0 0 100 50">
            <path d="M0 45 Q 25 5, 50 40 T 100 10" fill="none" stroke="#4ade80" strokeWidth="2" />
          </svg>
        </div>
        {/* Thêm các card khác cho Plugins/Downloads ở đây... */}
      </div>

      {/* Watermark bảo quyền chống copy nội dung */}
      <div className="fixed bottom-4 right-4 pointer-events-none opacity-10 rotate-[-15deg]">
        <p className="text-4xl font-bold">BY [YOUR_NAME] - INTERNATIONAL VERSION</p>
      </div>
    </div>
  );
}
 
