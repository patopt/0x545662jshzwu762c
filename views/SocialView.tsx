import React from 'react';
import { FRIENDS } from '../data';
import { Card } from '../components/ui/Card';
import { MessageCircle, UserPlus, Search } from 'lucide-react';

export const SocialView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-black text-green-600">iiSU Network</h2>
         <button className="bg-white p-3 rounded-full shadow-sm text-green-600">
            <UserPlus className="w-6 h-6" />
         </button>
      </div>

      {/* Online Now Row */}
      <div className="bg-green-500/10 rounded-[2rem] p-6 mb-6 border border-green-500/20">
         <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Online Friends
         </h3>
         <div className="flex gap-4 overflow-x-auto pb-2">
            {FRIENDS.filter(f => f.status !== 'offline').map(friend => (
                <div key={friend.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
                            <img src={friend.avatar} alt={friend.username} className="w-full h-full object-cover" />
                        </div>
                        {friend.messageCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                {friend.messageCount}
                            </div>
                        )}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 truncate max-w-full">{friend.username}</span>
                    {friend.game && <span className="text-[10px] font-bold text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full whitespace-nowrap">{friend.game}</span>}
                </div>
            ))}
         </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20 overflow-y-auto">
         {/* Feed Items */}
         {[1, 2].map((i) => (
             <Card key={i} className="p-4 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={FRIENDS[i].avatar} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <span className="font-bold text-gray-800">{FRIENDS[i].username}</span>
                        <span className="text-xs text-gray-400 font-bold">2h ago</span>
                    </div>
                    <div className="mt-2 bg-gray-100 rounded-xl p-3 text-sm text-gray-600 font-medium">
                        Just unlocked "Master Collector" in Ape Escape P! This game is nostalgia overload 🍌
                    </div>
                    <div className="mt-3 flex gap-4 text-xs font-bold text-gray-500">
                        <button className="hover:text-green-600">Like (12)</button>
                        <button className="hover:text-cyan-600">Reply</button>
                    </div>
                </div>
             </Card>
         ))}

         {/* Messages Preview */}
         <Card className="p-0 flex flex-col overflow-hidden col-span-1 lg:col-span-2 bg-white/50">
             <div className="p-4 bg-white/60 backdrop-blur-md border-b border-gray-100 font-bold text-gray-700 flex justify-between">
                <span>Recent Messages</span>
                <MessageCircle className="w-5 h-5 text-gray-400" />
             </div>
             <div className="p-4 flex flex-col gap-2">
                {FRIENDS.slice(0, 3).map(f => (
                    <div key={f.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-xl transition cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src={f.avatar} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-sm text-gray-800">{f.username}</div>
                            <div className="text-xs text-gray-500 truncate">Hey! Are we still playing Mario Kart later?</div>
                        </div>
                    </div>
                ))}
             </div>
         </Card>
      </div>

    </div>
  );
};
