import { useState } from 'react';
import { useStore } from '@/store';
import { 
  Presentation, 
  Plus, 
  FileText,
  Sparkles,
  Download,
  Layout,
  Type
} from 'lucide-react';
import { cn } from '@/lib/utils';

const deckTypes = [
  { value: 'film_pitch', label: 'Film Pitch', icon: Presentation },
  { value: 'investor', label: 'Investor Deck', icon: FileText },
  { value: 'campaign', label: 'Campaign Deck', icon: Presentation },
  { value: 'strategic_proposal', label: 'Strategic Proposal', icon: FileText },
  { value: 'client_presentation', label: 'Client Presentation', icon: Presentation },
  { value: 'personal_brand', label: 'Personal Brand', icon: Presentation },
];

const deckTones = [
  { value: 'premium', label: 'Premium' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'founder', label: 'Founder' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'strategic', label: 'Strategic' },
  { value: 'disruptive', label: 'Disruptive' },
];

export function DeckMachine() {
  const { decks } = useStore();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [showNewDeckModal, setShowNewDeckModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Deck Machine</h1>
          <p className="text-[#A0A0B0] mt-1">Create compelling presentations with AI assistance</p>
        </div>
        <button
          onClick={() => setShowNewDeckModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Deck</span>
        </button>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <DeckCard 
            key={deck.id} 
            deck={deck}
            isSelected={selectedDeck === deck.id}
            onSelect={() => setSelectedDeck(selectedDeck === deck.id ? null : deck.id)}
          />
        ))}
        
        {/* Create New Card */}
        <button
          onClick={() => setShowNewDeckModal(true)}
          className="flex flex-col items-center justify-center gap-4 p-8 bg-[#12121A] border border-dashed border-[#2A2A3A] rounded-xl hover:border-indigo-500/50 hover:bg-[#1A1A25] transition-colors min-h-[200px]"
        >
          <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-sm text-[#A0A0B0]">Create New Deck</span>
        </button>
      </div>

      {/* AI Tools */}
      <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">AI Deck Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AIActionButton 
            icon={Layout}
            label="Structure Generator"
            description="Create slide structure"
          />
          <AIActionButton 
            icon={Type}
            label="Copy Writer"
            description="Write slide content"
          />
          <AIActionButton 
            icon={Sparkles}
            label="Tone Adapter"
            description="Adjust deck tone"
          />
          <AIActionButton 
            icon={Download}
            label="Export"
            description="Export to various formats"
          />
        </div>
      </div>

      {showNewDeckModal && (
        <NewDeckModal onClose={() => setShowNewDeckModal(false)} />
      )}
    </div>
  );
}

function DeckCard({ deck, isSelected, onSelect }: { deck: any; isSelected: boolean; onSelect: () => void }) {
  const typeInfo = deckTypes.find(t => t.value === deck.type) || deckTypes[0];
  const Icon = typeInfo.icon;

  return (
    <div 
      onClick={onSelect}
      className={cn(
        'bg-[#12121A] border rounded-xl p-5 cursor-pointer transition-all',
        isSelected ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-[#2A2A3A] hover:border-[#3A3A4A]'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <span className="text-xs px-2 py-1 bg-[#1A1A25] text-[#606070] rounded">
          v{deck.version}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-[#F0F0F5] mb-1">{deck.name}</h3>
      <p className="text-sm text-[#606070] mb-4">{typeInfo.label}</p>

      {deck.tone && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[#606070]">Tone:</span>
          <span className="text-xs px-2 py-1 bg-[#1A1A25] text-indigo-400 rounded">
            {deck.tone}
          </span>
        </div>
      )}

      {isSelected && (
        <div className="flex gap-2 pt-4 border-t border-[#2A2A3A]">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
            <FileText className="w-4 h-4" />
            Edit
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      )}
    </div>
  );
}

function AIActionButton({ icon: Icon, label, description }: { icon: React.ElementType; label: string; description: string }) {
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

function NewDeckModal({ onClose }: { onClose: () => void }) {
  const { addDeck, addProject } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'film_pitch' as const,
    tone: 'cinematic' as const,
  });

  const handleSubmit = () => {
    const projectId = Math.random().toString(36).substr(2, 9);
    
    addProject({
      id: projectId,
      user_id: '1',
      name: formData.name,
      description: `${formData.type} deck`,
      type: 'other',
      status: 'active',
      metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    addDeck({
      id: Math.random().toString(36).substr(2, 9),
      project_id: projectId,
      user_id: '1',
      name: formData.name,
      type: formData.type,
      tone: formData.tone,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A3A]">
          <h2 className="text-lg font-semibold text-[#F0F0F5]">New Deck</h2>
          <p className="text-sm text-[#606070]">Step {step} of 2</p>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Deck Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
                  placeholder="e.g., The Silent Rhythm - Pitch Deck"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Deck Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {deckTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, type: type.value as any })}
                        className={cn(
                          'flex items-center gap-2 p-3 rounded-lg border transition-colors',
                          formData.type === type.value
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-[#2A2A3A] text-[#A0A0B0] hover:border-[#3A3A4A]'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm text-[#A0A0B0] mb-1">Deck Tone</label>
                <div className="grid grid-cols-3 gap-2">
                  {deckTones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setFormData({ ...formData, tone: tone.value as any })}
                      className={cn(
                        'p-3 rounded-lg border transition-colors text-sm',
                        formData.tone === tone.value
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-[#2A2A3A] text-[#A0A0B0] hover:border-[#3A3A4A]'
                      )}
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#1A1A25] rounded-lg p-4">
                <p className="text-sm text-[#606070]">Preview</p>
                <p className="text-lg font-semibold text-[#F0F0F5] mt-1">{formData.name}</p>
                <p className="text-sm text-[#A0A0B0]">
                  {deckTypes.find(t => t.value === formData.type)?.label} • {formData.tone} tone
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between px-6 py-4 border-t border-[#2A2A3A]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#A0A0B0] hover:text-[#F0F0F5]">Cancel</button>
          <div className="flex gap-2">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-[#1A1A25] text-[#A0A0B0] rounded-lg text-sm">Back</button>
            )}
            {step < 2 ? (
              <button 
                onClick={() => setStep(step + 1)}
                disabled={!formData.name}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-sm"
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                Create Deck
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
