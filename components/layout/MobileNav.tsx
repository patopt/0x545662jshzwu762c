import React from 'react';
import { Home, Grid, Users, LayoutDashboard, ShoppingBag, Trophy, Smartphone } from 'lucide-react';
import { ViewState } from '../../types';

interface MobileNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Feed', icon: Home },
    { id: ViewState.APPS, label: 'Apps', icon: Smartphone },
    { id: ViewState.LIBRARY, label: 'Games', icon: Grid },
    { id: ViewState.SOCIAL, label: 'Social', icon: Users },
  ];

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-6 pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        
        return (
          <button 
            key={item.id}
            onClick={() => setView(item.id)}
            className="flex flex-col items-center gap-1 w-16"
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-cyan-100 text-cyan-600 translate-y-[-5px] shadow-sm' : 'text-gray-400'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[3px]' : ''}`} />
            </div>
            {isActive && <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>}
          </button>
        );
      })}
    </div>
  );
};