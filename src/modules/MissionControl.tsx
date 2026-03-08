// Mission Control Dashboard - No state needed
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Film, Play, Pause, Archive, RefreshCw, Lightbulb, 
  Target, TrendingUp, Heart, Briefcase, Zap,
  Clock, CheckCircle2, Sparkles, Plus
} from 'lucide-react';
// Types are used implicitly through the store

// ============================================
// SECTION 1: ACTIVE CREATIVE PROJECTS
// ============================================
function ActiveProjectsSection() {
  const projects = useCreatorOSStore((state) => 
    state.projects.filter((p) => p.status === 'active')
  );
  const domains = useCreatorOSStore((state) => state.domains);
  const setCurrentDomain = useCreatorOSStore((state) => state.setCurrentDomain);
  const setCurrentProject = useCreatorOSStore((state) => state.setCurrentProject);

  const getDomainColor = (domainId: string) => {
    const domain = domains.find((d) => d.id === domainId);
    switch (domain?.slug) {
      case 'cinema': return 'text-rose-400 bg-rose-400/10';
      case 'advertising': return 'text-amber-400 bg-amber-400/10';
      case 'business': return 'text-emerald-400 bg-emerald-400/10';
      case 'author': return 'text-violet-400 bg-violet-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Active Creative Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.length === 0 ? (
            <p className="text-slate-500 text-sm">No active projects</p>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:border-slate-600 transition-colors"
                onClick={() => {
                  const domain = domains.find((d) => d.id === project.domain_id);
                  if (domain) setCurrentDomain(domain.slug as any);
                  setCurrentProject(project.id);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-200">{project.title}</h3>
                      <Badge className={`text-xs ${getDomainColor(project.domain_id)}`}>
                        {domains.find((d) => d.id === project.domain_id)?.name.split(' ')[0]}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{project.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {project.stage?.replace(/_/g, ' ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(project.last_activity_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-slate-300 mb-1">
                      {project.progress}%
                    </div>
                    <Progress value={project.progress} className="w-20 h-1.5" />
                  </div>
                </div>
                {project.next_action && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      Next: {project.next_action}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 2: ACTIVE FILMS & SCRIPTS
// ============================================
function ActiveFilmsSection() {
  const filmProjects = useCreatorOSStore((state) => 
    state.projects.filter((p) => {
      const domain = state.domains.find((d) => d.id === p.domain_id);
      return domain?.slug === 'cinema' && (p.status === 'active' || p.status === 'idea');
    })
  );
  const setCurrentDomain = useCreatorOSStore((state) => state.setCurrentDomain);
  const setCurrentProject = useCreatorOSStore((state) => state.setCurrentProject);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Film className="w-5 h-5 text-rose-400" />
          Active Films & Scripts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filmProjects.length === 0 ? (
            <p className="text-slate-500 text-sm">No active film projects</p>
          ) : (
            filmProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:border-rose-500/30 transition-colors"
                onClick={() => {
                  setCurrentDomain('cinema');
                  setCurrentProject(project.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-200">{project.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-400">
                        {project.stage?.replace(/_/g, ' ')}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        Progress: {project.progress}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                    <Play className="w-4 h-4 mr-1" />
                    Continue
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 3: PITCH OPPORTUNITIES
// ============================================
function PitchOpportunitiesSection() {
  const pitchProjects = useCreatorOSStore((state) => 
    state.projects.filter((p) => 
      p.stage?.includes('pitch') || 
      p.project_type === 'pitch_package' ||
      (p.progress && p.progress >= 70 && p.status === 'active')
    )
  );

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          Pitch Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pitchProjects.length === 0 ? (
            <p className="text-slate-500 text-sm">No projects ready for pitching</p>
          ) : (
            pitchProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-200">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="text-xs bg-violet-500/10 text-violet-400">
                        {project.progress}% Ready
                      </Badge>
                      <span className="text-xs text-slate-500">
                        Potential targets: Producers, Investors, OTT Platforms
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-violet-500/30 text-violet-400">
                    Prepare Pitch
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 4: STALLED PROJECTS
// ============================================
function StalledProjectsSection() {
  const stalledProjects = useCreatorOSStore((state) => 
    state.projects.filter((p) => p.status === 'stalled')
  );
  const updateProject = useCreatorOSStore((state) => state.updateProject);

  const handleResume = (projectId: string) => {
    updateProject(projectId, { status: 'active' });
  };

  const handleArchive = (projectId: string) => {
    updateProject(projectId, { status: 'archived' });
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Pause className="w-5 h-5 text-amber-400" />
          Stalled Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stalledProjects.length === 0 ? (
            <p className="text-slate-500 text-sm">No stalled projects</p>
          ) : (
            stalledProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-200">{project.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Last activity: {new Date(project.last_activity_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-emerald-500/30 text-emerald-400"
                      onClick={() => handleResume(project.id)}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Resume
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-slate-600 text-slate-400"
                      onClick={() => handleArchive(project.id)}
                    >
                      <Archive className="w-3 h-3 mr-1" />
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 5: RESUME WHERE YOU LEFT OFF
// ============================================
function ResumeSection() {
  const resumeItems = useCreatorOSStore((state) => state.resumeItems);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'script': return <Film className="w-4 h-4 text-rose-400" />;
      case 'deck': return <Briefcase className="w-4 h-4 text-violet-400" />;
      case 'note': return <Lightbulb className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Resume Where You Left Off
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resumeItems.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent activity</p>
          ) : (
            resumeItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => {
                  // Navigate to resume URL
                }}
              >
                {getIconForType(item.entity_type)}
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                  <Play className="w-4 h-4" />
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 6: AI SUGGESTIONS
// ============================================
function AISuggestionsSection() {
  const recommendations = useCreatorOSStore((state) => 
    state.recommendations.filter((r) => r.status === 'open')
  );
  const dismissRecommendation = useCreatorOSStore((state) => state.dismissRecommendation);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.length === 0 ? (
            <p className="text-slate-500 text-sm">No new suggestions</p>
          ) : (
            recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-emerald-400">{rec.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{rec.body}</p>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6 text-slate-500 hover:text-slate-300"
                    onClick={() => dismissRecommendation(rec.id)}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 7: IDEA CAPTURE
// ============================================
function IdeaCaptureSection() {
  const setQuickCaptureOpen = useCreatorOSStore((state) => state.setQuickCaptureOpen);
  const recentFloats = useCreatorOSStore((state) => 
    state.floats.slice(0, 3)
  );

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Idea Capture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full mb-4 bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
          onClick={() => setQuickCaptureOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Capture New Idea
        </Button>
        
        <div className="space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Recent Captures</p>
          {recentFloats.map((float) => (
            <div
              key={float.id}
              className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
            >
              <p className="text-sm text-slate-300 line-clamp-2">{float.content}</p>
              {float.emotional_hook && (
                <p className="text-xs text-amber-400/70 mt-1">{float.emotional_hook}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 8: TODAY'S FOCUS
// ============================================
function TodayFocusSection() {
  const tasks = useCreatorOSStore((state) => 
    state.tasks
      .filter((t) => t.status !== 'done')
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 5)
  );
  const updateTask = useCreatorOSStore((state) => state.updateTask);

  const handleComplete = (taskId: string) => {
    updateTask(taskId, { status: 'done' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-amber-400 bg-amber-400/10';
      case 'medium': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-400" />
          Today's Focus
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">All caught up!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-slate-500 hover:text-emerald-400"
                  onClick={() => handleComplete(task.id)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-slate-500">{task.description}</p>
                  )}
                </div>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                {task.suggested_by_ai && (
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 9: PERSONAL SIGNALS
// ============================================
function PersonalSignalsSection() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400" />
          Personal Signals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Energy Level</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
              </div>
              <span className="text-sm text-emerald-400">75%</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Creative Flow</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
              </div>
              <span className="text-sm text-amber-400">80%</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Learning Progress</p>
            <p className="text-sm text-slate-300">3 courses in progress</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Reflections</p>
            <p className="text-sm text-slate-300">12 this month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// SECTION 10: VENTURE SIGNALS
// ============================================
function VentureSignalsSection() {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          Venture Signals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Active Ventures</p>
            <p className="text-2xl font-semibold text-emerald-400">2</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Funding Readiness</p>
            <p className="text-sm text-amber-400">Pre-seed stage</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Growth Opportunities</p>
            <p className="text-sm text-slate-300">3 identified</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/30">
            <p className="text-xs text-slate-500 mb-1">Next Milestone</p>
            <p className="text-sm text-slate-300">MVP Launch</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// MAIN MISSION CONTROL COMPONENT
// ============================================
export default function MissionControl() {
  const user = useCreatorOSStore((state) => state.user);

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Mission Control
          </h1>
          <p className="text-slate-400">
            Welcome back, {user?.name || 'Creator'}. Here's your creative command center.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <ActiveProjectsSection />
          <ActiveFilmsSection />
          <PitchOpportunitiesSection />
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <TodayFocusSection />
          <StalledProjectsSection />
          <ResumeSection />
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <IdeaCaptureSection />
          <AISuggestionsSection />
          <PersonalSignalsSection />
          <VentureSignalsSection />
        </div>
      </div>
    </div>
  );
}
