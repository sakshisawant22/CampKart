import React, { useState } from 'react';
import { useCampusKart } from '../../context/CampusKartContext';
import { useNavigate } from 'react-router-dom';
import { Repeat, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { SwapMatchItem } from './SwapMatchCard';
import { triggerCelebration } from '../../utils/confetti';

interface SwapRequestModalProps {
  match: SwapMatchItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  match,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createSwapOffer, getOrCreateConversation } = useCampusKart();
  const navigate = useNavigate();

  const [notes, setNotes] = useState('Hey! Would love to swap this on campus. When are you free near the library?');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!match) return null;

  const handleSendSwap = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      createSwapOffer(
        {
          title: match.wantsItem.title,
          image: match.wantsItem.image,
          category: match.wantsItem.category,
          condition: match.wantsItem.condition,
        },
        {
          title: match.hasItem.title,
          image: match.hasItem.image,
          category: match.hasItem.category,
          condition: match.hasItem.condition,
        },
        match.student,
        match.matchScore,
        notes
      );
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerCelebration();
    }, 600);
  };

  const handleOpenChat = () => {
    onClose();
    const convId = getOrCreateConversation(match.student);
    navigate(`/messages?conv=${convId}`);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
    if (onSuccess) onSuccess();
    navigate('/my-campuskart');
  };

  return (
    <Modal isOpen={isOpen} onClose={() => !isSubmitting && onClose()} maxWidth="lg">
      {!isSuccess ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-pastel-lavender-light text-pastel-lavender-dark flex items-center justify-center mx-auto mb-2 border border-pastel-lavender shadow-xs">
              <Repeat size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-dark">Request Kart Swap</h3>
            <p className="text-xs text-brand-muted">
              Propose a 1-to-1 zero-cash item exchange with <strong>{match.student.name}</strong>
            </p>
          </div>

          {/* Swap Items Visual Comparison */}
          <div className="p-4 rounded-3xl bg-pastel-warm/70 border border-pastel-lavender/60 space-y-4">
            
            {/* You Offer */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200">
              <img
                src={match.wantsItem.image}
                alt={match.wantsItem.title}
                className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase text-pastel-sage-dark tracking-wider block">
                  You are Offering
                </span>
                <h4 className="text-xs font-bold text-brand-dark truncate">{match.wantsItem.title}</h4>
                <p className="text-[10px] text-brand-muted">{match.wantsItem.condition} • {match.wantsItem.category}</p>
              </div>
            </div>

            {/* Exchange connector */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs font-bold text-pastel-lavender-dark bg-pastel-lavender px-3 py-1 rounded-full">
                <Repeat size={13} />
                <span>{match.matchScore}% Match Compatibility</span>
              </div>
            </div>

            {/* You Receive */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200">
              <img
                src={match.hasItem.image}
                alt={match.hasItem.title}
                className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase text-pastel-lavender-dark tracking-wider block">
                  You Receive from {match.student.name}
                </span>
                <h4 className="text-xs font-bold text-brand-dark truncate">{match.hasItem.title}</h4>
                <p className="text-[10px] text-brand-muted">{match.hasItem.condition} • {match.hasItem.category}</p>
              </div>
            </div>
          </div>

          {/* Notes input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
              Message to {match.student.name}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Suggest convenient campus pickup time and location..."
              className="w-full p-3 rounded-2xl border border-brand-border text-xs text-brand-dark focus:ring-2 focus:ring-pastel-lavender focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              variant="lavender"
              size="md"
              isLoading={isSubmitting}
              onClick={handleSendSwap}
              className="font-bold"
            >
              Send Swap Request
            </Button>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="text-center space-y-5 py-4">
          <div className="w-16 h-16 rounded-3xl bg-pastel-lavender-light text-pastel-lavender-dark flex items-center justify-center mx-auto border-2 border-pastel-lavender shadow-soft animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-brand-dark">Swap Request Sent! 🚀</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
              We notified <strong>{match.student.name}</strong>. Once accepted, you can meet at a public campus spot to complete the exchange.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <Button
              variant="outline"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={handleOpenChat}
              className="flex-1 font-bold"
            >
              Chat with {match.student.name}
            </Button>
            <Button
              variant="lavender"
              size="md"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={handleFinish}
              className="flex-1 font-bold"
            >
              View My Swaps
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
