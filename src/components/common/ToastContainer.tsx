import React from 'react';
import { useCampusKart } from '../../context/CampusKartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCampusKart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={18} />,
          info: <Info className="text-blue-600 flex-shrink-0" size={18} />,
          warning: <AlertTriangle className="text-amber-600 flex-shrink-0" size={18} />,
        };

        const bgStyles = {
          success: 'bg-white/95 border-pastel-mint shadow-glow-mint/40 text-brand-dark',
          info: 'bg-white/95 border-pastel-blue shadow-soft text-brand-dark',
          warning: 'bg-white/95 border-pastel-peach shadow-soft text-brand-dark',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-soft-lg transition-all duration-300 transform translate-y-0 opacity-100 ${bgStyles[toast.type || 'success']}`}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type || 'success']}
              <p className="text-xs sm:text-sm font-medium text-brand-dark leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-brand-muted hover:text-brand-dark p-1 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
