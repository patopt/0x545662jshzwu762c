
import React from 'react';
import { GAMES } from '../data';
import { Game } from '../types';
import { Card } from '../components/ui/Card';
import { Gamepad2, Play } from 'lucide-react';

interface LibraryViewProps {
  onGameSelect: (game: Game) => void;
  selectedPlatform?: string;
  onSelectPlatform?: (platform: string) => void;
  onLaunchSystem?: (system: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ 
    onGameSelect, 
    selectedPlatform = 'All', 
    onSelectPlatform,
    onLaunchSystem
}) => {
  
  const filteredGames = selectedPlatform === 'All' 
    ? GAMES 
    : GAMES.filter(g => g.platform === selectedPlatform);

  const handlePlatformClick = (console: string) => {
      if (console === 'PSP' && onLaunchSystem) {
          onLaunchSystem('PSP');
      } else if (onSelectPlatform) {
          onSelectPlatform(console);
      }
  };

  return (
    <div className="w-full h-full flex flex-col animate-in slide-in-from-right-4 duration-500">
        
        {/* Console Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar px-2">
            {['All', 'PSP', 'NDS', 'Switch', 'PSVita', 'Retro'].map((console) => (
                <button 
                    key={console} 
                    onClick={() => handlePlatformClick(console)}
                    className={`
                        px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2
                        ${console === 'PSP' ? 'border-2 border-cyan-400 bg-cyan-50 text-cyan-600' : ''}
                        ${console === selectedPlatform 
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-200 scale-105 border-none' 
                            : 'bg-white/50 text-gray-500 hover:bg-white'}
                    `}
                >
                    {console} {console === 'PSP' && <Play size={12} className="fill-current" />}
                </button>
            ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24 overflow-y-auto pr-2">
            {/* Folder / Special items */}
            <Card className="aspect-square flex flex-col items-center justify-center text-gray-400 bg-white/40 border-dashed border-2 border-gray-300">
                <Gamepad2 className="w-10 h-10 mb-2 opacity-50" />
                <span className="font-bold text-sm">Add Game</span>
            </Card>

            {filteredGames.map((game) => (
                <Card 
                    key={game.id} 
                    className="aspect-square relative group p-2"
                    onClick={() => onGameSelect(game)}
                >
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-inner">
                        <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 text-white">
                                <Play className="w-8 h-8 fill-current" />
                            </div>
                        </div>

                        {/* Platform Badge */}
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            {game.platform}
                        </div>
                    </div>
                    
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-t-xl shadow-lg translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs font-bold text-gray-800 whitespace-nowrap">{game.title}</span>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};
