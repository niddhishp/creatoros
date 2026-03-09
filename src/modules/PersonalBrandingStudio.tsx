import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, Fingerprint, Lightbulb, Rss, BarChart2, Database, Plus, Sparkles, ArrowRight, Linkedin, Youtube } from 'lucide-react';

const studioConfig = [
  { slug: 'identity',          icon: Fingerprint, label: 'Identity Studio',          desc: 'Define your intellectual identity and professional positioning' },
  { slug: 'narrative',         icon: Lightbulb,   label: 'Narrative Studio',         desc: 'Unified story connecting filmmaking, advertising, and AI work' },
  { slug: 'content_creation',  icon: Rss,         label: 'Content Creation Studio',  desc: 'Convert projects and ideas into posts, articles, and videos' },
  { slug: 'platform_strategy', icon: BarChart2,   label: 'Platform Strategy Studio', desc: 'Content distribution across LinkedIn, YouTube, Instagram' },
  { slug: 'content_hub',       icon: Database,    label: 'Content Hub',              desc: 'Central writing and idea storage — your creative notebook' },
];

const contentItems = [
  { platform: 'LinkedIn', type: 'Article', title: 'Why AI Films Need Human Instincts', status: 'draft', icon: Linkedin, color: 'text-blue-400' },
  { platform: 'YouTube',  type: 'Video',   title: 'CreatorOS: How I Build AI Workflows', status: 'idea',  icon: Youtube, color: 'text-red-400' },
  { platform: 'LinkedIn', type: 'Post',    title: 'The midpoint twist is where most screenplays fail', status: 'published', icon: Linkedin, color: 'text-blue-400' },
];

export default function PersonalBrandingStudio() {
  const [tab, setTab] = useState('studios');

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-pink-400" />
            </span>
            Personal Branding Studio
          </h1>
          <p className="text-slate-400 mt-1">Content, publishing, narrative identity, and audience growth</p>
        </div>
        <Badge variant="outline" className="border-pink-500/30 text-pink-400">Narrative OS</Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="studios" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">Studios</TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">Content Hub</TabsTrigger>
          <TabsTrigger value="agents"  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => (
              <motion.div key={s.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-slate-800/40 border-slate-700/50 hover:border-pink-500/30 cursor-pointer transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                        <s.icon className="w-5 h-5 text-pink-400" />
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

        <TabsContent value="content" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{contentItems.length} content pieces</p>
              <Button size="sm" className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/20">
                <Plus className="w-4 h-4 mr-1.5" /> Create Content
              </Button>
            </div>
            {contentItems.map((item, i) => (
              <Card key={i} className="bg-slate-800/40 border-slate-700/50 hover:border-pink-500/30 cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div>
                        <p className="font-medium text-slate-200 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.platform} · {item.type}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${item.status === 'published' ? 'border-emerald-500/30 text-emerald-400' : 'border-pink-500/30 text-pink-400'}`}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Identity Blueprint Agent', 'Narrative Architect', 'Idea-to-Content Converter', 'Authority Flywheel Generator', 'Platform Adaptation Agent', 'Voice Consistency Tracker'].map((name) => (
              <Card key={name} className="bg-slate-800/40 border-slate-700/50 hover:border-pink-500/30 cursor-pointer transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-pink-400" />
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
