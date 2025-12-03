import React from 'react';
import { SHOP_ITEMS } from '../data';
import { Card } from '../components/ui/Card';
import { Download, Heart, Music, Image as ImageIcon, Box } from 'lucide-react';

export const ShopView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex items-center gap-2 mb-6">
            <h2 className="text-4xl font-black text-orange-400 tracking-tighter">Shopii</h2>
            <span className="text-gray-400 font-bold text-sm mt-2">Community Market</span>
        </div>

        {/* Featured Banner */}
        <div className="w-full h-48 rounded-[2rem] bg-gradient-to-r from-orange-300 to-pink-400 mb-8 flex items-center px-10 text-white relative overflow-hidden shadow-lg shadow-orange-200">
             <div className="relative z-10">
                 <h3 className="text-3xl font-bold mb-2">Sonic Bundle Available Now!</h3>
                 <p className="font-medium opacity-90 mb-4">Complete theme set, BGM, and icons by SegaFan99.</p>
                 <button className="bg-white text-orange-500 font-bold px-6 py-2 rounded-full shadow-md hover:bg-orange-50 transition">View Details</button>
             </div>
             <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://picsum.photos/id/16/800/400')] bg-cover opacity-50 mix-blend-overlay mask-image-linear-gradient"></div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
             <button className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md">Featured</button>
             <button className="bg-white text-gray-500 px-5 py-2 rounded-xl font-bold text-sm hover:bg-orange-50">Themes</button>
             <button className="bg-white text-gray-500 px-5 py-2 rounded-xl font-bold text-sm hover:bg-orange-50">Audio</button>
             <button className="bg-white text-gray-500 px-5 py-2 rounded-xl font-bold text-sm hover:bg-orange-50">Assets</button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-20 overflow-y-auto pr-2">
            {SHOP_ITEMS.map((item) => (
                <Card key={item.id} className="flex flex-col p-4">
                    <div className="w-full aspect-square rounded-2xl bg-gray-100 mb-4 overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-lg">
                            {item.type === 'Audio' ? <Music size={14} /> : item.type === 'Theme' ? <ImageIcon size={14} /> : <Box size={14} />}
                        </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 text-lg leading-none mb-1">{item.title}</h4>
                    <span className="text-xs font-bold text-gray-400 mb-2">{item.author}</span>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                         <div className="flex flex-col">
                             <div className="flex items-center gap-1 text-xs font-bold text-pink-500">
                                <Heart size={12} fill="currentColor" /> {item.likes}
                             </div>
                             <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                                <Download size={12} /> {item.downloads}
                             </div>
                         </div>
                         <button className="bg-orange-100 text-orange-500 p-2 rounded-xl hover:bg-orange-200 transition">
                            <Download size={18} />
                         </button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};
