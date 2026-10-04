import React, { useState } from 'react';
import { useCampusKart } from '../context/CampusKartContext';
import { 
  Building2, 
  ShieldCheck, 
  Repeat, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Lock, 
  Layers 
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { triggerCelebration } from '../utils/confetti';

export const PartnershipPage: React.FC = () => {
  const { addPartnershipInquiry } = useCampusKart();

  const [collegeName, setCollegeName] = useState("Marathwada Mitra Mandal's College of Commerce");
  const [contactPerson, setContactPerson] = useState('Dr. Sanjay Mehta (Dean of Student Affairs)');
  const [collegeEmail, setCollegeEmail] = useState('dean.affairs@apex.edu.in');
  const [phone, setPhone] = useState('+91 98765 00001');
  const [numberOfStudents, setNumberOfStudents] = useState('5,000 – 10,000');
  const [message, setMessage] = useState('We would love to roll out CampusKart and Kart Swap for our upcoming academic semester to facilitate sustainable textbook reuse.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addPartnershipInquiry({
        collegeName,
        contactPerson,
        collegeEmail,
        phone,
        numberOfStudents,
        message,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerCelebration();
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-14">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-r from-pastel-sage-light via-pastel-mint-light to-pastel-lavender-light border border-pastel-sage/60 shadow-soft text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/90 px-4 py-1.5 rounded-full border border-pastel-mint text-xs font-bold text-pastel-mint-dark shadow-xs">
          <Building2 size={15} />
          <span>University & Student Council Onboarding</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight leading-tight">
          Bring CampusKart to Your College
        </h1>

        <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto">
          Give your students a verified, zero-waste marketplace with automated student email verification, custom campus pickup nodes, and the signature Kart Swap engine.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-extrabold text-base text-brand-dark">Automated Verification</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Integration with college `.edu` or `.ac.in` domain emails ensures 100% verified student accounts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pastel-lavender-light text-pastel-lavender-dark flex items-center justify-center font-bold shadow-xs">
            <Repeat size={24} />
          </div>
          <h3 className="font-extrabold text-base text-brand-dark">Kart Swap Network</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Proprietary swap matching engine allows textbook exchanges without financial barrier.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pastel-peach-light text-pastel-peach-dark flex items-center justify-center font-bold shadow-xs">
            <TrendingUp size={24} />
          </div>
          <h3 className="font-extrabold text-base text-brand-dark">Admin Moderation & Insights</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            University administrators get a dedicated portal for circularity stats, reporting, and safety moderation.
          </p>
        </div>
      </div>

      {/* Interactive Inquiry Form */}
      <div className="bg-white rounded-4xl p-6 sm:p-10 border border-brand-border/80 shadow-soft-lg">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-1 mb-4">
              <h2 className="text-2xl font-black text-brand-dark tracking-tight">
                Partnership Inquiry Request
              </h2>
              <p className="text-xs text-brand-muted">
                Fill out the details below to request a customized deployment for your institution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-dark block">College / University Name *</label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-dark block">Contact Person / Designation *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-dark block">Official College Email *</label>
                <input
                  type="email"
                  required
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-dark block">Phone / Mobile *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-dark block">Approximate Number of Students</label>
              <select
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm font-medium text-brand-dark"
              >
                <option value="1,000 – 3,000">1,000 – 3,000 Students</option>
                <option value="3,000 – 5,000">3,000 – 5,000 Students</option>
                <option value="5,000 – 10,000">5,000 – 10,000 Students</option>
                <option value="10,000+">10,000+ Students</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-dark block">Message / Specific Campus Requirements</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-2xl bg-pastel-warm/50 border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full font-black justify-center shadow-soft"
            >
              Send Partnership Request
            </Button>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center mx-auto border-2 border-pastel-mint shadow-soft animate-bounce">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-black text-brand-dark">
              Partnership Request Received! 🎉
            </h3>

            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Thank you, <strong>{contactPerson}</strong>. Our campus onboarding director will reach out to <strong>{collegeEmail}</strong> within 24 hours to coordinate the pilot rollout.
            </p>

            <Button
              variant="outline"
              size="md"
              onClick={() => setIsSuccess(false)}
              className="font-bold"
            >
              Submit Another Inquiry
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
