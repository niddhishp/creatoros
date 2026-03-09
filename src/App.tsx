import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import QuickCapture from '@/components/modals/QuickCapture';
import CommandPalette from '@/components/modals/CommandPalette';
import { Toaster } from '@/components/ui/sonner';

// Domain modules
import MissionControl         from '@/modules/MissionControl';
import CinemaStudio           from '@/modules/CinemaStudio';
import AdvertisingStudio      from '@/modules/AdvertisingStudio';
import PRStudio               from '@/modules/PRStudio';
import AuthorStudio           from '@/modules/AuthorStudio';
import PersonalBrandingStudio from '@/modules/PersonalBrandingStudio';
import PsychologyStudio       from '@/modules/PsychologyStudio';
import LifeStudio             from '@/modules/LifeStudio';
import BusinessStudio         from '@/modules/BusinessStudio';

function App() {
  const [mounted, setMounted] = useState(false);
  const currentDomain      = useCreatorOSStore((state) => state.currentDomain);
  const quickCaptureOpen   = useCreatorOSStore((state) => state.quickCaptureOpen);
  const commandPaletteOpen = useCreatorOSStore((state) => state.commandPaletteOpen);
  const sidebarCollapsed   = useCreatorOSStore((state) => state.sidebarCollapsed);

  useEffect(() => { setMounted(true); }, []);

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
    switch (currentDomain) {
      case 'cinema':            return <CinemaStudio />;
      case 'advertising':       return <AdvertisingStudio />;
      case 'pr':                return <PRStudio />;
      case 'author':            return <AuthorStudio />;
      case 'personal_branding': return <PersonalBrandingStudio />;
      case 'psychology':        return <PsychologyStudio />;
      case 'life':              return <LifeStudio />;
      case 'business':          return <BusinessStudio />;
      default:                  return <MissionControl />;
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

      {quickCaptureOpen   && <QuickCapture />}
      {commandPaletteOpen && <CommandPalette />}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
