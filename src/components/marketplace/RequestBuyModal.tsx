import React, { useState } from 'react';
import { Product } from '../../types';
import { useCampusKart } from '../../context/CampusKartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/helpers';
import { triggerCelebration } from '../../utils/confetti';

interface RequestBuyModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RequestBuyModal: React.FC<RequestBuyModalProps> = ({
  product,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { requestPurchase, showToast } = useCampusKart();
  const navigate = useNavigate();

  const [pickupSpot, setPickupSpot] = useState<string>(product.location || 'Main Building');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      requestPurchase(product.id, pickupSpot);
      setIsLoading(false);
      setIsSubmitted(true);
      triggerCelebration();
    }, 600);
  };

  const handleFinish = (goToHub: boolean = false) => {
    setIsSubmitted(false);
    onSuccess();
    if (goToHub) {
      navigate('/my-campuskart');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => !isLoading && onClose()} maxWidth="md">
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center mx-auto mb-2 border border-pastel-mint shadow-xs">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-dark">Request Item from Student</h3>
            <p className="text-xs text-brand-muted">
              Confirm your request to connect with {product.seller.name} on campus.
            </p>
          </div>

          {/* Item Preview Card */}
          <div className="p-4 rounded-2xl bg-pastel-warm/60 border border-brand-border flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-brand-dark truncate">{product.title}</h4>
              <p className="text-xs text-brand-muted">{product.condition} • {product.category}</p>
              <div className="text-base font-black text-brand-dark mt-0.5">
                {formatCurrency(product.price)}
              </div>
            </div>
          </div>

          {/* Preferred Campus Pickup Spot */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
              <MapPin size={14} className="text-pastel-sage-dark" />
              <span>Campus Meetup Location</span>
            </label>
            <select
              value={pickupSpot}
              onChange={(e) => setPickupSpot(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-brand-border text-xs sm:text-sm font-medium text-brand-dark focus:ring-2 focus:ring-pastel-sage"
            >
              <option value="Block A">Block A Ground Floor</option>
              <option value="Block B">Block B Canteen Area</option>
              <option value="Main Building">Main Building Reception</option>
              <option value="Library">Central Library Gate</option>
              <option value="Girls' Hostel">Girls' Hostel Front Gate</option>
              <option value="Boys' Hostel">Boys' Hostel Front Gate</option>
              <option value="Student Center">Student Activity Center</option>
            </select>
          </div>

          {/* Trust Notice */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-800 flex items-start gap-2">
            <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Zero Advance Required. Inspect the item in person on campus before paying the student.</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isLoading}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isLoading}
              onClick={handleConfirm}
              className="font-bold"
            >
              Confirm Request
            </Button>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="text-center space-y-5 py-4">
          <div className="w-16 h-16 rounded-3xl bg-pastel-mint-light text-pastel-mint-dark flex items-center justify-center mx-auto border-2 border-pastel-mint shadow-soft animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-brand-dark">Request Sent Successfully! 🎉</h3>
            <p className="text-xs text-brand-muted max-w-xs mx-auto leading-relaxed">
              We notified <strong>{product.seller.name}</strong>. The request status is now <strong>Pending</strong> in your My CampusKart hub.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pastel-warm/60 border border-slate-200 text-xs text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-brand-muted">Item:</span>
              <span className="font-bold text-brand-dark">{product.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Amount:</span>
              <span className="font-bold text-brand-dark">{formatCurrency(product.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Pickup:</span>
              <span className="font-bold text-brand-dark">{pickupSpot}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => handleFinish(false)}
              className="flex-1 font-bold"
            >
              Continue Browsing
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={() => handleFinish(true)}
              className="flex-1 font-bold"
            >
              View My CampusKart
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
