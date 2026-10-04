import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, PlusCircle, Repeat, User } from 'lucide-react';
import { useCampusKart } from '../../context/CampusKartContext';

export const MobileBottomNav: React.FC = () => {
  const { wishlistIds, conversations } = useCampusKart();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Sell', path: '/sell', icon: PlusCircle, isAction: true },
    { name: 'Swap', path: '/swap', icon: Repeat, isSwap: true },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border/70 shadow-soft-xl px-2 py-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                  item.isAction
                    ? 'text-pastel-mint-dark'
                    : isActive
                    ? 'text-pastel-sage-dark font-bold scale-105'
                    : 'text-brand-muted hover:text-brand-dark'
                }`
              }
            >
              {item.isAction ? (
                <div className="w-11 h-11 -mt-5 rounded-full bg-gradient-to-tr from-pastel-sage to-pastel-mint flex items-center justify-center shadow-soft border-2 border-white text-pastel-mint-dark hover:scale-110 transition-transform">
                  <Icon size={22} className="stroke-[2.5]" />
                </div>
              ) : (
                <div className="relative">
                  <Icon size={20} className={item.isSwap ? 'text-pastel-lavender-dark' : ''} />
                  {item.name === 'Profile' && totalUnreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  )}
                </div>
              )}
              <span className={`text-[10px] tracking-tight ${item.isAction ? 'font-bold text-pastel-sage-dark mt-0.5' : 'mt-1'}`}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
