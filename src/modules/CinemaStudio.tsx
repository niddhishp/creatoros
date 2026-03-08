import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreatorOSStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Film, Lightbulb, FileText, Stethoscope, Clapperboard, 
  Briefcase, Presentation, Plus, Play, Sparkles,
  User, Globe, MessageSquare, Layers,
  Target, TrendingUp, CheckCircle2
} from 'lucide-react';
import type { Float } from '@/types';

// ============================================
// FLOATS STUDIO
// ============================================
function FloatsStudio() {
  const floats = useCreatorOSStore((state) => state.floats);
  const addFloat = useCreatorOSStore((state) => state.addFloat);
  const connectFloatToProject = useCreatorOSStore((state) => state.connectFloatToProject);
  const projects = useCreatorOSStore((state) => state.projects.filter((p) => {
    const domain = state.domains.find((d) => d.id === p.domain_id);
    return domain?.slug === 'cinema';
  }));
  
  const [newFloat, setNewFloat] = useState('');
  const [selectedType, setSelectedType] = useState<Float['float_type']>('idea');

  const handleCapture = () => {
    if (!newFloat.trim()) return;
    addFloat({
      content: newFloat,
      float_type: selectedType,
    });
    setNewFloat('');
  };

  const floatTypes: { value: Float['float_type']; label: string; icon: React.ElementType }[] = [
    { value: 'idea', label: 'Idea', icon: Lightbulb },
    { value: 'scene', label: 'Scene', icon: Film },
    { value: 'character', label: 'Character', icon: User },
    { value: 'dialogue', label: 'Dialogue', icon: MessageSquare },
    { value: 'theme', label: 'Theme', icon: Layers },
    { value: 'contradiction', label: 'Contradiction', icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Capture Area */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Capture a Float
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {floatTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedType === type.value
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {type.label}
                  </button>
                );
              })}
            </div>
            <Textarea
              value={newFloat}
              onChange={(e) => setNewFloat(e.target.value)}
              placeholder="Capture your raw idea, scene, character, or theme..."
              className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleCapture}
                className="bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Capture Float
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floats List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {floats.map((float) => (
          <motion.div
            key={float.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
          >
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                {float.float_type}
              </Badge>
              <span className="text-xs text-slate-500">
                {new Date(float.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-slate-200 text-sm mb-3">{float.content}</p>
            {float.emotional_hook && (
              <p className="text-xs text-amber-400/70 mb-3">{float.emotional_hook}</p>
            )}
            <div className="flex items-center justify-between">
              <select
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-400"
                onChange={(e) => {
                  if (e.target.value) {
                    connectFloatToProject(float.id, e.target.value);
                  }
                }}
                value={float.connected_project_id || ''}
              >
                <option value="">Connect to project...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                <Play className="w-3 h-3 mr-1" />
                Develop
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SCREENPLAY STUDIO
// ============================================
const screenplayStages: { key: string; label: string; description: string; icon: React.ElementType }[] = [
  { key: 'float', label: 'Float', description: 'Raw spark of idea', icon: Lightbulb },
  { key: 'story_kernel', label: 'Story Kernel', description: 'What the story is fundamentally about', icon: Target },
  { key: 'universal_structure', label: 'Universal Structure', description: 'Three-act, hero journey, etc.', icon: Layers },
  { key: 'characters', label: 'Characters', description: '6 characteristics + questionnaire', icon: User },
  { key: 'character_album', label: 'Character Album', description: 'Visual history of characters', icon: Film },
  { key: 'archetype_layer', label: 'Archetype Layer', description: '12 archetypes + shadows', icon: Sparkles },
  { key: 'story_circle', label: 'Story Circle', description: '8-stage character journey', icon: TrendingUp },
  { key: 'story_rules', label: 'Story Rules', description: 'Pixar rules + structural principles', icon: CheckCircle2 },
  { key: 'shape_of_story', label: 'Shape of Story', description: 'Narrative curve identification', icon: Target },
  { key: 'beat_sheet', label: 'Beat Sheet', description: '16 emotional beats', icon: Layers },
  { key: 'step_outline', label: 'Step Outline', description: 'Scene-by-scene breakdown', icon: FileText },
  { key: 'scene_builder', label: 'Scene Builder', description: 'Expand beats into scenes', icon: Clapperboard },
  { key: 'dialogue', label: 'Dialogue', description: 'Character voice and subtext', icon: MessageSquare },
  { key: 'world_building', label: 'World Building', description: 'Setting, rules, motifs', icon: Globe },
  { key: 'style_craft', label: 'Style & Craft', description: 'Show vs tell, rhythm', icon: Sparkles },
  { key: 'final_bundling', label: 'Final Bundling', description: 'Complete screenplay assembly', icon: FileText },
];

function ScreenplayStudio() {
  const projects = useCreatorOSStore((state) => 
    state.projects.filter((p) => {
      const domain = state.domains.find((d) => d.id === p.domain_id);
      return domain?.slug === 'cinema';
    })
  );
  const characters = useCreatorOSStore((state) => state.characters);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project = projects.find((p) => p.id === selectedProject);

  return (
    <div className="space-y-6">
      {/* Project Selector */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Select Project:</span>
            <select
              value={selectedProject || ''}
              onChange={(e) => setSelectedProject(e.target.value || null)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
            >
              <option value="">Choose a screenplay project...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <Button variant="outline" className="border-rose-500/30 text-rose-400">
              <Plus className="w-4 h-4 mr-2" />
              New Screenplay
            </Button>
          </div>
        </CardContent>
      </Card>

      {project ? (
        <div className="space-y-6">
          {/* Project Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">{project.title}</h2>
              <p className="text-sm text-slate-400">{project.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="text-lg font-semibold text-rose-400">{project.progress}%</p>
              </div>
              <Progress value={project.progress} className="w-32 h-2" />
            </div>
          </div>

          {/* Development Pipeline */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-400" />
                Development Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {screenplayStages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isCompleted = (project.progress || 0) > (index / screenplayStages.length) * 100;
                  const isCurrent = project.stage === stage.key;
                  
                  return (
                    <motion.div
                      key={stage.key}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : isCurrent
                          ? 'bg-rose-500/10 border-rose-500/30'
                          : 'bg-slate-800/50 border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${
                          isCompleted ? 'text-emerald-400' : isCurrent ? 'text-rose-400' : 'text-slate-400'
                        }`} />
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <p className={`text-xs font-medium ${
                        isCompleted ? 'text-emerald-400' : isCurrent ? 'text-rose-400' : 'text-slate-300'
                      }`}>
                        {stage.label}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">{stage.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Characters Section */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-violet-400" />
                Characters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characters
                  .filter((c) => c.project_id === project.id)
                  .map((character) => (
                    <div
                      key={character.id}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-200">{character.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {character.role_type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500">Fear:</span>
                          <span className="text-slate-300 ml-1">{character.fear}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Ambition:</span>
                          <span className="text-slate-300 ml-1">{character.ambition}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                <Button
                  variant="outline"
                  className="border-dashed border-slate-600 text-slate-400 hover:text-slate-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Character
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <Film className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">Select a Project</h3>
          <p className="text-slate-500">Choose a screenplay project to view its development pipeline</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// SCRIPT DOCTORING STUDIO
// ============================================
function ScriptDoctoringStudio() {
  const [scriptContent, setScriptContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analysisLenses = [
    { name: 'White Hat', description: 'Facts & Objectivity', color: 'bg-slate-100' },
    { name: 'Black Hat', description: 'Criticism & Caution', color: 'bg-slate-900' },
    { name: 'Blue Hat', description: 'Process & Solutions', color: 'bg-blue-500' },
    { name: 'Red Hat', description: 'Emotions & Intuition', color: 'bg-red-500' },
    { name: 'Yellow Hat', description: 'Benefits & Optimism', color: 'bg-yellow-500' },
    { name: 'Green Hat', description: 'Creativity & Possibilities', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            Script Doctoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              placeholder="Paste your screenplay content here for analysis..."
              className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">
                Supports scripts up to 200+ pages with intelligent chunking
              </p>
              <Button 
                onClick={() => setIsAnalyzing(true)}
                disabled={!scriptContent.trim() || isAnalyzing}
                className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Analyze Script
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Lenses */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Six Thinking Hats Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {analysisLenses.map((lens) => (
              <div
                key={lens.name}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className={`w-4 h-4 rounded-full ${lens.color} mb-2`} />
                <p className="text-sm font-medium text-slate-200">{lens.name}</p>
                <p className="text-xs text-slate-500">{lens.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// DIRECTION STUDIO
// ============================================
function DirectionStudio() {
  const treatmentSections = [
    { key: 'interpretation', label: 'Script Interpretation', icon: FileText },
    { key: 'tone', label: 'Tone & Mood', icon: Sparkles },
    { key: 'references', label: 'Cinematic References', icon: Film },
    { key: 'visual', label: 'Visual Philosophy', icon: Layers },
    { key: 'characters', label: 'Character Descriptions', icon: User },
    { key: 'performance', label: 'Performance Texture', icon: Target },
    { key: 'locations', label: 'Location World', icon: Globe },
    { key: 'design', label: 'Production Design', icon: Layers },
    { key: 'camera', label: 'Camera & Rhythm', icon: Clapperboard },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-violet-400" />
            Director's Treatment Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {treatmentSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.key}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 text-left hover:border-violet-500/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-violet-400 mb-2" />
                  <p className="text-sm font-medium text-slate-200">{section.label}</p>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Shot Division */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Shot Division Studio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center border border-dashed border-slate-700 rounded-lg">
            <Clapperboard className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Select a scene to create shot division</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// PRODUCTION STUDIO
// ============================================
function ProductionStudio() {
  const productionModules = [
    { key: 'locations', label: 'Location Planner', description: 'Scout and plan locations', icon: Globe },
    { key: 'budget', label: 'Budget Framework', description: 'Cost estimation and tiers', icon: Briefcase },
    { key: 'casting', label: 'Casting Intelligence', description: 'Actor fit analysis', icon: User },
    { key: 'crew', label: 'Crew Intelligence', description: 'Key crew suggestions', icon: Layers },
    { key: 'prep', label: 'Preproduction Readiness', description: 'Look books and complexity', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productionModules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.key} className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200">{module.label}</h3>
                    <p className="text-sm text-slate-500">{module.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// PITCH STUDIO
// ============================================
function PitchStudio() {
  const pitchComponents = [
    { key: 'synopsis', label: 'Synopsis & Logline', icon: FileText },
    { key: 'deck', label: 'Deck Creator', icon: Presentation },
    { key: 'visual', label: 'Visual Pitch Builder', icon: Layers },
    { key: 'trailer', label: 'AI Trailer Builder', icon: Film },
    { key: 'boxoffice', label: 'Box Office Lens', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Presentation className="w-5 h-5 text-violet-400" />
            Pitch Package Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {pitchComponents.map((component) => {
              const Icon = component.icon;
              return (
                <motion.button
                  key={component.key}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-center hover:border-violet-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-200">{component.label}</p>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pitch Preview */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Pitch Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-slate-700">
            <div className="text-center">
              <Presentation className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500">Select a project to preview pitch</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// MAIN CINEMA STUDIO COMPONENT
// ============================================
export default function CinemaStudio() {
  const currentStudio = useCreatorOSStore((state) => state.currentStudio);
  const studios = useCreatorOSStore((state) => state.studios);

  // Map current studio to tab value
  const getTabValue = () => {
    if (!currentStudio) return 'floats';
    const studio = studios.find((s) => s.id === currentStudio);
    if (!studio) return 'floats';
    
    switch (studio.slug) {
      case 'floats': return 'floats';
      case 'screenplay': return 'screenplay';
      case 'doctoring': return 'doctoring';
      case 'direction': return 'direction';
      case 'production': return 'production';
      case 'pitch':
      case 'marketing_producer': return 'pitch';
      default: return 'floats';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Film className="w-6 h-6 text-rose-400" />
            Cinema Studio
          </h1>
          <p className="text-slate-400">
            AI-powered film development environment
          </p>
        </div>
      </div>

      {/* Studio Tabs */}
      <Tabs defaultValue="floats" value={getTabValue()} className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-700 p-1">
          <TabsTrigger value="floats" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <Lightbulb className="w-4 h-4 mr-2" />
            Floats
          </TabsTrigger>
          <TabsTrigger value="screenplay" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <FileText className="w-4 h-4 mr-2" />
            Screenplay
          </TabsTrigger>
          <TabsTrigger value="doctoring" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <Stethoscope className="w-4 h-4 mr-2" />
            Doctoring
          </TabsTrigger>
          <TabsTrigger value="direction" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <Clapperboard className="w-4 h-4 mr-2" />
            Direction
          </TabsTrigger>
          <TabsTrigger value="production" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <Briefcase className="w-4 h-4 mr-2" />
            Production
          </TabsTrigger>
          <TabsTrigger value="pitch" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
            <Presentation className="w-4 h-4 mr-2" />
            Pitch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="floats" className="mt-6">
          <FloatsStudio />
        </TabsContent>
        <TabsContent value="screenplay" className="mt-6">
          <ScreenplayStudio />
        </TabsContent>
        <TabsContent value="doctoring" className="mt-6">
          <ScriptDoctoringStudio />
        </TabsContent>
        <TabsContent value="direction" className="mt-6">
          <DirectionStudio />
        </TabsContent>
        <TabsContent value="production" className="mt-6">
          <ProductionStudio />
        </TabsContent>
        <TabsContent value="pitch" className="mt-6">
          <PitchStudio />
        </TabsContent>
      </Tabs>
    </div>
  );
}
