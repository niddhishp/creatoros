import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  X, Lightbulb, Film, User, MessageSquare, Layers, 
  Target, Sparkles, Send
} from 'lucide-react';
import type { Float } from '@/types';

const floatTypes: { value: Float['float_type']; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'idea', label: 'Idea', icon: Lightbulb, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  { value: 'scene', label: 'Scene', icon: Film, color: 'text-rose-400 bg-rose-400/10 border-rose-400/30' },
  { value: 'character', label: 'Character', icon: User, color: 'text-violet-400 bg-violet-400/10 border-violet-400/30' },
  { value: 'dialogue', label: 'Dialogue', icon: MessageSquare, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  { value: 'theme', label: 'Theme', icon: Layers, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
  { value: 'contradiction', label: 'Contradiction', icon: Target, color: 'text-pink-400 bg-pink-400/10 border-pink-400/30' },
];

export default function QuickCapture() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState<Float['float_type']>('idea');
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandedContent, setExpandedContent] = useState('');
  
  const setQuickCaptureOpen = useCreatorOSStore((state) => state.setQuickCaptureOpen);
  const addFloat = useCreatorOSStore((state) => state.addFloat);

  const handleClose = () => {
    setQuickCaptureOpen(false);
    setContent('');
    setTitle('');
    setExpandedContent('');
  };

  const handleCapture = () => {
    if (!content.trim()) return;
    
    addFloat({
      content,
      title: title || undefined,
      float_type: selectedType,
    });
    
    handleClose();
  };

  const handleAIExpand = async () => {
    if (!content.trim()) return;
    
    setIsExpanding(true);
    
    // Simulate AI expansion
    setTimeout(() => {
      const expansions: Record<string, string> = {
        idea: `**Expanded Idea:**\n\n${content}\n\n**Emotional Hook:** This concept taps into the universal fear of losing one's identity while gaining extraordinary abilities.\n\n**Visual Promise:** A world where the ordinary becomes extraordinary through the protagonist's unique perspective.\n\n**Possible Genre Directions:** Psychological thriller, magical realism, or character-driven drama.\n\n**Protagonist Seed:** Someone who has defined themselves by their special ability and must now redefine who they are without it.`,
        scene: `**Scene Expansion:**\n\n${content}\n\n**Setting Details:** Consider the visual contrast between the solemn occasion and the unexpected reaction.\n\n**Character Dynamics:** Who is laughing? Why? What does this reveal about relationships?\n\n**Emotional Beats:** Shock → Confusion → Revelation → Acceptance\n\n**Visual Motifs:** Use lighting to shift from dark/solemn to warm/celebratory.`,
        character: `**Character Depth:**\n\n${content}\n\n**The 6 Characteristics:**\n- **Fear:** Being ordinary, losing control\n- **Ambition:** To maintain order in a chaotic world\n- **Talent:** Precision, timing, reading people\n- **Virtue:** Loyalty to his code\n- **Courage:** Faces death without flinching\n- **Worldview:** Life is a series of transactions\n\n**Contradiction:** A killer who believes he's bringing balance to the world.`,
        dialogue: `**Dialogue Enhancement:**\n\n${content}\n\n**Subtext Opportunities:** What isn't being said is often more important than what is.\n\n**Character Voice:** Each character should have distinct speech patterns, vocabulary, and rhythm.\n\n**Cultural Authenticity:** Consider regional expressions and colloquialisms that ground the dialogue.`,
        theme: `**Theme Exploration:**\n\n${content}\n\n**Universal Resonance:** This theme connects to the human experience of...\n\n**Visual Metaphors:** Consider using mirrors, shadows, or water to reinforce this theme visually.\n\n**Character Arc Integration:** How does each character's journey illuminate different facets of this theme?`,
        contradiction: `**Contradiction Analysis:**\n\n${content}\n\n**Surface vs. Depth:** What appears to be X is actually Y.\n\n**Dramatic Tension:** This contradiction creates natural conflict that can drive the narrative.\n\n**Character Application:** Give characters internal contradictions that mirror this thematic tension.`,
      };
      
      const expansionText = expansions[selectedType as keyof typeof expansions] || expansions.idea;
      setExpandedContent(expansionText);
      setIsExpanding(false);
    }, 1500);
  };

  const selectedTypeData = floatTypes.find((t) => t.value === selectedType);
  const SelectedIcon = selectedTypeData?.icon || Lightbulb;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedTypeData?.color.split(' ')[1]}`}>
                <SelectedIcon className={`w-5 h-5 ${selectedTypeData?.color.split(' ')[0]}`} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-100">Quick Capture</h2>
                <p className="text-xs text-slate-500">Capture and expand your creative sparks</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-slate-400">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Type Selector */}
            <div className="flex gap-2 flex-wrap">
              {floatTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? type.color
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Title Input */}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)..."
              className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
            />

            {/* Content Textarea */}
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Capture your ${selectedType}...`}
              className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 min-h-[120px] resize-none"
            />

            {/* AI Expansion */}
            {expandedContent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-400">AI Expansion</span>
                </div>
                <div className="text-sm text-slate-300 whitespace-pre-line">
                  {expandedContent}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={handleAIExpand}
                disabled={!content.trim() || isExpanding}
                className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
              >
                {isExpanding ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Expanding...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Expand
                  </>
                )}
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleClose} className="text-slate-400">
                  Cancel
                </Button>
                <Button
                  onClick={handleCapture}
                  disabled={!content.trim()}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-slate-800/30 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Press <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-400">⌘</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-400">Enter</kbd> to capture
            </p>
            <p className="text-xs text-slate-500">
              Will be saved to Floats Studio
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
