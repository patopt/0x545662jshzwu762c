
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, Game, SystemMode } from './types';
import { RotateCw, Play } from 'lucide-react';

// Layout Components
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomBar } from './components/layout/BottomBar';
import { MobileNav } from './components/layout/MobileNav';

// Views
import { HomeView } from './views/HomeView';
import { LibraryView } from './views/LibraryView';
import { GameDetailsView } from './views/GameDetailsView';
import { SocialView } from './views/SocialView';
import { ShopView } from './views/ShopView';
import { AchievementsView } from './views/AchievementsView';
import { AppsView } from './views/AppsView';
import { PspView } from './views/PspView';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // App State
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  
  // OS System State
  const [systemMode, setSystemMode] = useState<SystemMode>(SystemMode.DEFAULT);
  
  // Platform State (Lifted from LibraryView)
  const [currentPlatform, setCurrentPlatform] = useState<string>('All');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background Music URL (Chill Lofi / Ambient style)
  const BGM_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"; 

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (hasStarted && !isMuted) {
        audioRef.current.volume = 0.3; // Lower volume for background
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [hasStarted, isMuted]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setView(ViewState.GAME_DETAILS);
  };

  const handleBack = () => {
    setView(ViewState.LIBRARY);
    setSelectedGame(null);
  };

  const toggleMobileMode = () => {
    setIsMobileMode(!isMobileMode);
  }

  const handleLaunchSystem = (system: string) => {
    if (system === 'PSP') {
        setSystemMode(SystemMode.PSP);
        // Optional: Change audio or sound effect here
    }
  };

  const handleExitSystem = () => {
      setSystemMode(SystemMode.DEFAULT);
  };

  // Background visual elements for the "Console OS" vibe
  const renderBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#f0f4f8]">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
           <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-4000"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView />;
      case ViewState.LIBRARY:
        return (
            <LibraryView 
                onGameSelect={handleGameSelect} 
                selectedPlatform={currentPlatform}
                onSelectPlatform={setCurrentPlatform}
                onLaunchSystem={handleLaunchSystem}
            />
        );
      case ViewState.APPS:
        return <AppsView />;
      case ViewState.GAME_DETAILS:
        return selectedGame ? <GameDetailsView game={selectedGame} onBack={handleBack} /> : <LibraryView onGameSelect={handleGameSelect} selectedPlatform={currentPlatform} onSelectPlatform={setCurrentPlatform} />;
      case ViewState.SOCIAL:
        return <SocialView />;
      case ViewState.SHOP:
        return <ShopView />;
      case ViewState.ACHIEVEMENTS:
        return <AchievementsView />;
      default:
        return <HomeView />;
    }
  };

  // 1. Portrait Warning Screen (Only show if NOT in mobile mode)
  if (isPortrait && !isMobileMode) {
    return (
      <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        {renderBackground()}
        <div className="relative z-10 flex flex-col items-center backdrop-blur-md bg-black/30 p-8 rounded-3xl border border-white/10">
            <RotateCw className="w-16 h-16 mb-6 animate-spin-slow text-cyan-400" />
            <h1 className="text-2xl font-bold mb-2">Please Rotate Your Device</h1>
            <p className="text-gray-300 mb-6">The iiSU Console interface is designed for landscape mode.</p>
            
            <button 
                onClick={() => setIsMobileMode(true)}
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-cyan-100 transition"
            >
                Switch to Mobile Mode
            </button>
        </div>
      </div>
    );
  }

  // 2. "Press Start" Screen (To unlock AudioContext)
  if (!hasStarted) {
    return (
        <div 
            className="w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleStart}
        >
            {renderBackground()}
            <div className="relative z-10 flex flex-col items-center animate-in zoom-in duration-500">
                <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter drop-shadow-sm">
                        iiSU
                    </h1>
                </div>
                <div className="bg-white/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/50 shadow-lg animate-pulse">
                    <span className="text-gray-700 font-bold text-lg md:text-xl flex items-center gap-2">
                        <Play className="w-5 h-5 fill-current" />
                        Tap to Start
                    </span>
                </div>
                <p className="mt-8 text-gray-400 font-medium text-sm">Experience the Future of Emulation</p>
            </div>
        </div>
    );
  }

  // 3. SYSTEM MODE: PSP (XMB)
  if (systemMode === SystemMode.PSP) {
      return (
          <div className="w-screen h-screen bg-black overflow-hidden relative">
              <PspView onExit={handleExitSystem} />
          </div>
      );
  }

  // 4. SYSTEM MODE: DEFAULT (Glass UI)
  return (
    <div className={`w-screen h-screen relative flex flex-col overflow-hidden text-gray-800 antialiased selection:bg-cyan-200 selection:text-cyan-900 ${isMobileMode ? 'bg-[#f0f4f8]' : ''}`}>
      
      {/* Background Music */}
      <audio ref={audioRef} loop src={BGM_URL} />

      {/* Render background only if in console mode for performance/visual clarity */}
      {!isMobileMode && renderBackground()}

      {/* Main Container - FLEX FIX for Desktop */}
      <div className={`
        relative z-10 w-full h-full flex flex-col transition-all duration-300
        ${isMobileMode ? 'p-0' : 'p-2 md:p-6 lg:p-8'}
      `}>
        
        {/* The "App Window" (Glass Panel) */}
        <div className={`
            flex-1 flex flex-col overflow-hidden relative w-full
            ${isMobileMode 
                ? 'bg-[#f8fafc]' 
                : 'bg-white/40 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-white/50'
            }
        `}>
            
            <TopBar 
                isMuted={isMuted} 
                toggleMute={() => setIsMuted(!isMuted)} 
                isMobileMode={isMobileMode}
                toggleMobileMode={toggleMobileMode}
            />

            {/* Desktop Layout Fix: Ensure flex-row on larger screens */}
            <div className={`flex-1 flex overflow-hidden ${isMobileMode ? 'flex-col' : 'flex-col lg:flex-row'}`}>
                
                {/* Console Sidebar */}
                <Sidebar currentView={currentView} setView={setView} isMobileMode={isMobileMode} />
                
                {/* Main Content Area */}
                <div className={`
                    flex-1 relative overflow-hidden flex flex-col min-w-0
                    ${isMobileMode ? 'pb-0' : 'p-2 md:p-6 pb-16 md:pb-20'}
                `}>
                    <div className={`
                        h-full w-full overflow-hidden flex-1
                        ${isMobileMode ? '' : 'rounded-[1rem] md:rounded-[2rem]'}
                    `}>
                        {/* Wrapper for content scrolling */}
                        <div className={`h-full w-full overflow-y-auto overflow-x-hidden ${isMobileMode ? 'px-4 pb-20' : ''}`}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Console Bottom Bar */}
            {!isMobileMode && <BottomBar />}

            {/* Mobile Nav Bar */}
            {isMobileMode && <MobileNav currentView={currentView} setView={setView} />}

        </div>
      </div>
    </div>
  );
};

export default App;
