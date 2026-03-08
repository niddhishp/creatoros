import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Input } from '@/components/ui/input';
import { 
  Search, Film, Megaphone, BookOpen, Briefcase, UserCircle, 
  Brain, Heart, Radio, LayoutDashboard, ChevronRight, FileText,
  Lightbulb
} from 'lucide-react';
import type { DomainSlug } from '@/types';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const setCommandPaletteOpen = useCreatorOSStore((state) => state.setCommandPaletteOpen);
  const setCurrentDomain = useCreatorOSStore((state) => state.setCurrentDomain);
  const setCurrentStudio = useCreatorOSStore((state) => state.setCurrentStudio);
  const setQuickCaptureOpen = useCreatorOSStore((state) => state.setQuickCaptureOpen);
  const projects = useCreatorOSStore((state) => state.projects);
  const domains = useCreatorOSStore((state) => state.domains);

  const navigateTo = (domain: DomainSlug | null, studio?: string) => {
    setCurrentDomain(domain);
    if (studio) setCurrentStudio(studio);
    setCommandPaletteOpen(false);
  };

  // Build command list
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Mission Control',
      subtitle: 'Go to dashboard',
      icon: LayoutDashboard,
      action: () => navigateTo(null),
    },
    {
      id: 'nav-cinema',
      title: 'Cinema Studio',
      subtitle: 'Film development',
      icon: Film,
      action: () => navigateTo('cinema'),
    },
    {
      id: 'nav-cinema-floats',
      title: 'Floats Studio',
      subtitle: 'Cinema → Capture ideas',
      icon: Lightbulb,
      action: () => navigateTo('cinema', 'floats'),
    },
    {
      id: 'nav-cinema-screenplay',
      title: 'Screenplay Studio',
      subtitle: 'Cinema → Write screenplays',
      icon: FileText,
      action: () => navigateTo('cinema', 'screenplay'),
    },
    {
      id: 'nav-advertising',
      title: 'Advertising Studio',
      subtitle: 'Brand strategy & campaigns',
      icon: Megaphone,
      action: () => navigateTo('advertising'),
    },
    {
      id: 'nav-author',
      title: 'Author Studio',
      subtitle: 'Book creation',
      icon: BookOpen,
      action: () => navigateTo('author'),
    },
    {
      id: 'nav-business',
      title: 'Business Studio',
      subtitle: 'Ventures & strategy',
      icon: Briefcase,
      action: () => navigateTo('business'),
    },
    {
      id: 'nav-pr',
      title: 'PR Studio',
      subtitle: 'Narrative intelligence',
      icon: Radio,
      action: () => navigateTo('pr'),
    },
    {
      id: 'nav-branding',
      title: 'Personal Branding Studio',
      subtitle: 'Content & presence',
      icon: UserCircle,
      action: () => navigateTo('personal_branding'),
    },
    {
      id: 'nav-psychology',
      title: 'Psychology Studio',
      subtitle: 'Reflections & NLP',
      icon: Brain,
      action: () => navigateTo('psychology'),
    },
    {
      id: 'nav-life',
      title: 'Life Studio',
      subtitle: 'Finance & health',
      icon: Heart,
      action: () => navigateTo('life'),
    },
    // Actions
    {
      id: 'action-capture',
      title: 'Quick Capture',
      subtitle: 'Capture a new idea',
      icon: Lightbulb,
      shortcut: '⌘⇧C',
      action: () => {
        setCommandPaletteOpen(false);
        setQuickCaptureOpen(true);
      },
    },
    // Projects
    ...projects.slice(0, 5).map((project) => {
      const domain = domains.find((d) => d.id === project.domain_id);
      return {
        id: `project-${project.id}`,
        title: project.title,
        subtitle: `${domain?.name || 'Project'} → ${project.stage?.replace(/_/g, ' ')}`,
        icon: FileText,
        action: () => {
          if (domain) navigateTo(domain.slug as DomainSlug);
        },
      };
    }),
  ];

  // Filter commands based on query
  const filteredCommands = query
    ? commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(query.toLowerCase()) ||
          cmd.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        onClick={() => setCommandPaletteOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-800">
            <Search className="w-5 h-5 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, studios, actions..."
              className="flex-1 bg-transparent border-0 text-slate-200 placeholder:text-slate-500 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs bg-slate-800 rounded text-slate-400">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-auto py-2">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500">No results found</p>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                {filteredCommands.map((command, index) => {
                  const Icon = command.icon;
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <button
                      key={command.id}
                      onClick={command.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        isSelected
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium">{command.title}</p>
                        {command.subtitle && (
                          <p className={`text-sm ${isSelected ? 'text-indigo-400/70' : 'text-slate-500'}`}>
                            {command.subtitle}
                          </p>
                        )}
                      </div>
                      {command.shortcut && (
                        <kbd className="px-2 py-0.5 text-xs bg-slate-800 rounded text-slate-400">
                          {command.shortcut}
                        </kbd>
                      )}
                      {isSelected && <ChevronRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-slate-800/30 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-700 rounded">↑↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-700 rounded">↵</kbd>
                to select
              </span>
            </div>
            <span>{filteredCommands.length} results</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
