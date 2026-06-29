import { useState } from 'react';
import { X, Zap, TrendingUp, Activity } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warn';
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastItem[]; onClose: (id:string)=>void }) {
  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-[100] space-y-2 w-[340px] max-w-[92vw] pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto bg-[#161d2f]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl animate-in slide-in-from-right">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 p-1.5 rounded-lg ${t.type==='success'?'bg-green-500/15 text-green-400': t.type==='warn'?'bg-amber-500/15 text-amber-400':'bg-blue-500/15 text-blue-400'}`}>
              {t.type==='success' ? <TrendingUp className="w-4 h-4"/> : t.type==='warn' ? <Activity className="w-4 h-4"/> : <Zap className="w-4 h-4"/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold">{t.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t.message}</div>
            </div>
            <button onClick={()=>onClose(t.id)} className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5"/></button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook
export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = (t: Omit<ToastItem,'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(s=>[{...t,id}, ...s].slice(0,4));
    setTimeout(()=> setToasts(s=>s.filter(x=>x.id!==id)), 4200);
  };
  const close = (id:string)=> setToasts(s=>s.filter(x=>x.id!==id));
  return { toasts, push, close };
}
