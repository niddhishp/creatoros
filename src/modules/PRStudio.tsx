import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, TrendingUp, Lightbulb, Mic, Newspaper, Plus, Sparkles, ArrowRight } from 'lucide-react';

const studioConfig = [
  { slug: 'trend_radar',       icon: TrendingUp, label: 'Trend Radar',               desc: 'Surface cultural trends relevant to your work and positioning' },
  { slug: 'narrative_lab',     icon: Lightbulb,  label: 'Narrative Lab',             desc: 'Translate trends into strategic narratives you can own' },
  { slug: 'pr_opportunity',    icon: Newspaper,  label: 'PR Opportunity Engine',     desc: 'Generate press angles, story hooks, and media pitches' },
  { slug: 'thought_leadership',icon: Mic,        label: 'Thought Leadership Studio', desc: 'LinkedIn articles, opinion columns, and conference talks' },
  { slug: 'media_interaction', icon: Radio,      label: 'Media Interaction Studio',  desc: 'Interview prep, key messages, and panel positioning' },
];

export default function PRStudio() {
  const [tab, setTab] = useState('studios');
  const projects = useCreatorOSStore((s) => s.projects.filter((p) => p.domain_id === '3'));

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-blue-400" />
            </span>
            PR Studio
          </h1>
          <p className="text-slate-400 mt-1">Narrative intelligence, trend analysis, and PR opportunity engine</p>
        </div>
        <Badge variant="outline" className="border-blue-500/30 text-blue-400">Narrative OS</Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Studios</TabsTrigger>
          <TabsTrigger value="opportunities" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">PR Projects</TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => (
              <motion.div key={s.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-slate-800/40 border-slate-700/50 hover:border-blue-500/30 cursor-pointer transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <s.icon className="w-5 h-5 text-blue-400" />
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

        <TabsContent value="opportunities" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
              <Button size="sm" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/20">
                <Plus className="w-4 h-4 mr-1.5" /> New PR Project
              </Button>
            </div>
            {projects.length === 0 ? (
              <Card className="bg-slate-800/20 border-slate-700/30 border-dashed">
                <CardContent className="p-8 text-center">
                  <Radio className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No PR projects yet</p>
                  <p className="text-slate-600 text-xs mt-1">Start by analysing a trend</p>
                </CardContent>
              </Card>
            ) : projects.map((p) => (
              <Card key={p.id} className="bg-slate-800/40 border-slate-700/50 hover:border-blue-500/30 cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{p.title}</p>
                      {p.description && <p className="text-xs text-slate-500 mt-1">{p.description}</p>}
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">{p.stage || p.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Trend Intelligence Agent', 'Narrative Strategy Agent', 'PR Opportunity Finder', 'Thought Leadership Writer', 'Media Prep Agent', 'Narrative Differentiation Detector'].map((name) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-blue-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-400" />
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
