import React, { useState } from 'react';
import { APPS_LIBRARY } from '../data';
import { Card } from '../components/ui/Card';
import { Plus, Search, ExternalLink, Smartphone, Download, Check } from 'lucide-react';
import { AppItem } from '../types';

// Component to handle auto-fetching icons with fallback
const AppIcon: React.FC<{ app: AppItem; className?: string }> = ({ app, className }) => {
  const [error, setError] = useState(false);
  
  // Use unavatar.io to try and find an icon based on app name or domain approximation
  // We use the app name for search, which is surprisingly effective for popular apps
  const iconUrl = `https://unavatar.io/${encodeURIComponent(app.name.toLowerCase())}?fallback=false`;

  if (error || !app.name) {
    return (
      <div className={`w-full h-full flex items-center justify-center text-white font-black text-3xl select-none ${className}`} style={{ backgroundColor: app.color }}>
          {app.name.substring(0, 1)}
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-white relative ${className}`}>
        <img 
            src={iconUrl} 
            alt={app.name} 
            className="w-full h-full object-cover" 
            onError={() => setError(true)}
        />
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
    </div>
  );
};

export const AppsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // In a real app, this would persist to local storage
  const [installedApps, setInstalledApps] = useState(APPS_LIBRARY.filter(app => app.isInstalled));
  const [showLibrary, setShowLibrary] = useState(false);

  const handleLaunch = (url: string) => {
    // Method 1: Create a temporary anchor tag (Better for Deep Links)
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank"; // Try opening in new tab/window to avoid blocking
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Method 2: Fallback (sometimes works better for specific custom schemes)
    setTimeout(() => {
         window.location.href = url;
    }, 100);
  };

  const toggleInstall = (appId: string) => {
    const isAlreadyInstalled = installedApps.find(a => a.id === appId);
    
    if (isAlreadyInstalled) {
      setInstalledApps(prev => prev.filter(a => a.id !== appId));
    } else {
      const app = APPS_LIBRARY.find(a => a.id === appId);
      if (app) setInstalledApps(prev => [...prev, app]);
    }
  };

  const filteredLibrary = APPS_LIBRARY.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col animate-in slide-in-from-right-4 duration-500 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-sm">
                <Smartphone size={20} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Apps</h2>
        </div>
        
        <button 
            onClick={() => setShowLibrary(!showLibrary)}
            className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-gray-50 flex items-center gap-2 text-cyan-600 transition-colors"
        >
            {showLibrary ? 'My Apps' : 'App Store'}
            {!showLibrary && <Plus size={16} />}
        </button>
      </div>

      {showLibrary ? (
        /* --- APP STORE / LIBRARY MODE --- */
        <div className="flex flex-col h-full overflow-hidden">
            <div className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-2xl flex items-center gap-2 mb-6 shadow-inner border border-white/40">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search supported apps..." 
                    className="bg-transparent border-none outline-none text-sm font-bold text-gray-600 w-full placeholder-gray-400" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 overflow-y-auto pr-2">
                {filteredLibrary.map((app) => {
                    const isInstalled = installedApps.some(a => a.id === app.id);
                    return (
                        <Card key={app.id} className="p-3 flex items-center gap-4 hover:bg-white/90">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                <AppIcon app={app} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-800 truncate">{app.name}</h4>
                                <span className="text-[10px] text-gray-400 break-all line-clamp-1">{app.id}</span>
                            </div>
                            <button 
                                onClick={() => toggleInstall(app.id)}
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md
                                    ${isInstalled ? 'bg-gray-200 text-gray-500' : 'bg-cyan-500 text-white hover:bg-cyan-400'}
                                `}
                            >
                                {isInstalled ? <Check size={18} /> : <Download size={18} />}
                            </button>
                        </Card>
                    );
                })}
            </div>
        </div>
      ) : (
        /* --- INSTALLED APPS GRID --- */
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 pb-24 overflow-y-auto pr-2 content-start">
             {/* Add Button Tile */}
             <Card 
                className="aspect-square flex flex-col items-center justify-center text-gray-400 bg-white/40 border-dashed border-2 border-gray-300 hover:border-cyan-400 hover:text-cyan-500 transition-colors group"
                onClick={() => setShowLibrary(true)}
            >
                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-2 group-hover:bg-cyan-100 transition-colors">
                    <Plus className="w-6 h-6" />
                </div>
                <span className="font-bold text-xs">Add App</span>
            </Card>

            {installedApps.map((app) => (
                <div key={app.id} className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => handleLaunch(app.scheme)}>
                    <Card className="w-full aspect-square relative p-0 overflow-visible bg-transparent shadow-none hover:scale-105 transition-transform border-none">
                        <div className="w-full h-full rounded-[1.5rem] shadow-lg relative overflow-hidden group-hover:shadow-2xl transition-shadow bg-white">
                            <AppIcon app={app} />
                            
                            {/* Hover Launch Icon */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                <ExternalLink className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                        </div>
                    </Card>
                    <span className="text-xs md:text-sm font-bold text-gray-700 text-center leading-tight group-hover:text-cyan-600 transition-colors drop-shadow-sm line-clamp-1 w-full truncate px-1">
                        {app.name}
                    </span>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};