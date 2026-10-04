import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  ShieldCheck, 
  GraduationCap, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Zap 
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { CURRENT_DEMO_USER } from '../data/demoUsers';
import { triggerCelebration } from '../utils/confetti';

export const AuthVerifyPage: React.FC = () => {
  const { setIsVerified, setCurrentUser, showToast, demoCampus } = useCampusKart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('madiha.cse@campus.edu.in');
  const [otp, setOtp] = useState(['4', '8', '2', '6']);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      showToast('Please enter a valid college email ending in .edu / .ac.in / .edu.in', 'warning');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      showToast('Simulated OTP code sent to your campus email: 4826', 'info');
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setIsVerified(true);
      setCurrentUser(CURRENT_DEMO_USER);
      triggerCelebration();
      showToast('Student Identity Verified Successfully!', 'success');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }, 800);
  };

  const handleInstantDemoLogin = () => {
    setIsVerified(true);
    setCurrentUser(CURRENT_DEMO_USER);
    triggerCelebration();
    showToast('Logged in as Verified Demo Student (Madiha Khan)!', 'success');
    navigate('/home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-4xl p-6 sm:p-8 border border-brand-border/80 shadow-soft-xl space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pastel-sage to-pastel-mint text-pastel-mint-dark flex items-center justify-center mx-auto border-2 border-white shadow-soft">
            <ShieldCheck size={32} />
          </div>

          <h2 className="text-2xl font-black text-brand-dark tracking-tight">
            Student Verification
          </h2>

          <p className="text-xs text-brand-muted leading-relaxed">
            CampusKart is exclusive to verified students. Verify with your college credentials to start buying, selling & swapping.
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-pastel-sage-dark bg-pastel-sage-light px-3 py-1 rounded-full border border-pastel-sage">
            <Building2 size={13} />
            <span>{demoCampus}</span>
          </div>
        </div>

        {/* STEP 1: EMAIL INPUT */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                <Mail size={14} className="text-pastel-sage-dark" />
                <span>College Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu.in"
                className="w-full px-4 py-3 rounded-2xl bg-pastel-warm/60 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage focus:outline-none"
              />
              <p className="text-[11px] text-brand-muted">
                Accepts college domains (.edu.in, .ac.in, .edu).
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              className="w-full font-bold justify-center"
            >
              Send Verification OTP
            </Button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="p-3 bg-pastel-mint-light/60 rounded-2xl border border-pastel-mint text-xs text-pastel-mint-dark text-center">
              We sent a 4-digit code to <strong>{email}</strong>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-dark text-center block">
                Enter 4-Digit Campus Code
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center font-black text-xl bg-pastel-warm/60 border-2 border-brand-border rounded-2xl focus:border-pastel-sage-dark focus:outline-none"
                  />
                ))}
              </div>
              <p className="text-[11px] text-center text-brand-muted">
                Demo Code Pre-filled: <strong>4826</strong>
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              icon={<CheckCircle2 size={16} />}
              className="w-full font-bold justify-center"
            >
              Verify & Enter CampusKart
            </Button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-center text-xs text-brand-muted hover:text-brand-dark"
            >
              ← Change Email Address
            </button>
          </form>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {step === 'success' && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center mx-auto border-2 border-pastel-mint shadow-soft">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-brand-dark">Verification Successful! 🎉</h3>
              <p className="text-xs text-brand-muted">
                Welcome Madiha Khan (CSE • 2nd Year). Redirecting to your CampusKart dashboard...
              </p>
            </div>
          </div>
        )}

        {/* JUDGE QUICK ENTRY CALLOUT */}
        <div className="pt-4 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pastel-mint-light to-pastel-lavender-light border border-pastel-mint space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-pastel-sage-dark" />
                <span>Hackathon Judge Quick Entry</span>
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border">1-Click</span>
            </div>
            <p className="text-[11px] text-brand-muted">
              Skip authentication and enter directly as a verified 2nd-year CSE student.
            </p>
            <Button
              variant="secondary"
              size="md"
              icon={<Sparkles size={15} />}
              onClick={handleInstantDemoLogin}
              className="w-full font-bold justify-center border border-pastel-mint"
            >
              Continue as Demo Student (Instant)
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
