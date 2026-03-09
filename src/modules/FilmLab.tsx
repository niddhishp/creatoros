import { useState } from 'react';
import { useCreatorOSStore } from '@/store';
import type { Project } from '@/types';
import { 
  Film, 
  Plus, 
  Users,
  MapPin,
  FileText,
  Sparkles,
  Upload,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function FilmLab() {
  const { projects } = useCreatorOSStore();
  const films = projects.filter((p: Project) => p.domain_id === '1');
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [showNewFilmModal, setShowNewFilmModal] = useState(false);

  const activeFilms = films.filter(f => f.status !== 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Film Lab</h1>
          <p className="text-[#A0A0B0] mt-1">Develop films from concept to pitch</p>
        </div>
        <button
          onClick={() => setShowNewFilmModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Film Project</span>
        </button>
      </div>

      {/* Studios Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <StudioTab icon={Film} label="Projects" active />
        <StudioTab icon={FileText} label="Screenplay Studio" />
        <StudioTab icon={Sparkles} label="Script Doctor" />
        <StudioTab icon={Users} label="Characters" />
        <StudioTab icon={MapPin} label="World Builder" />
        <StudioTab icon={BarChart3} label="Analysis" />
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeFilms.map((film) => (
            <FilmProjectCard 
              key={film.id} 
              film={film} 
              isSelected={selectedFilm === film.id}
              onSelect={() => setSelectedFilm(selectedFilm === film.id ? null : film.id)}
            />
          ))}
        </div>
      </div>

      {/* AI Actions */}
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">AI Screenplay Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AIActionButton 
            icon={Users}
            label="Character Builder"
            description="Create compelling characters"
          />
          <AIActionButton 
            icon={FileText}
            label="Scene Weaver"
            description="Write individual scenes"
          />
          <AIActionButton 
            icon={Sparkles}
            label="Dialogue Smith"
            description="Enhance dialogue"
          />
          <AIActionButton 
            icon={BarChart3}
            label="Script Doctor"
            description="Analyze and improve"
          />
        </div>
      </div>

      {/* New Film Modal */}
      {showNewFilmModal && (
        <NewFilmModal onClose={() => setShowNewFilmModal(false)} />
      )}
    </div>
  );
}

function StudioTab({ 
  icon: Icon, 
  label, 
  active = false 
}: { 
  icon: React.ElementType; 
  label: string; 
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
        active 
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-[#A0A0B0] hover:bg-[#1A1A25] hover:text-[#F0F0F5]'
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function FilmProjectCard({ 
  film, 
  isSelected, 
  onSelect 
}: { 
  film: Project; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  const statusColors: Record<string, string> = {
    concept: 'text-amber-400 bg-amber-400/10',
    development: 'text-blue-400 bg-blue-400/10',
    rewriting: 'text-purple-400 bg-purple-400/10',
    pitching: 'text-green-400 bg-green-400/10',
    pre_production: 'text-indigo-400 bg-indigo-400/10',
    production: 'text-pink-400 bg-pink-400/10',
    post: 'text-cyan-400 bg-cyan-400/10',
    completed: 'text-green-400 bg-green-400/10',
    idea: 'text-amber-400 bg-amber-400/10',
    active: 'text-blue-400 bg-blue-400/10',
    paused: 'text-[#606070] bg-[#606070]/10',
    stalled: 'text-red-400 bg-red-400/10',
    archived: 'text-[#606070] bg-[#606070]/10',
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
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#F0F0F5]">{film.title}</h3>
          {film.description && (
            <p className="text-sm text-[#606070] line-clamp-1">{film.description}</p>
          )}
        </div>
        <span className={cn('text-xs px-2 py-1 rounded-full', statusColors[film.status] || statusColors.idea)}>
          {film.status.replace('_', ' ')}
        </span>
      </div>

      {/* Stage */}
      {film.stage && (
        <p className="text-sm text-[#A0A0B0] mb-4 line-clamp-2">{film.stage}</p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-4">
        {film.project_type && (
          <span className="text-xs px-2 py-1 bg-[#1A1A25] text-[#A0A0B0] rounded">
            {film.project_type}
          </span>
        )}
      </div>

      {/* Actions */}
      {isSelected && (
        <div className="flex gap-2 pt-4 border-t border-[#2A2A3A]">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
            <FileText className="w-4 h-4" />
            View Screenplay
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
            <Sparkles className="w-4 h-4" />
            Run Analysis
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
            <Upload className="w-4 h-4" />
            Upload Script
          </button>
        </div>
      )}
    </div>
  );
}

function AIActionButton({ 
  icon: Icon, 
  label, 
  description 
}: { 
  icon: React.ElementType; 
  label: string; 
  description: string;
}) {
  return (
    <button className="flex flex-col items-center gap-3 p-4 bg-[#1A1A25] rounded-lg hover:bg-[#2A2A3A] transition-colors text-left">
      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-[#F0F0F5]">{label}</p>
        <p className="text-xs text-[#606070] mt-1">{description}</p>
      </div>
    </button>
  );
}

function NewFilmModal({ onClose }: { onClose: () => void }) {
  const { addProject } = useCreatorOSStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    working_title: '',
    genre: [] as string[],
    format: 'feature' as const,
    logline: '',
    premise: '',
  });

  const handleSubmit = () => {
    addProject({
      domain_id: '1',
      title: formData.title,
      description: formData.logline || formData.premise,
      project_type: 'film',
      status: 'active',
      priority: 'medium',
      visibility: 'private',
      last_activity_at: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">New Film Project</h2>
          <p className="text-sm text-[#606070]">Step {step} of 2</p>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
                  placeholder="Film title"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Working Title (optional)</label>
                <input
                  type="text"
                  value={formData.working_title}
                  onChange={(e) => setFormData({ ...formData, working_title: e.target.value })}
                  className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
                  placeholder="Internal working title"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Format</label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                  className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
                >
                  <option value="feature">Feature Film</option>
                  <option value="short">Short Film</option>
                  <option value="series">Series</option>
                  <option value="ad_film">Ad Film</option>
                  <option value="documentary">Documentary</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Logline *</label>
                <textarea
                  value={formData.logline}
                  onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
                  className="w-full h-20 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="One-sentence summary of your film"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Premise</label>
                <textarea
                  value={formData.premise}
                  onChange={(e) => setFormData({ ...formData, premise: e.target.value })}
                  className="w-full h-24 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Expanded summary of the story"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between px-6 py-4 border-t border-[#2A2A3A]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5] transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm"
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!formData.title}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg transition-colors text-sm"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.logline}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg transition-colors text-sm"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
