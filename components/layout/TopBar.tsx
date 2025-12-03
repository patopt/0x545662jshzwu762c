import React, { useState, useEffect } from 'react';
import { Battery, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';

interface TopBarProps {
    isMuted?: boolean;
    toggleMute?: () => void;
    isMobileMode: boolean;
    toggleMobileMode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ isMuted = false, toggleMute, isMobileMode, toggleMobileMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  };

  return (
    <div className={`w-full flex items-center justify-between px-4 md:px-8 z-50 shrink-0 ${isMobileMode ? 'h-16 mt-2' : 'h-14 md:h-16'}`}>
      {/* Left: Branding & Searchish bar */}
      <div className="flex items-center gap-4">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-4 md:px-6 py-1.5 md:py-2 flex items-center gap-2 shadow-sm">
          <span className="text-cyan-500 font-bold text-lg md:text-xl tracking-tighter">iiCh</span>
          {!isMobileMode && <span className="text-gray-400 font-medium hidden md:inline">iiChannel</span>}
        </div>
      </div>

      {/* Center: Controller Hints (Hidden on mobile mode) */}
      {!isMobileMode && (
        <div className="hidden lg:flex items-center gap-4 text-gray-600 font-bold text-sm bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full">
            <span className="flex items-center gap-1"><span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">A</span> Select</span>
            <span className="flex items-center gap-1"><span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">B</span> Back</span>
            <span className="flex items-center gap-1"><span className="border-2 border-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">-</span> Share</span>
            <span className="flex items-center gap-1"><span className="border-2 border-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">+</span> Menu</span>
        </div>
      )}

      {/* Right: Status */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Mobile Toggle */}
        <button 
            onClick={toggleMobileMode} 
            className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition text-gray-700 shadow-sm"
            title={isMobileMode ? "Switch to Console View" : "Switch to Mobile View"}
        >
            {isMobileMode ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
        </button>

        {/* Volume Toggle */}
        <button onClick={toggleMute} className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition text-gray-700 shadow-sm">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <div className={`bg-white/80 backdrop-blur-md rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 flex items-center gap-2 md:gap-4 shadow-sm relative ${isMobileMode ? 'hidden' : ''}`}>
             <div className="hidden md:block bg-gray-200 p-1 rounded-full absolute -left-2 top-1/2 transform -translate-y-1/2 border-2 border-white">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-400 text-xs">RT</div>
             </div>
             <div className="md:ml-6 flex items-center gap-2 md:gap-3 font-bold text-gray-700 text-xs md:text-base">
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div> {formatTime(time)}</span>
                <span className="text-gray-300 hidden md:inline">|</span>
                <span className="hidden md:inline">{formatDate(time)}</span>
                <Battery className="w-5 h-5 md:w-6 md:h-6 text-gray-700 fill-current" />
             </div>
        </div>
        
        {/* User Icon */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/id/64/200/200" alt="User" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </div>
  );
};