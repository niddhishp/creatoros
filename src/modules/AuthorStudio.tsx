import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Lightbulb, Stethoscope, Palette, Megaphone, Plus, Sparkles, ArrowRight, Heart } from 'lucide-react';

const studioConfig = [
  { slug: 'book_float',    icon: Lightbulb,    label: 'Float Studio',            desc: 'Capture the early seed of a book idea' },
  { slug: 'book_creation', icon: BookOpen,      label: 'Book Creation Studio',    desc: 'Concept → architecture → chapters → full manuscript' },
  { slug: 'book_doctoring',icon: Stethoscope,   label: 'Book Doctoring Studio',   desc: 'Analyze and improve existing manuscripts' },
  { slug: 'humanizer',     icon: Heart,         label: 'Humanizer Studio',        desc: 'Make AI-assisted writing feel human and authentic' },
  { slug: 'book_design',   icon: Palette,       label: 'Book Design Studio',      desc: 'Cover design, interior layout, and publishing assets' },
  { slug: 'book_marketing',icon: Megaphone,     label: 'Book Marketing Studio',   desc: 'Launch strategy, positioning, and promotional content' },
];

export default function AuthorStudio() {
  const [tab, setTab] = useState('studios');
  const projects = useCreatorOSStore((s) => s.projects.filter((p) => p.domain_id === '4'));
  const addProject = useCreatorOSStore((s) => s.addProject);

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-400" />
            </span>
            Author Studio
          </h1>
          <p className="text-slate-400 mt-1">Book creation, manuscript doctoring, design, and marketing</p>
        </div>
        <Badge variant="outline" className="border-violet-500/30 text-violet-400">Publishing OS</Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios"  className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400">Studios</TabsTrigger>
          <TabsTrigger value="books"    className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400">Books</TabsTrigger>
          <TabsTrigger value="agents"   className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => (
              <motion.div key={s.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-slate-800/40 border-slate-700/50 hover:border-violet-500/30 cursor-pointer transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                        <s.icon className="w-5 h-5 text-violet-400" />
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

        <TabsContent value="books" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{projects.length} book{projects.length !== 1 ? 's' : ''}</p>
              <Button size="sm" className="bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 border border-violet-500/20"
                onClick={() => addProject({ domain_id: '4', studio_id: 's21', title: 'New Book Project', status: 'idea', priority: 'medium', visibility: 'private', last_activity_at: new Date().toISOString() })}>
                <Plus className="w-4 h-4 mr-1.5" /> New Book
              </Button>
            </div>
            {projects.length === 0 ? (
              <Card className="bg-slate-800/20 border-slate-700/30 border-dashed">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No books yet — capture a float to begin</p>
                </CardContent>
              </Card>
            ) : projects.map((p) => (
              <Card key={p.id} className="bg-slate-800/40 border-slate-700/50 hover:border-violet-500/30 cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{p.title}</p>
                      {p.description && <p className="text-xs text-slate-500 mt-1">{p.description}</p>}
                    </div>
                    <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-400">{p.stage || p.status}</Badge>
                  </div>
                  {p.progress !== undefined && (
                    <div className="space-y-1">
                      <Progress value={p.progress} className="h-1.5 bg-slate-700" />
                      <p className="text-xs text-slate-600">{p.progress}% complete</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Book Concept Agent', 'Argument Architect', 'Chapter Development Agent', 'Voice Consistency Tracker', 'Humanizer Agent', 'Cover Impact Analyzer', 'Book Marketing Strategist'].map((name) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-violet-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-violet-400" />
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
