import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Megaphone, Lightbulb, Target, Users, Palette, Film,
  Radio, Plus, Sparkles, TrendingUp, ArrowRight
} from 'lucide-react';

const studioConfig = [
  { slug: 'brief',              icon: Target,    label: 'Brief Studio',              color: 'text-amber-400',  desc: 'Capture the client brief and define the creative problem' },
  { slug: 'planning',           icon: TrendingUp,label: 'Planning Studio',           color: 'text-amber-400',  desc: 'Category intelligence, brand discovery, audience psychology' },
  { slug: 'strategy',           icon: Lightbulb, label: 'Strategy Studio',           color: 'text-amber-400',  desc: 'Core campaign strategy — CCO-level thinking for CMOs' },
  { slug: 'creative_direction', icon: Sparkles,  label: 'Creative Direction Studio', color: 'text-amber-400',  desc: 'Integrated campaign platforms and ideation engine' },
  { slug: 'copywriting',        icon: Megaphone, label: 'Copywriting Studio',        color: 'text-amber-400',  desc: 'Campaign copy, scripts, taglines, and dialogue' },
  { slug: 'art_direction',      icon: Palette,   label: 'Art Direction Studio',      color: 'text-amber-400',  desc: 'Visual design, colour palettes, typography direction' },
  { slug: 'director_treatment', icon: Film,      label: 'Director Treatment Studio', color: 'text-amber-400',  desc: 'Full director treatment for advertising films' },
  { slug: 'marketing_producer', icon: Radio,     label: 'Marketing Producer — Maya', color: 'text-amber-400',  desc: 'CMO outreach, campaign amplification, client management' },
];

function StudioCard({ config }: { config: typeof studioConfig[0] }) {
  const Icon = config.icon;
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-slate-800/40 border-slate-700/50 hover:border-amber-500/30 cursor-pointer transition-all group">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="font-medium text-slate-200 text-sm">{config.label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{config.desc}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectsTab() {
  const projects = useCreatorOSStore((s) => s.projects.filter((p) => p.domain_id === '2'));
  const setCurrentProject = useCreatorOSStore((s) => s.setCurrentProject);
  const addProject = useCreatorOSStore((s) => s.addProject);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{projects.length} campaign{projects.length !== 1 ? 's' : ''}</p>
        <Button size="sm" className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/20"
          onClick={() => addProject({ domain_id: '2', studio_id: 's7', title: 'New Campaign', status: 'idea', priority: 'medium', visibility: 'private', last_activity_at: new Date().toISOString() })}>
          <Plus className="w-4 h-4 mr-1.5" /> New Campaign
        </Button>
      </div>
      {projects.length === 0 ? (
        <Card className="bg-slate-800/20 border-slate-700/30 border-dashed">
          <CardContent className="p-8 text-center">
            <Megaphone className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No campaigns yet</p>
            <p className="text-slate-600 text-xs mt-1">Start by capturing a client brief</p>
          </CardContent>
        </Card>
      ) : (
        projects.map((p) => (
          <Card key={p.id} onClick={() => setCurrentProject(p.id)} className="bg-slate-800/40 border-slate-700/50 hover:border-amber-500/30 cursor-pointer transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-200 text-sm">{p.title}</p>
                  {p.description && <p className="text-xs text-slate-500 mt-1">{p.description}</p>}
                </div>
                <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400">{p.stage || p.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default function AdvertisingStudio() {
  const [tab, setTab] = useState('studios');

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-amber-400" />
            </span>
            Advertising Studio
          </h1>
          <p className="text-slate-400 mt-1">Brand strategy, campaign ideation, and integrated treatments</p>
        </div>
        <Badge variant="outline" className="border-amber-500/30 text-amber-400">
          <Users className="w-3 h-3 mr-1" /> Agency Mode
        </Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">Studios</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">Campaigns</TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => <StudioCard key={s.slug} config={s} />)}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <ProjectsTab />
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Strategy Agent', 'Cultural Intelligence Agent', 'Copywriter Agent', 'Art Direction Agent', 'Maya — Marketing Producer', 'Fame Potential Analyzer'].map((name) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-amber-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-400" />
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
