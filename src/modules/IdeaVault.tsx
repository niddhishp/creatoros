import { useState } from 'react';
import { useStore } from '@/store';
import { 
  Lightbulb, 
  Search, 
  Filter, 
  Plus,
  Sparkles,
  Tag,
  ArrowRight,
  MoreHorizontal,
  Trash2,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ideaTypes = [
  { value: 'all', label: 'All Ideas' },
  { value: 'film_idea', label: 'Film Ideas' },
  { value: 'campaign_idea', label: 'Campaign Ideas' },
  { value: 'business_idea', label: 'Business Ideas' },
  { value: 'content_post', label: 'Content Posts' },
  { value: 'general', label: 'General' },
];

const maturityLevels = [
  { value: 'all', label: 'All Maturity' },
  { value: 'raw', label: 'Raw' },
  { value: 'developing', label: 'Developing' },
  { value: 'mature', label: 'Mature' },
];

export function IdeaVault() {
  const { ideas, setQuickCaptureOpen, setCurrentModule } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMaturity, setSelectedMaturity] = useState('all');
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || idea.type === selectedType;
    const matchesMaturity = selectedMaturity === 'all' || idea.maturity === selectedMaturity;
    return matchesSearch && matchesType && matchesMaturity;
  });

  const handleExpandIdea = async (_ideaId: string) => {
    setIsExpanding(true);
    // Simulate AI expansion
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExpanding(false);
  };

  const handleConvertToProject = (_idea: any) => {
    // Would create a project from the idea
    setCurrentModule('film-lab');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Idea Vault</h1>
          <p className="text-[#A0A0B0] mt-1">Capture, develop, and transform your ideas</p>
        </div>
        <button
          onClick={() => setQuickCaptureOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Capture Idea</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Total Ideas" value={ideas.length} />
        <StatBox label="Raw" value={ideas.filter(i => i.maturity === 'raw').length} color="amber" />
        <StatBox label="Developing" value={ideas.filter(i => i.maturity === 'developing').length} color="blue" />
        <StatBox label="Mature" value={ideas.filter(i => i.maturity === 'mature').length} color="green" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606070]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ideas..."
            className="w-full bg-[#12121A] border border-[#2A2A3A] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F0F0F5] placeholder:text-[#606070] focus:outline-none focus:border-indigo-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#606070]" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#12121A] border border-[#2A2A3A] rounded-lg px-3 py-2 text-sm text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
          >
            {ideaTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <select
            value={selectedMaturity}
            onChange={(e) => setSelectedMaturity(e.target.value)}
            className="bg-[#12121A] border border-[#2A2A3A] rounded-lg px-3 py-2 text-sm text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
          >
            {maturityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdeas.map((idea) => (
          <IdeaCard 
            key={idea.id} 
            idea={idea} 
            isSelected={selectedIdea === idea.id}
            onSelect={() => setSelectedIdea(selectedIdea === idea.id ? null : idea.id)}
            onExpand={() => handleExpandIdea(idea.id)}
            onConvert={() => handleConvertToProject(idea)}
            isExpanding={isExpanding}
          />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-12 h-12 text-[#606070] mx-auto mb-4" />
          <p className="text-[#A0A0B0]">No ideas found</p>
          <p className="text-sm text-[#606070] mt-1">Try adjusting your filters or capture a new idea</p>
        </div>
      )}
    </div>
  );
}

function StatBox({ 
  label, 
  value, 
  color = 'indigo' 
}: { 
  label: string; 
  value: number; 
  color?: 'indigo' | 'amber' | 'blue' | 'green';
}) {
  const colors = {
    indigo: 'bg-indigo-500/10 text-indigo-400',
    amber: 'bg-amber-500/10 text-amber-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
  };

  return (
    <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-4">
      <p className="text-sm text-[#606070]">{label}</p>
      <p className={cn('text-2xl font-bold mt-1', colors[color])}>{value}</p>
    </div>
  );
}

function IdeaCard({ 
  idea, 
  isSelected, 
  onSelect, 
  onExpand, 
  onConvert,
  isExpanding 
}: { 
  idea: any;
  isSelected: boolean;
  onSelect: () => void;
  onExpand: () => void;
  onConvert: () => void;
  isExpanding: boolean;
}) {
  const { updateIdea, deleteIdea } = useStore();
  const [showActions, setShowActions] = useState(false);

  const maturityColors = {
    raw: 'text-amber-400 bg-amber-400/10',
    developing: 'text-blue-400 bg-blue-400/10',
    mature: 'text-green-400 bg-green-400/10',
    archived: 'text-[#606070] bg-[#606070]/10',
  };

  const typeLabels: Record<string, string> = {
    film_idea: 'Film Idea',
    campaign_idea: 'Campaign Idea',
    business_idea: 'Business Idea',
    scene_idea: 'Scene Idea',
    startup_idea: 'Startup Idea',
    content_post: 'Content Post',
    dialogue_line: 'Dialogue',
    pitch_thought: 'Pitch Thought',
    character_concept: 'Character',
    visual_concept: 'Visual Concept',
    general: 'General',
  };

  return (
    <div 
      onClick={onSelect}
      className={cn(
        'bg-[#12121A] border rounded-xl p-5 cursor-pointer transition-all',
        isSelected 
          ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
          : 'border-[#2A2A3A] hover:border-[#3A3A4A]'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn('text-xs px-2 py-1 rounded-full', maturityColors[idea.maturity as keyof typeof maturityColors])}>
            {idea.maturity}
          </span>
          <span className="text-xs text-[#606070]">{typeLabels[idea.type] || idea.type}</span>
        </div>
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowActions(!showActions); }}
            className="p-1 text-[#606070] hover:text-[#F0F0F5] rounded"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showActions && (
            <div 
              className="absolute right-0 top-full mt-1 w-40 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg shadow-xl py-1 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { updateIdea(idea.id, { maturity: 'developing' }); setShowActions(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5] hover:bg-[#2A2A3A]"
              >
                <Edit3 className="w-4 h-4" />
                Mark Developing
              </button>
              <button 
                onClick={() => { updateIdea(idea.id, { maturity: 'mature' }); setShowActions(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5] hover:bg-[#2A2A3A]"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Mature
              </button>
              <button 
                onClick={() => { deleteIdea(idea.id); setShowActions(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#2A2A3A]"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-[#F0F0F5] text-sm leading-relaxed line-clamp-4 mb-4">
        {idea.content}
      </p>

      {/* Tags */}
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag: string) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-indigo-400">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {isSelected && (
        <div className="flex gap-2 pt-4 border-t border-[#2A2A3A]">
          <button
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            disabled={isExpanding}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm"
          >
            <Sparkles className={cn('w-4 h-4', isExpanding && 'animate-pulse')} />
            {isExpanding ? 'Expanding...' : 'Expand with AI'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onConvert(); }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            Convert to Project
          </button>
        </div>
      )}
    </div>
  );
}
