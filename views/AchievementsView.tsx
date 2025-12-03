import React from 'react';
import { GAMES } from '../data';
import { Card } from '../components/ui/Card';
import { Trophy, Medal, Star } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const totalTrophies = GAMES.reduce((acc, game) => acc + game.achievementsEarned, 0);

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
      
      {/* Header Stat */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm mb-8">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-yellow-200">
                <Trophy size={32} fill="currentColor" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-800">RetroAchievements</h2>
                <div className="flex items-center gap-2">
                     <span className="font-bold text-gray-500">Global Rank:</span>
                     <span className="font-black text-cyan-600">#8,204</span>
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-4xl font-black text-gray-800">{totalTrophies}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Unlocked</div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
         <h3 className="text-xl font-bold text-gray-700 px-4">Recently Earned</h3>
      </div>

      {/* Horizontal List of Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 overflow-y-auto pr-2">
         {GAMES.map((game) => {
             const progress = (game.achievementsEarned / game.achievementsTotal) * 100;
             const isComplete = progress === 100;

             return (
                 <Card key={game.id} className="p-4 flex gap-4 items-center">
                     <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative">
                        <img src={game.image} className="w-full h-full object-cover" />
                        {isComplete && (
                            <div className="absolute inset-0 bg-yellow-500/80 flex items-center justify-center">
                                <Star fill="white" className="text-white" />
                            </div>
                        )}
                     </div>
                     
                     <div className="flex-1">
                         <div className="flex justify-between mb-1">
                             <h4 className="font-bold text-gray-800 truncate">{game.title}</h4>
                             <span className="text-xs font-bold text-gray-400">{game.platform}</span>
                         </div>
                         
                         {/* Progress Bar */}
                         <div className="w-full h-3 bg-gray-200 rounded-full mb-2 overflow-hidden">
                             <div 
                                className={`h-full rounded-full transition-all duration-1000 ${isComplete ? 'bg-yellow-400' : 'bg-cyan-400'}`} 
                                style={{ width: `${progress}%` }}
                             ></div>
                         </div>
                         
                         <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500">{game.achievementsEarned} / {game.achievementsTotal}</span>
                            {isComplete && <span className="text-[10px] bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded font-bold">MASTERED</span>}
                         </div>
                     </div>
                     
                     {/* Mini Recent Trophy Icons */}
                     <div className="hidden lg:flex gap-1">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center grayscale opacity-50">
                                <Medal size={14} />
                            </div>
                        ))}
                     </div>
                 </Card>
             );
         })}
      </div>
    </div>
  );
};
