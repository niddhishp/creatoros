import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Briefcase, Map, BarChart2, TrendingUp, Zap,
  DollarSign, Target, Link2, FileText, Plus,
  Sparkles, ArrowRight, ArrowUpRight, Circle
} from 'lucide-react';

const studioConfig = [
  { slug: 'venture_map',     icon: Map,       label: 'Venture Mapping Studio',    desc: 'A clear overview of all your businesses, missions, and relationships' },
  { slug: 'stage_assessment',icon: BarChart2, label: 'Stage Assessment Studio',    desc: 'Maturity level, traction, and product-market fit per venture' },
  { slug: 'strategy',        icon: Target,    label: 'Strategy Studio',            desc: 'Positioning, competitive advantage, and strategic direction' },
  { slug: 'growth',          icon: TrendingUp,label: 'Growth Engine Studio',       desc: 'Revenue levers, acquisition channels, and growth experiments' },
  { slug: 'fundraising',     icon: DollarSign,label: 'Fundraising Strategy Studio',desc: 'Investor targeting, pitch narrative, and capital roadmap' },
  { slug: 'synergy',         icon: Link2,     label: 'Synergy Studio',             desc: 'Identify strategic flywheels between your ventures' },
  { slug: 'business_plan',   icon: FileText,  label: 'Business Plan Studio',       desc: 'Investor-ready plan: executive summary, market, financials, pitch deck' },
];

// The user's known ventures — driven by store but pre-mapped for the ecosystem view
const ventureEcosystem = [
  { name: 'Hypnotic',            type: 'AI SaaS',         stage: 'Early Product',   note: 'AI content ecosystem for advertising and film',  color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { name: 'PlusHuman',           type: 'Marketplace',     stage: 'Concept',          note: 'Human expert marketplace integrated with AI',     color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
  { name: 'CREA',                type: 'Community',       stage: 'Concept',          note: 'Creative community with rituals and experiences', color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  { name: 'Light Seeker Films',  type: 'Production',      stage: 'Established',      note: 'Film and advertising production company',         color: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'border-rose-500/20'   },
  { name: 'ReputeOS',            type: 'AI SaaS',         stage: 'Early Concept',    note: 'AI-powered reputation intelligence platform',     color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
  { name: 'Niddhish.com',        type: 'Personal Brand',  stage: 'Active',           note: 'Director identity and AI storytelling authority', color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20'},
];

// Stage badge colours
const stageColor: Record<string, string> = {
  'Established':   'border-emerald-500/30 text-emerald-400',
  'Active':        'border-emerald-500/30 text-emerald-400',
  'Early Product': 'border-amber-500/30  text-amber-400',
  'Early Concept': 'border-blue-500/30   text-blue-400',
  'Concept':       'border-slate-600     text-slate-400',
};

function StudioCard({ config }: { config: typeof studioConfig[0] }) {
  const Icon = config.icon;
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-slate-800/40 border-slate-700/50 hover:border-teal-500/30 cursor-pointer transition-all group">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/20 transition-colors">
              <Icon className="w-5 h-5 text-teal-400" />
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

function EcosystemMap() {
  return (
    <Card className="bg-slate-800/40 border-slate-700/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Link2 className="w-4 h-4 text-teal-400" /> Venture Ecosystem Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {ventureEcosystem.map((v) => (
            <motion.div
              key={v.name}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg border ${v.bg} ${v.border} cursor-pointer transition-all`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-sm font-semibold ${v.color}`}>{v.name}</span>
                <Badge variant="outline" className={`text-xs ${stageColor[v.stage] ?? 'border-slate-600 text-slate-400'}`}>
                  {v.stage}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">{v.note}</p>
              <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wide">{v.type}</p>
            </motion.div>
          ))}
        </div>

        {/* Synergy flywheel callout */}
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-teal-500/5 to-transparent border border-teal-500/20">
          <p className="text-xs font-medium text-teal-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Strategic Flywheel
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-violet-400">Hypnotic</span> generates AI content →{' '}
            <span className="text-blue-400">PlusHuman</span> adds human expertise →{' '}
            <span className="text-amber-400">CREA</span> builds creative community →{' '}
            feeds creators back into PlusHuman →{' '}
            <span className="text-rose-400">Light Seeker Films</span> showcases AI capabilities →{' '}
            drives demand for Hypnotic.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function VenturesTab() {
  const projects  = useCreatorOSStore((s) => s.projects.filter((p) => p.domain_id === '8'));
  const addProject = useCreatorOSStore((s) => s.addProject);
  const setCurrentProject = useCreatorOSStore((s) => s.setCurrentProject);

  const stageProgress: Record<string, number> = {
    'idea':           10,
    'concept':        20,
    'prototype':      35,
    'early_traction': 55,
    'growth':         70,
    'mvp_development':40,
    'scaling':        85,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{projects.length} venture{projects.length !== 1 ? 's' : ''}</p>
        <Button
          size="sm"
          className="bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 border border-teal-500/20"
          onClick={() => addProject({
            domain_id: '8', studio_id: 's41',
            title: 'New Venture', status: 'idea',
            priority: 'medium', visibility: 'private',
            last_activity_at: new Date().toISOString(),
          })}
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Venture
        </Button>
      </div>

      {/* Ecosystem overview */}
      <EcosystemMap />

      {/* Projects from store */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Active Ventures in System</p>
          {projects.map((p) => {
            const progress = p.progress ?? stageProgress[p.stage ?? ''] ?? 20;
            return (
              <Card
                key={p.id}
                onClick={() => setCurrentProject(p.id)}
                className="bg-slate-800/40 border-slate-700/50 hover:border-teal-500/30 cursor-pointer transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{p.title}</p>
                      {p.description && <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-teal-500/30 text-teal-400">
                        {p.stage?.replace(/_/g, ' ') ?? p.status}
                      </Badge>
                      <ArrowUpRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-slate-700" />
                  </div>
                  {p.next_action && (
                    <p className="text-xs text-teal-400/70 mt-2 flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-current" /> Next: {p.next_action}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BusinessStudio() {
  const [tab, setTab] = useState('studios');

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-400" />
            </span>
            Business Studio
          </h1>
          <p className="text-slate-400 mt-1">Venture strategy, growth, business plans, and ecosystem intelligence</p>
        </div>
        <Badge variant="outline" className="border-teal-500/30 text-teal-400">
          <Zap className="w-3 h-3 mr-1" /> Founder OS
        </Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios"  className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">Studios</TabsTrigger>
          <TabsTrigger value="ventures" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">Ventures</TabsTrigger>
          <TabsTrigger value="agents"   className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => <StudioCard key={s.slug} config={s} />)}
          </div>
        </TabsContent>

        <TabsContent value="ventures" className="mt-6">
          <VenturesTab />
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Venture Mapper',          desc: 'Maps ecosystem relationships between businesses' },
              { name: 'Stage Analyst',            desc: 'Evaluates maturity, traction, and readiness' },
              { name: 'Strategy Advisor',         desc: 'Positioning, competitive advantage, narrative' },
              { name: 'Growth Architect',         desc: 'Revenue levers, channels, and experiments' },
              { name: 'Fundraising Strategist',   desc: 'Investor targeting, pitch narrative, roadmap' },
              { name: 'Business Plan Builder',    desc: 'Full investor-grade plan with financials' },
            ].map(({ name, desc }) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-teal-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-200 block">{name}</span>
                      <span className="text-xs text-slate-500">{desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
