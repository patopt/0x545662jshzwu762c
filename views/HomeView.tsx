import React from 'react';
import { NEWS } from '../data';
import { Card } from '../components/ui/Card';
import { Search } from 'lucide-react';

export const HomeView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col animate-in fade-in zoom-in duration-300">
      
      {/* Header Area */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Your Feed</h2>
            <span className="px-4 py-1 bg-white/50 rounded-full text-cyan-600 font-bold text-sm shadow-sm">iiSU</span>
            <span className="px-4 py-1 bg-white/50 rounded-full text-gray-500 font-bold text-sm shadow-sm">RSS</span>
        </div>
        <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 w-64 shadow-inner">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search Feed" className="bg-transparent border-none outline-none text-sm font-bold text-gray-600 w-full placeholder-gray-400" />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 overflow-y-auto pr-2">
        {NEWS.map((item) => (
            <Card key={item.id} className="flex flex-col h-64 relative group">
                <div className="absolute inset-0 bg-gray-200">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                <div className="mt-auto relative z-10 p-6">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <span className="font-bold text-white text-xs">ii</span>
                         </div>
                         <span className="text-white/80 text-sm font-bold uppercase tracking-wider">{item.source}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl leading-tight mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-xs font-medium">{item.date}</p>
                </div>
            </Card>
        ))}
        
        {/* Placeholder for visual balance */}
        <Card className="flex flex-col h-64 p-6 bg-gradient-to-br from-purple-500 to-indigo-600 border-none text-white">
            <div className="text-xs font-bold bg-white/20 self-start px-2 py-1 rounded mb-4">SYSTEM UPDATE</div>
            <h3 className="text-2xl font-bold mb-2">System v.2.0.4 Available</h3>
            <p className="text-white/80 text-sm mb-4">Performance improvements for PSP emulation and new Shopii features.</p>
            <button className="mt-auto bg-white text-purple-600 font-bold py-2 px-6 rounded-full self-start shadow-lg hover:bg-gray-100">Update Now</button>
        </Card>

        <Card className="flex flex-col h-64 p-0 relative border-none">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500"></div>
             <div className="relative z-10 p-6 flex flex-col h-full text-white">
                <h3 className="text-2xl font-bold">Featured Community Submissions</h3>
                <div className="flex gap-2 mt-4 overflow-hidden">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-16 h-16 bg-white/20 rounded-xl shadow-inner"></div>
                    ))}
                </div>
                <button className="mt-auto self-end text-sm font-bold flex items-center gap-1 hover:underline">View All &rarr;</button>
             </div>
        </Card>
      </div>
    </div>
  );
};
