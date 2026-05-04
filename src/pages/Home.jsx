import { obfuscate, handleSecureDownload } from '../core/security';
import { MyResources } from '../data/store';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 p-8 font-sans">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-10 border-b border-blue-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            MY <span className="text-blue-500">DASHBOARD</span>
          </h1>
          <p className="text-xs text-blue-400/60 font-mono mt-1">INTERNATIONAL STANDARD FRAMEWORK</p>
        </div>
        {/* SVG Bản quyền chạy ngầm */}
        <div className="hidden md:block opacity-30">
          <svg width="150" height="40" viewBox="0 0 150 40">
            <text x="0" y="30" fill="currentColor" className="text-[10px] font-bold">© 2024 AUTHORIZED BY YOU</text>
          </svg>
        </div>
      </div>

      {/* Main Grid: Plugins & Resource */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MyResources.plugins.map(item => (
          <div key={item.id} className="bg-[#151b2d] border border-white/5 rounded-2xl p-5 hover:border-blue-500/50 transition-all group">
            {/* Ảnh GIF Trailer */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black">
               <img src={item.thumbnail} alt="preview" className="object-cover w-full h-full opacity-80 group-hover:scale-110 transition-transform"/>
               <div className="absolute top-2 right-2 bg-blue-600 text-[10px] px-2 py-1 rounded-md">NEW</div>
            </div>

            <h2 className="text-lg font-bold text-white mb-2">{item.name}</h2>
            
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-mono text-blue-400">{item.price}</span>
              <button 
                onClick={() => handleSecureDownload(item.downloadId)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
