
import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Image as ImageIcon, Music, Video, Gamepad2, Globe, Wifi, Battery, BatteryCharging, MemoryStick } from 'lucide-react';
import { PspWaves } from '../components/ui/PspWaves';
import { GAMES } from '../data';
import { Game } from '../types';

interface PspViewProps {
  onExit: () => void;
}

// XMB Data Structure
const CATEGORIES = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'photo', label: 'Photo', icon: ImageIcon },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'game', label: 'Game', icon: Gamepad2 },
  { id: 'network', label: 'Network', icon: Globe },
];

export const PspView: React.FC<PspViewProps> = ({ onExit }) => {
  const [selectedCatIndex, setSelectedCatIndex] = useState(4); // Default to 'Game'
  const [selectedItemIndex, setSelectedItemIndex] = useState(0); // 0 = Icon itself (No selection), >0 = Items
  const [time, setTime] = useState(new Date());

  // Filter PSP Games for the Game category
  const pspGames = GAMES.filter(g => g.platform === 'PSP');
  
  const activeCategory = CATEGORIES[selectedCatIndex];
  
  // Define items for the active category
  const getCategoryItems = useCallback(() => {
    if (activeCategory.id === 'game') {
        return [
            { id: 'umd', label: 'UMD™', icon: '💿', type: 'system' },
            { id: 'ms', label: 'Memory Stick™', icon: MemoryStick, type: 'folder', count: pspGames.length },
            ...pspGames.map(g => ({ ...g, type: 'game' }))
        ];
    }
    return [
        { id: 'empty', label: 'There are no items.', icon: null, type: 'empty' }
    ];
  }, [activeCategory.id, pspGames]);

  const items = getCategoryItems();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedCatIndex(prev => Math.max(0, prev - 1));
        setSelectedItemIndex(0); // Reset item selection when changing category
      } else if (e.key === 'ArrowRight') {
        setSelectedCatIndex(prev => Math.min(CATEGORIES.length - 1, prev + 1));
        setSelectedItemIndex(0);
      } else if (e.key === 'ArrowDown') {
        setSelectedItemIndex(prev => Math.min(items.length, prev + 1));
      } else if (e.key === 'ArrowUp') {
        setSelectedItemIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, onExit]);

  // Format Date/Time like PSP
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  };

  return (
    <div className="w-full h-full relative overflow-hidden font-sans text-white select-none">
      
      {/* Background Layer */}
      <PspWaves />

      {/* Top Status Bar */}
      <div className="absolute top-0 right-0 p-4 md:p-8 flex items-end gap-4 z-20 opacity-90">
         <div className="text-xl md:text-2xl drop-shadow-md tracking-widest font-normal">
            {formatDate(time)} <span className="ml-2">{formatTime(time)}</span>
         </div>
         <div className="flex items-center gap-1">
             <BatteryCharging className="w-6 h-6 md:w-8 md:h-8 drop-shadow-md animate-pulse" />
         </div>
      </div>

      {/* Main XMB Grid Container */}
      {/* The grid is positioned so the active category is roughly centered horizontally */}
      <div 
        className="absolute inset-0 flex flex-col justify-center transition-transform duration-300 ease-out z-10"
        style={{ transform: `translateX(${(2 - selectedCatIndex) * 120}px)` }} // Simple centering logic
      >
        
        {/* Horizontal Category Row */}
        <div className="flex items-center h-24 md:h-32 relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-[200%] h-[1px] bg-white/30 -z-10"></div>

            {CATEGORIES.map((cat, index) => {
                const isActive = index === selectedCatIndex;
                const Icon = cat.icon;
                
                return (
                    <div 
                        key={cat.id}
                        className={`
                            w-32 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                            ${isActive ? 'opacity-100 scale-125' : 'opacity-50 scale-90'}
                        `}
                        onClick={() => {
                            setSelectedCatIndex(index);
                            setSelectedItemIndex(0);
                        }}
                    >
                        <div className={`
                            drop-shadow-lg transition-all duration-500
                            ${isActive ? 'text-white' : 'text-gray-300'}
                            ${isActive && selectedItemIndex === 0 ? 'animate-pulse' : ''}
                        `}>
                            <Icon size={isActive ? 48 : 32} fill={isActive ? "currentColor" : "none"} />
                        </div>
                        {isActive && selectedItemIndex === 0 && (
                            <span className="absolute -bottom-8 text-sm uppercase tracking-widest font-bold text-shadow-sm whitespace-nowrap">
                                {cat.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>

        {/* Vertical Items Column (Only for Active Category) */}
        {/* We use absolute positioning relative to the screen center, but shifted to match the selected category */}
        <div 
            className="absolute top-1/2 left-0 w-full h-[50vh] flex flex-col items-center pointer-events-none"
            style={{ 
                left: `${(selectedCatIndex * 128)}px`, // Match the category width spacing
                transform: `translateX(calc(50vw - ${(selectedCatIndex * 128) + 64}px))` // Center the column on screen
            }} 
        >
            <div 
                className="flex flex-col items-start gap-4 pt-16 transition-all duration-300"
                style={{ transform: `translateY(${(1 - selectedItemIndex) * 60}px)` }}
            >
                {items.map((item: any, index) => {
                    // Index mapping: 0 is the category icon (hidden here), 1 is the first item
                    const itemRealIndex = index + 1;
                    const isActive = itemRealIndex === selectedItemIndex;

                    return (
                        <div 
                            key={item.id}
                            className={`
                                flex items-center gap-4 transition-all duration-200 pl-8
                                ${isActive ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}
                            `}
                        >
                            {/* Icon Box */}
                            <div className={`
                                w-24 h-16 flex items-center justify-center rounded-md shadow-lg overflow-hidden
                                ${item.type === 'game' ? 'bg-black' : 'bg-transparent'}
                                ${isActive ? 'border-2 border-white/50' : 'border border-transparent'}
                            `}>
                                {item.icon && typeof item.icon !== 'string' ? (
                                    <item.icon size={32} className="text-white drop-shadow-md" />
                                ) : item.type === 'game' ? (
                                    <img src={item.image} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl">{item.icon}</span>
                                )}
                            </div>

                            {/* Label */}
                            <div className="flex flex-col">
                                <span className={`text-xl font-normal drop-shadow-md ${isActive ? 'text-white' : 'text-gray-200'}`}>
                                    {item.title || item.label}
                                </span>
                                {isActive && item.type === 'game' && (
                                    <span className="text-xs uppercase tracking-widest opacity-80">Start</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>

      {/* Button Hints */}
      <div className="absolute bottom-8 right-8 flex gap-6 text-white/80 font-bold text-sm tracking-wide z-20">
            <span className="flex items-center gap-1"><span className="border border-white/60 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">✕</span> Enter</span>
            <span className="flex items-center gap-1"><span className="border border-white/60 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">○</span> Back</span>
            <span className="flex items-center gap-1"><span className="border border-white/60 w-5 h-5 rounded-md flex items-center justify-center text-[10px]">△</span> Options</span>
            <button 
                onClick={onExit}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
                <span className="border border-white/60 px-2 rounded-full text-[10px]">HOME</span> Quit PSP
            </button>
      </div>

    </div>
  );
};
