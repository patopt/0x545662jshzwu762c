import React from 'react';
import { Menu, Info, Settings } from 'lucide-react';

export const BottomBar: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-16 flex items-center justify-between px-10 pb-4 z-40 pointer-events-none">
       {/* Left Actions */}
       <div className="flex items-center gap-4 pointer-events-auto">
          <button className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-gray-700 font-bold text-sm shadow-sm hover:bg-white transition">
            <Settings className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-gray-700 font-bold text-sm shadow-sm hover:bg-white transition">
            <Info className="w-4 h-4" />
            <span>Details</span>
          </button>
       </div>

       {/* Center Pagination (Decorative) */}
       <div className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full flex gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
       </div>

       {/* Right Actions */}
       <div className="flex items-center gap-4 pointer-events-auto">
          <button className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-gray-700 font-bold text-sm shadow-sm hover:bg-white transition">
            <span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">A</span>
            <span>Select</span>
          </button>
          <button className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-gray-700 font-bold text-sm shadow-sm hover:bg-white transition">
            <span className="border-2 border-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">+</span>
            <span>Menu</span>
          </button>
       </div>
    </div>
  );
};
