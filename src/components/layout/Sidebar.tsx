import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Film, Megaphone, Radio, BookOpen, UserCircle, Brain, Heart, Briefcase,
  ChevronRight, ChevronDown, LayoutDashboard, Sparkles, Settings,
  Plus
} from 'lucide-react';
import type { Domain, Studio, DomainSlug } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  film: Film,
  megaphone: Megaphone,
  radio: Radio,
  'book-open': BookOpen,
  'user-circle': UserCircle,
  brain: Brain,
  heart: Heart,
  briefcase: Briefcase,
};

interface DomainNavItemProps {
  domain: Domain;
  studios: Studio[];
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectDomain: () => void;
  onSelectStudio: (studioId: string) => void;
  currentStudio: string | null;
}

function DomainNavItem({ 
  domain, 
  studios, 
  isActive, 
  isExpanded, 
  onToggle, 
  onSelectDomain,
  onSelectStudio,
  currentStudio 
}: DomainNavItemProps) {
  const Icon = iconMap[domain.icon || 'briefcase'] || Briefcase;
  
  const getDomainColor = (slug: DomainSlug) => {
    switch (slug) {
      case 'cinema': return 'text-rose-400 hover:bg-rose-500/10';
      case 'advertising': return 'text-amber-400 hover:bg-amber-500/10';
      case 'pr': return 'text-blue-400 hover:bg-blue-500/10';
      case 'author': return 'text-violet-400 hover:bg-violet-500/10';
      case 'personal_branding': return 'text-pink-400 hover:bg-pink-500/10';
      case 'psychology': return 'text-cyan-400 hover:bg-cyan-500/10';
      case 'life': return 'text-emerald-400 hover:bg-emerald-500/10';
      case 'business': return 'text-teal-400 hover:bg-teal-500/10';
      default: return 'text-slate-400 hover:bg-slate-500/10';
    }
  };

  const getActiveDomainColor = (slug: DomainSlug) => {
    switch (slug) {
      case 'cinema': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'advertising': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'pr': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'author': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'personal_branding': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'psychology': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'life': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'business': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="mb-1">
      <button
        onClick={() => {
          onSelectDomain();
          onToggle();
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          isActive 
            ? getActiveDomainColor(domain.slug) 
            : `text-slate-400 ${getDomainColor(domain.slug)}`
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="flex-1 text-left">{domain.name}</span>
        {studios.length > 0 && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </button>
      
      <AnimatePresence>
        {isExpanded && studios.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-700/50 pl-2">
              {studios.map((studio) => (
                <button
                  key={studio.id}
                  onClick={() => onSelectStudio(studio.id)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                    currentStudio === studio.id
                      ? 'bg-slate-700/50 text-slate-200'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="flex-1 text-left">{studio.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  const [expandedDomains, setExpandedDomains] = useState<string[]>(['cinema']);
  
  const domains = useCreatorOSStore((state) => state.domains);
  const studios = useCreatorOSStore((state) => state.studios);
  const currentDomain = useCreatorOSStore((state) => state.currentDomain);
  const currentStudio = useCreatorOSStore((state) => state.currentStudio);
  const sidebarCollapsed = useCreatorOSStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useCreatorOSStore((state) => state.toggleSidebar);
  const setCurrentDomain = useCreatorOSStore((state) => state.setCurrentDomain);
  const setCurrentStudio = useCreatorOSStore((state) => state.setCurrentStudio);
  const setQuickCaptureOpen = useCreatorOSStore((state) => state.setQuickCaptureOpen);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleSelectDomain = (domainSlug: DomainSlug) => {
    setCurrentDomain(domainSlug);
    setCurrentStudio(null);
  };

  const handleSelectStudio = (studioId: string) => {
    setCurrentStudio(studioId);
  };

  const getStudiosForDomain = (domainId: string) => {
    return studios
      .filter((s) => s.domain_id === domainId)
      .sort((a, b) => a.sort_order - b.sort_order);
  };

  if (sidebarCollapsed) {
    return (
      <motion.div
        initial={{ width: 64 }}
        animate={{ width: 64 }}
        className="h-full bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mb-4 text-slate-400 hover:text-slate-200"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSelectDomain(null as any)}
            className={`${!currentDomain ? 'text-slate-200 bg-slate-800' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
          </Button>
          
          {domains.map((domain) => {
            const Icon = iconMap[domain.icon || 'briefcase'] || Briefcase;
            return (
              <Button
                key={domain.id}
                variant="ghost"
                size="icon"
                onClick={() => handleSelectDomain(domain.slug)}
                className={`${currentDomain === domain.slug ? 'text-slate-200 bg-slate-800' : 'text-slate-400'}`}
              >
                <Icon className="w-5 h-5" />
              </Button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: 280 }}
      className="h-full bg-slate-900 border-r border-slate-800 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-100">CreatorOS</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-slate-400 hover:text-slate-200"
          >
            <ChevronDown className="w-5 h-5 rotate-90" />
          </Button>
        </div>
      </div>

      {/* Quick Capture Button */}
      <div className="p-3">
        <Button
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white"
          onClick={() => setQuickCaptureOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Quick Capture
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {/* Mission Control */}
          <button
            onClick={() => handleSelectDomain(null as any)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              !currentDomain
                ? 'bg-slate-800 text-slate-200'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Mission Control</span>
          </button>

          {/* Separator */}
          <div className="my-3 border-t border-slate-800" />

          {/* Domains */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Studios
            </p>
            {domains
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((domain) => (
                <DomainNavItem
                  key={domain.id}
                  domain={domain}
                  studios={getStudiosForDomain(domain.id)}
                  isActive={currentDomain === domain.slug}
                  isExpanded={expandedDomains.includes(domain.id)}
                  onToggle={() => toggleDomain(domain.id)}
                  onSelectDomain={() => handleSelectDomain(domain.slug)}
                  onSelectStudio={handleSelectStudio}
                  currentStudio={currentStudio}
                />
              ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </motion.div>
  );
}
