import React from 'react';
import { Game } from '../types';
import { ArrowLeft, Clock, Trophy, PlayCircle } from 'lucide-react';

interface GameDetailsViewProps {
  game: Game;
  onBack: () => void;
}

export const GameDetailsView: React.FC<GameDetailsViewProps> = ({ game, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col relative animate-in zoom-in-95 duration-300">
      
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[60%] -z-10 rounded-[3rem] overflow-hidden opacity-80 mask-image-gradient">
        <img src={game.banner || game.image} alt="Banner" className="w-full h-full object-cover blur-sm scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-[#f0f4f8]"></div>
      </div>

      <button onClick={onBack} className="self-start bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-white transition mb-4 shadow-sm">
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="flex flex-col md:flex-row gap-8 mt-10 px-4">
        {/* Box Art */}
        <div className="w-64 h-64 md:w-80 md:h-80 bg-white p-2 rounded-[2.5rem] shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
            <img src={game.image} alt={game.title} className="w-full h-full object-cover rounded-[2rem]" />
        </div>

        {/* Info */}
        <div className="flex flex-col pt-8">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">{game.platform}</span>
                {game.isFavorite && <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">Favorite</span>}
            </div>
            
            <h1 className="text-5xl font-black text-gray-800 mb-4 leading-tight">{game.title}</h1>
            
            <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    <span className="font-bold text-gray-600">{game.playtime}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-gray-600">{game.achievementsEarned} / {game.achievementsTotal}</span>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-200/50 flex items-center gap-3 hover:scale-105 transition-transform">
                    <PlayCircle className="w-6 h-6 fill-current" />
                    Start Game
                </button>
                <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:bg-gray-50">
                    Game Media
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
