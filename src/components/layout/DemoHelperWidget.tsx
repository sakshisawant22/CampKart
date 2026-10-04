import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../../context/CampusKartContext';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  ChevronRight, 
  Zap, 
  ShieldAlert, 
  Compass, 
  Repeat, 
  PlusCircle, 
  X,
  GraduationCap
} from 'lucide-react';
import { CURRENT_DEMO_USER, DEMO_USERS } from '../../data/demoUsers';

export const DemoHelperWidget: React.FC = () => {
  const { 
    resetToDemoState, 
    setCurrentUser, 
    setIsVerified, 
    addProduct, 
    requestPurchase, 
    showToast,
    isVerified,
    currentUser
  } = useCampusKart();
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  // 1-Click Guided Demo Script A (Buy Flow)
  const runDemoFlowA = () => {
    setActiveStep('Flow A: Instant Buy Demo');
    setIsVerified(true);
    setCurrentUser(CURRENT_DEMO_USER);
    navigate('/explore?search=calculator');
    showToast('Demo Flow A: Showing matching calculators in marketplace', 'info');
    setTimeout(() => {
      showToast('Click on "Casio Scientific Calculator" to view details and request buy!', 'success');
    }, 1200);
    setIsOpen(false);
  };

  // 1-Click Guided Demo Script B (Sell Flow)
  const runDemoFlowB = () => {
    setActiveStep('Flow B: Sell Flow');
    setIsVerified(true);
    navigate('/sell');
    showToast('Demo Flow B: Opened Sell Listing form with pre-fill option!', 'info');
    setIsOpen(false);
  };

  // 1-Click Guided Demo Script C (Kart Swap Hero Flow)
  const runDemoFlowC = () => {
    setActiveStep('Flow C: Kart Swap Matcher');
    setIsVerified(true);
    navigate('/swap');
    showToast('Demo Flow C: Welcome to Kart Swap signature engine!', 'info');
    setIsOpen(false);
  };

  // Quick switch demo profile
  const switchUser = (userId: string) => {
    const user = DEMO_USERS[userId];
    if (user) {
      setCurrentUser(user);
      setIsVerified(true);
      showToast(`Switched active profile to ${user.name} (${user.department})`, 'success');
    }
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-pastel-sage-dark to-pastel-mint-dark text-white shadow-soft-lg hover:shadow-glow-mint hover:scale-105 transition-all duration-200 border-2 border-white/80"
          title="Open Hackathon Demo Controller"
        >
          <Sparkles size={16} className="text-pastel-mint animate-pulse" />
          {/* <span className="text-xs font-black tracking-wide uppercase">Hackathon Demo Mode</span> */}
        </button>
      </div>

      {/* Floating Widget Drawer/Modal */}
      {isOpen && (
        <div className="fixed bottom-32 sm:bottom-20 left-4 sm:left-6 z-50 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl shadow-soft-xl border border-brand-border/80 overflow-hidden animate-scale-in">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-lavender-light border-b border-brand-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-pastel-sage-dark">
                <Zap size={16} />
              </div>
              <div>
                <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">Judge Quick Controls</h4>
                <p className="text-[11px] text-brand-muted">Instant 1-Click Interactive Demos</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-brand-muted hover:text-brand-dark hover:bg-white/80 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
            
            {/* Quick Flow Buttons */}
            <div>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-2">
                Presentation Flows
              </span>
              <div className="space-y-2">
                
                {/* Demo Flow C: Kart Swap */}
                <button
                  onClick={runDemoFlowC}
                  className="w-full text-left p-3 rounded-2xl bg-pastel-lavender-light hover:bg-pastel-lavender/50 border border-pastel-lavender transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white text-pastel-lavender-dark flex items-center justify-center shadow-xs">
                      <Repeat size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                        <span>Flow C: Kart Swap Matcher</span>
                        <span className="text-[9px] bg-pastel-lavender text-pastel-lavender-dark font-extrabold px-1.5 py-0.2 rounded-full">
                          Hero Feature
                        </span>
                      </div>
                      <p className="text-[10px] text-brand-muted">I Have Economics Book ➔ Priya 92% Match</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-pastel-lavender-dark group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Demo Flow A: Buy Flow */}
                <button
                  onClick={runDemoFlowA}
                  className="w-full text-left p-3 rounded-2xl bg-pastel-mint-light hover:bg-pastel-mint/50 border border-pastel-mint transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white text-pastel-mint-dark flex items-center justify-center shadow-xs">
                      <Compass size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-dark block">Flow A: Search & Buy Item</span>
                      <p className="text-[10px] text-brand-muted">Search Calculator ➔ Details ➔ Request Buy</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-pastel-mint-dark group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Demo Flow B: Sell Flow */}
                <button
                  onClick={runDemoFlowB}
                  className="w-full text-left p-3 rounded-2xl bg-pastel-peach-light hover:bg-pastel-peach/50 border border-pastel-peach transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white text-pastel-peach-dark flex items-center justify-center shadow-xs">
                      <PlusCircle size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-dark block">Flow B: Post New Listing</span>
                      <p className="text-[10px] text-brand-muted">Publish item ➔ Confetti ➔ Live in market</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-pastel-peach-dark group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick Demo Student Switcher */}
            <div>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-2">
                Active Student Identity
              </span>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(DEMO_USERS).slice(0, 4).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => switchUser(user.id)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      currentUser.id === user.id
                        ? 'bg-pastel-mint-light border-pastel-mint-dark text-brand-dark font-bold ring-1 ring-pastel-mint-dark'
                        : 'bg-white border-slate-200 text-brand-muted hover:border-slate-300'
                    }`}
                  >
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-lg object-cover" />
                    <div className="truncate">
                      <p className="text-[11px] truncate leading-tight font-semibold">{user.name}</p>
                      <p className="text-[9px] text-brand-muted truncate">{user.year}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Jump Shortcuts */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  navigate('/admin');
                  setIsOpen(false);
                }}
                className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1"
              >
                📊 Admin Dashboard
              </button>
              <button
                onClick={() => {
                  navigate('/partner');
                  setIsOpen(false);
                }}
                className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                🏫 College Partnership
              </button>
              <button
                onClick={() => {
                  resetToDemoState();
                  setIsOpen(false);
                }}
                className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
