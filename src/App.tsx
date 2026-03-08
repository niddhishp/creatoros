import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import QuickCapture from '@/components/modals/QuickCapture';
import CommandPalette from '@/components/modals/CommandPalette';
import { Toaster } from '@/components/ui/sonner';

// Modules
import MissionControl from '@/modules/MissionControl';
import CinemaStudio from '@/modules/CinemaStudio';
// Domain routing is handled by currentDomain state

// Placeholder modules for other domains
function AdvertisingStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-amber-400">📢</span>
            Advertising Studio
          </h1>
          <p className="text-slate-400">
            Brand strategy, campaign ideation, and treatments
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Brief Studio', 'Planning Studio', 'Strategy Studio', 'Creative Direction', 'Copywriting', 'Art Direction', 'Director Treatment', 'Marketing Producer'].map((studio) => (
          <motion.div
            key={studio}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/30 cursor-pointer"
          >
            <h3 className="font-medium text-slate-200">{studio}</h3>
            <p className="text-sm text-slate-500 mt-2">Click to explore</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PRStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-blue-400">📡</span>
        PR Studio
      </h1>
      <p className="text-slate-400">Narrative and opportunity intelligence</p>
    </div>
  );
}

function AuthorStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-violet-400">📚</span>
        Author Studio
      </h1>
      <p className="text-slate-400">Book creation, doctoring, design, and marketing</p>
    </div>
  );
}

function PersonalBrandingStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-pink-400">👤</span>
        Personal Branding Studio
      </h1>
      <p className="text-slate-400">Content, publishing, and website presence</p>
    </div>
  );
}

function PsychologyStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-cyan-400">🧠</span>
        Psychology Studio
      </h1>
      <p className="text-slate-400">NLP, reflections, and cognitive tools</p>
    </div>
  );
}

function LifeStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-emerald-400">❤️</span>
        Life Studio
      </h1>
      <p className="text-slate-400">Finance, health, priorities, and learning</p>
    </div>
  );
}

function BusinessStudio() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
        <span className="text-teal-400">💼</span>
        Business Studio
      </h1>
      <p className="text-slate-400">Ventures, strategy, business plans, and growth</p>
    </div>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);
  const currentDomain = useCreatorOSStore((state) => state.currentDomain);
  const quickCaptureOpen = useCreatorOSStore((state) => state.quickCaptureOpen);
  const commandPaletteOpen = useCreatorOSStore((state) => state.commandPaletteOpen);
  const sidebarCollapsed = useCreatorOSStore((state) => state.sidebarCollapsed);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading CreatorOS...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!currentDomain) {
      return <MissionControl />;
    }

    switch (currentDomain) {
      case 'cinema':
        return <CinemaStudio />;
      case 'advertising':
        return <AdvertisingStudio />;
      case 'pr':
        return <PRStudio />;
      case 'author':
        return <AuthorStudio />;
      case 'personal_branding':
        return <PersonalBrandingStudio />;
      case 'psychology':
        return <PsychologyStudio />;
      case 'life':
        return <LifeStudio />;
      case 'business':
        return <BusinessStudio />;
      default:
        return <MissionControl />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-[280px]'
        }`}
      >
        <TopBar />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDomain || 'mission-control'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {quickCaptureOpen && <QuickCapture />}
      {commandPaletteOpen && <CommandPalette />}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
