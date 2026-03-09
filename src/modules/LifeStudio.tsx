import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Heart, Target, DollarSign, Activity, BookOpen, Sun, TrendingUp, TrendingDown } from 'lucide-react';

const studioConfig = [
  { slug: 'priorities',   icon: Target,      label: 'Priority Management',  desc: 'Clarity on what matters most — life, creative, and business' },
  { slug: 'finance',      icon: DollarSign,  label: 'Finance Studio',       desc: 'Income, expenses, investments, and financial health' },
  { slug: 'health',       icon: Activity,    label: 'Health Studio',        desc: 'Exercise, nutrition, energy, and blood sugar tracking' },
  { slug: 'learning',     icon: BookOpen,    label: 'Learning Studio',      desc: 'Skill development, courses, and knowledge tracking' },
  { slug: 'spirituality', icon: Sun,         label: 'Spiritual Studio',     desc: 'Reflection, mindfulness, purpose, and inner clarity' },
];

function FinanceSnapshot() {
  const entries = useCreatorOSStore((s) => s.financeEntries);
  const income  = entries.filter((e) => e.entry_type === 'income').reduce((a, e) => a + e.amount, 0);
  const expense = entries.filter((e) => e.entry_type === 'expense').reduce((a, e) => a + e.amount, 0);
  const net = income - expense;
  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)}k`;

  return (
    <Card className="bg-slate-800/40 border-slate-700/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" /> Finance Snapshot — March
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10">
            <p className="text-xs text-slate-500 mb-1">Income</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">{fmt(income)}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10">
            <p className="text-xs text-slate-500 mb-1">Expenses</p>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-rose-400" />
              <span className="text-sm font-semibold text-rose-400">{fmt(expense)}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10">
            <p className="text-xs text-slate-500 mb-1">Net</p>
            <span className={`text-sm font-semibold ${net >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>{fmt(net)}</span>
          </div>
        </div>
        <div className="space-y-2">
          {entries.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center justify-between text-xs">
              <span className="text-slate-400 truncate max-w-[200px]">{e.description}</span>
              <span className={e.entry_type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                {e.entry_type === 'income' ? '+' : '-'}{fmt(e.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LifeStudio() {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-400" />
            </span>
            Life Studio
          </h1>
          <p className="text-slate-400 mt-1">Finance, health, priorities, learning, and inner clarity</p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Life OS</Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Dashboard</TabsTrigger>
          <TabsTrigger value="studios"   className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Studios</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinanceSnapshot />
            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" /> Health Signals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Energy Level',    value: 75, color: 'bg-emerald-400' },
                  { label: 'Creative Flow',   value: 82, color: 'bg-amber-400'   },
                  { label: 'Sleep Quality',   value: 68, color: 'bg-blue-400'    },
                  { label: 'Exercise Streak', value: 60, color: 'bg-violet-400'  },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-300">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5 bg-slate-700" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-slate-800/40 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-400" /> Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { topic: 'AI Filmmaking Systems',   progress: 65, status: 'In Progress' },
                  { topic: 'Advanced Prompt Engineering', progress: 80, status: 'Near Complete' },
                  { topic: 'Venture Strategy',         progress: 40, status: 'In Progress' },
                ].map((item) => (
                  <div key={item.topic} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{item.topic}</span>
                      <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-400 py-0">{item.status}</Badge>
                    </div>
                    <Progress value={item.progress} className="h-1.5 bg-slate-700" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="studios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {studioConfig.map((s) => (
              <motion.div key={s.slug} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-slate-800/40 border-slate-700/50 hover:border-emerald-500/30 cursor-pointer transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <s.icon className="w-5 h-5 text-emerald-400" />
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
      </Tabs>
    </div>
  );
}
