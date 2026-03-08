import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Image as ImageIcon,
  Wand2,
  Copy,
  Folder,
  Star,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const promptCategories = [
  { value: 'all', label: 'All Prompts' },
  { value: 'image', label: 'Image Generation' },
  { value: 'video', label: 'Video Generation' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'character', label: 'Character' },
  { value: 'scene', label: 'Scene' },
];

const samplePrompts = [
  {
    id: '1',
    name: 'Cinematic Portrait - Indian Musician',
    category: 'cinematic',
    tags: ['portrait', 'indian', 'music', 'cinematic'],
    template: 'Cinematic portrait of [subject], [setting], [lighting] lighting, [mood] mood, shot on [camera], [lens] lens, [style] style, [color] color grading',
    variables: ['subject', 'setting', 'lighting', 'mood', 'camera', 'lens', 'style', 'color'],
    is_favorite: true,
    usage_count: 12,
  },
  {
    id: '2',
    name: 'Film Scene - Dramatic Moment',
    category: 'scene',
    tags: ['film', 'drama', 'scene'],
    template: 'Cinematic film still of [scene_description], [emotion] emotion, [lighting] lighting, [composition] composition, shot on [camera], directed by [director]',
    variables: ['scene_description', 'emotion', 'lighting', 'composition', 'camera', 'director'],
    is_favorite: false,
    usage_count: 8,
  },
  {
    id: '3',
    name: 'Character Visualization',
    category: 'character',
    tags: ['character', 'visualization', 'concept'],
    template: 'Character concept art of [description], [age] years old, [style] style, [attire] attire, [expression] expression, detailed, professional lighting',
    variables: ['description', 'age', 'style', 'attire', 'expression'],
    is_favorite: true,
    usage_count: 15,
  },
];

export function AIContentStudio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [showNewPromptModal, setShowNewPromptModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompts' | 'workspace' | 'showcase'>('prompts');

  const filteredPrompts = samplePrompts.filter(prompt => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">AI Content Studio</h1>
          <p className="text-[#A0A0B0] mt-1">Generate and manage AI-powered creative content</p>
        </div>
        <button
          onClick={() => setShowNewPromptModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Prompt</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2A2A3A]">
        <TabButton 
          label="Prompt Library" 
          active={activeTab === 'prompts'} 
          onClick={() => setActiveTab('prompts')} 
        />
        <TabButton 
          label="Workspace" 
          active={activeTab === 'workspace'} 
          onClick={() => setActiveTab('workspace')} 
        />
        <TabButton 
          label="Showcase" 
          active={activeTab === 'showcase'} 
          onClick={() => setActiveTab('showcase')} 
        />
      </div>

      {activeTab === 'prompts' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606070]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full bg-[#12121A] border border-[#2A2A3A] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F0F0F5] placeholder:text-[#606070] focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="flex gap-2">
              {promptCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    selectedCategory === cat.value
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-[#606070] hover:bg-[#1A1A25]'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt}
                isSelected={selectedPrompt === prompt.id}
                onSelect={() => setSelectedPrompt(selectedPrompt === prompt.id ? null : prompt.id)}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === 'workspace' && (
        <PromptWorkspace />
      )}

      {activeTab === 'showcase' && (
        <ShowcaseView />
      )}

      {showNewPromptModal && (
        <NewPromptModal onClose={() => setShowNewPromptModal(false)} />
      )}
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors border-b-2',
        active 
          ? 'text-indigo-400 border-indigo-400' 
          : 'text-[#606070] border-transparent hover:text-[#A0A0B0]'
      )}
    >
      {label}
    </button>
  );
}

function PromptCard({ prompt, isSelected, onSelect }: { prompt: any; isSelected: boolean; onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        'bg-[#12121A] border rounded-xl p-5 cursor-pointer transition-all',
        isSelected ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-[#2A2A3A] hover:border-[#3A3A4A]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#F0F0F5]">{prompt.name}</h3>
        {prompt.is_favorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
      </div>

      <p className="text-xs text-[#606070] mb-3 line-clamp-2">{prompt.template}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {prompt.tags.map((tag: string) => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-[#1A1A25] text-[#606070] rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-[#606070]">
        <span>Used {prompt.usage_count} times</span>
        <span className="capitalize">{prompt.category}</span>
      </div>

      {isSelected && (
        <div className="flex gap-2 pt-4 mt-4 border-t border-[#2A2A3A]">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
            <Wand2 className="w-4 h-4" />
            Use Prompt
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function PromptWorkspace() {
  const [variables, setVariables] = useState<Record<string, string>>({
    subject: 'tabla player',
    setting: 'concert hall',
    lighting: 'dramatic',
    mood: 'intense',
    camera: 'ARRI Alexa',
    lens: '85mm',
    style: 'cinematic',
    color: 'warm',
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generatePrompt = () => {
    let prompt = 'Cinematic portrait of [subject], [setting], [lighting] lighting, [mood] mood, shot on [camera], [lens] lens, [style] style, [color] color grading';
    
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(`[${key}]`, value);
    });
    
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#F0F0F5] mb-4">Prompt Builder</h3>
        <div className="space-y-4">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm text-[#A0A0B0] mb-1 capitalize">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setVariables({ ...variables, [key]: e.target.value })}
                className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-sm text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
          <button
            onClick={generatePrompt}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            Generate Prompt
          </button>
        </div>
      </div>

      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#F0F0F5] mb-4">Generated Prompt</h3>
        {generatedPrompt ? (
          <div className="space-y-4">
            <div className="bg-[#1A1A25] rounded-lg p-4">
              <p className="text-sm text-[#A0A0B0]">{generatedPrompt}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
                <ExternalLink className="w-4 h-4" />
                Open in Midjourney
              </button>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-[#606070]">
            <Wand2 className="w-12 h-12 mb-4" />
            <p>Fill in the variables and generate your prompt</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ShowcaseView() {
  return (
    <div className="space-y-6">
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Folder className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-[#F0F0F5] mb-2">Your Showcase</h3>
        <p className="text-[#606070] max-w-md mx-auto mb-6">
          Save and organize your best AI-generated content here. Create case studies and share your creative process.
        </p>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
          Create Showcase
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-[#1A1A25] rounded-xl flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-[#606070]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NewPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">New Prompt</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Prompt Name</label>
            <input
              type="text"
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Cinematic Portrait"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Category</label>
            <select className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500">
              <option value="image">Image Generation</option>
              <option value="video">Video Generation</option>
              <option value="cinematic">Cinematic</option>
              <option value="character">Character</option>
              <option value="scene">Scene</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Template</label>
            <textarea
              className="w-full h-32 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Enter your prompt template with [variables]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0B0] mb-1">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              placeholder="portrait, cinematic, lighting"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#2A2A3A]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5]">Cancel</button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
            Save Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
