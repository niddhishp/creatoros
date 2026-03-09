import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BookOpen, Eye, Target, Puzzle, Star, Sparkles, ArrowRight } from 'lucide-react';

const studioConfig = [
  { slug: 'manifesto',    icon: Star,       label: 'Creative Manifesto Studio', desc: 'Define and articulate your creative philosophy and beliefs' },
  { slug: 'nlp_modelling',icon: Brain,      label: 'NLP Modelling Studio',      desc: 'Extract thinking patterns from Fincher, Nolan, Jobs, and others' },
  { slug: 'nlp_lens',     icon: Eye,        label: 'NLP Lens Engine',           desc: 'Apply psychological filters to scripts, strategies, and copy' },
  { slug: 'reflection',   icon: BookOpen,   label: 'Reflection Studio',         desc: 'Structured journaling, insight capture, and self-analysis' },
  { slug: 'pattern_breaker', icon: Puzzle,  label: 'Pattern Breaker Studio',    desc: 'Identify and break limiting thinking habits and assumptions' },
  { slug: 'manifestation', icon: Target,    label: 'Manifestation Studio',      desc: 'Align beliefs and behaviour with long-term creative goals' },
];

const recentReflections = [
  { title: 'On creative resistance', date: '2 days ago', mood: 'Curious' },
  { title: 'Why I keep returning to identity as a theme', date: '5 days ago', mood: 'Reflective' },
  { title: 'The Fincher model: precision as emotion', date: '8 days ago', mood: 'Energised' },
];

export default function PsychologyStudio() {
  const [tab, setTab] = useState('studios');

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-cyan-400" />
            </span>
            Psychology Studio
          </h1>
          <p className="text-slate-400 mt-1">NLP, cognitive tools, reflections, and mental modelling</p>
        </div>
        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">Cognitive OS</Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios"     className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Studios</TabsTrigger>
          <TabsTrigger value="reflections" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Reflections</TabsTrigger>
          <TabsTrigger value="agents"      className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => (
              <motion.div key={s.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/30 cursor-pointer transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                        <s.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200 text-sm">{s.label}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reflections" className="mt-6">
          <div className="space-y-3">
            {recentReflections.map((r, i) => (
              <Card key={i} className="bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/30 cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{r.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{r.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">{r.mood}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['NLP Modelling Agent', 'Meta Model Analyst', 'Belief System Mapper', 'Creative Block Analyzer', 'Cognitive Bias Detector', 'Emotional Theme Extractor'].map((name) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
