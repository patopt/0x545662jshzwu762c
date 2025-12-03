import React from 'react';
import { Home, Grid, Users, LayoutDashboard, ShoppingBag, Trophy, Smartphone } from 'lucide-react';
import { ViewState } from '../../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileMode = false }) => {
  
  // If in mobile mode, we might hide the sidebar entirely in the parent, 
  // but just in case, we can return null here.
  if (isMobileMode) return null;

  const navItems = [
    { id: ViewState.HOME, label: 'Feed', icon: Home, color: 'text-gray-600' },
    { id: ViewState.APPS, label: 'Apps', icon: Smartphone, color: 'text-pink-500' },
    { id: ViewState.LIBRARY, label: 'Library', icon: Grid, color: 'text-purple-500' },
    { id: ViewState.SOCIAL, label: 'Network', icon: Users, color: 'text-green-500' },
    { id: ViewState.ACHIEVEMENTS, label: 'Trophies', icon: Trophy, color: 'text-yellow-500' },
    { id: ViewState.SHOP, label: 'Shopii', icon: ShoppingBag, color: 'text-orange-400' },
  ];

  return (
    <div className="w-16 md:w-24 lg:w-64 flex flex-col items-center lg:items-start py-4 md:py-8 px-2 md:px-4 h-full relative z-40 transition-all duration-300">
      
      {/* Brand/Logo Area */}
      <div className="mb-6 md:mb-10 px-0 lg:px-4 flex justify-center lg:justify-start w-full">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hidden lg:block">
          iiSU
        </h1>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-xl lg:hidden shadow-sm"></div>
      </div>

      {/* Nav List */}
      <div className="flex flex-col gap-2 md:gap-4 w-full overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id || (item.id === ViewState.LIBRARY && currentView === ViewState.GAME_DETAILS);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`
                group relative flex items-center justify-center lg:justify-start gap-4 p-2 lg:px-4 lg:py-4 rounded-2xl lg:rounded-3xl transition-all duration-300 w-full
                ${isActive ? 'bg-white shadow-lg lg:scale-105' : 'hover:bg-white/40 hover:shadow-sm'}
              `}
            >
              <div className={`
                w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl flex items-center justify-center transition-colors duration-300 flex-shrink-0
                ${isActive ? 'bg-gray-100' : 'bg-white/60'}
              `}>
                <Icon className={`w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 ${item.color}`} />
              </div>
              
              <div className="hidden lg:flex flex-col items-start">
                <span className={`font-bold text-lg leading-none ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                  {item.label}
                </span>
                {isActive && <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mt-1">Active</span>}
              </div>

              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 md:h-8 bg-cyan-400 rounded-r-full lg:hidden"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Search Icon */}
      <div className="mt-auto w-full px-0 lg:px-4 pt-4">
        <button className="w-full flex items-center justify-center lg:justify-start gap-4 p-2 lg:p-4 rounded-3xl hover:bg-white/40 transition-all text-gray-500">
             <div className="w-10 h-10 bg-white/60 rounded-2xl flex items-center justify-center flex-shrink-0">
                 <LayoutDashboard className="w-5 h-5" />
             </div>
             <span className="hidden lg:block font-bold">Dashboard</span>
        </button>
      </div>
    </div>
  );
};