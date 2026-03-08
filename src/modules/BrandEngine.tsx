import { useState } from 'react';
import { 
  Linkedin,
  Twitter,
  Youtube,
  FileText,
  Sparkles,
  Calendar,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const contentTypes = [
  { value: 'linkedin', label: 'LinkedIn Post', icon: Linkedin },
  { value: 'thread', label: 'Twitter Thread', icon: Twitter },
  { value: 'youtube', label: 'YouTube Script', icon: Youtube },
  { value: 'blog', label: 'Blog Post', icon: FileText },
];

const voicePresets = [
  { value: 'founder-strategist', label: 'Founder-Strategist', description: 'Insightful, experience-backed' },
  { value: 'filmmaker-creator', label: 'Filmmaker-Creator', description: 'Visual, process-oriented' },
  { value: 'ai-builder', label: 'AI-Builder', description: 'Technical but accessible' },
  { value: 'mentor-coach', label: 'Mentor-Coach', description: 'Supportive, educational' },
];

export function BrandEngine() {
  const [selectedType, setSelectedType] = useState('linkedin');
  const [selectedVoice, setSelectedVoice] = useState('founder-strategist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content: Record<string, string> = {
      linkedin: `I've learned something counterintuitive about creativity after 15 years in the industry.

Everyone talks about "thinking outside the box."

But the best work I've created came from constraints.

Limited budget → Forces creative solutions
Tight deadline → Cuts the fluff
Small team → Everyone contributes

Constraints don't limit creativity. They unlock it.

The box isn't the enemy. It's the canvas.

What's a constraint that led to your best work?`,
      thread: `1/ The biggest myth about creativity?\n\nThat you need freedom.\n\nThe truth: constraints unlock creativity.\n\nHere's why ↓`,
      youtube: `Today I want to talk about something that completely changed how I approach creative work.\n\n[B-roll: montage of creative work]\n\nFor years, I believed that to do my best work, I needed complete freedom. Unlimited time, unlimited budget, unlimited options.\n\n[Cut to talking head]\n\nI was wrong.`,
      blog: `# The Paradox of Creative Constraints\n\nWe've been sold a lie about creativity.\n\nThe myth goes like this: to create something truly original, you need freedom. Freedom from constraints, freedom from limitations, freedom from the box.\n\nBut after fifteen years working across film, advertising, and technology, I've discovered the opposite is true.`,
    };
    
    setGeneratedContent(content[selectedType] || content.linkedin);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F0F0F5]">Brand Engine</h1>
          <p className="text-[#A0A0B0] mt-1">Create and manage your personal brand content</p>
        </div>
      </div>

      {/* Content Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#F0F0F5] mb-4">Content Generator</h2>
            
            {/* Content Type */}
            <div className="mb-4">
              <label className="block text-sm text-[#A0A0B0] mb-2">Content Type</label>
              <div className="flex gap-2 flex-wrap">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => { setSelectedType(type.value); setGeneratedContent(''); }}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                        selectedType === type.value
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

            {/* Voice Preset */}
            <div className="mb-4">
              <label className="block text-sm text-[#A0A0B0] mb-2">Voice Preset</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] focus:outline-none focus:border-indigo-500"
              >
                {voicePresets.map((voice) => (
                  <option key={voice.value} value={voice.value}>
                    {voice.label} - {voice.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div className="mb-4">
              <label className="block text-sm text-[#A0A0B0] mb-2">Topic or Idea</label>
              <textarea
                className="w-full h-24 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-4 py-2 text-[#F0F0F5] placeholder:text-[#606070] focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Enter your topic, insight, or rough idea..."
                defaultValue="The paradox of creative constraints - how limitations actually unlock creativity"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <Sparkles className={cn('w-4 h-4', isGenerating && 'animate-pulse')} />
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#F0F0F5]">Generated Content</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A25] text-[#A0A0B0] rounded-lg hover:bg-[#2A2A3A] transition-colors text-sm">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Save to Queue
                  </button>
                </div>
              </div>
              <div className="bg-[#1A1A25] rounded-lg p-4">
                <pre className="text-sm text-[#A0A0B0] whitespace-pre-wrap font-sans">
                  {generatedContent}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Content Queue */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#F0F0F5] mb-4">Content Queue</h3>
            <div className="space-y-3">
              <QueueItem 
                type="linkedin"
                title="Creative constraints post"
                status="ready"
              />
              <QueueItem 
                type="thread"
                title="AI in filmmaking thread"
                status="draft"
              />
              <QueueItem 
                type="youtube"
                title="My creative process"
                status="scheduled"
                date="Tomorrow, 9:00 AM"
              />
            </div>
          </div>

          {/* Content Pillars */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#F0F0F5] mb-4">Content Pillars</h3>
            <div className="space-y-2">
              <PillarItem name="Filmmaking Insights" count={12} />
              <PillarItem name="AI & Creativity" count={8} />
              <PillarItem name="Entrepreneurship" count={6} />
              <PillarItem name="Personal Stories" count={4} />
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-[#12121A] border border-[#2A2A3A] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#F0F0F5]">Upcoming</h3>
              <Calendar className="w-4 h-4 text-[#606070]" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-400">15</span>
                </div>
                <div>
                  <p className="text-sm text-[#F0F0F5]">LinkedIn Post</p>
                  <p className="text-xs text-[#606070]">Creative constraints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueItem({ type, title, status, date }: { type: string; title: string; status: string; date?: string }) {
  const icons: Record<string, React.ElementType> = {
    linkedin: Linkedin,
    thread: Twitter,
    youtube: Youtube,
    blog: FileText,
  };
  
  const Icon = icons[type] || FileText;
  
  const statusColors: Record<string, string> = {
    ready: 'text-green-400',
    draft: 'text-amber-400',
    scheduled: 'text-blue-400',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#1A1A25] rounded-lg">
      <div className="w-8 h-8 bg-[#12121A] rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#606070]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#F0F0F5] truncate">{title}</p>
        <div className="flex items-center gap-2">
          <span className={cn('text-xs', statusColors[status])}>{status}</span>
          {date && <span className="text-xs text-[#606070]">• {date}</span>}
        </div>
      </div>
    </div>
  );
}

function PillarItem({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#1A1A25] rounded-lg transition-colors">
      <span className="text-sm text-[#A0A0B0]">{name}</span>
      <span className="text-xs text-[#606070]">{count} posts</span>
    </div>
  );
}
