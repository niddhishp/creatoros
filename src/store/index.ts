import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Domain, Studio, Project, Task, 
  Float, Character, Agent,
  SystemRecommendation, AppNotification, ResumeItem,
  DomainSlug
} from '@/types';

// ============================================
// DOMAIN & STUDIO DATA
// ============================================
const domainsData: Domain[] = [
  { id: '1', slug: 'cinema', name: 'Cinema Studio', description: 'Film writing, direction, production, and pitching', icon: 'film', sort_order: 1, created_at: new Date().toISOString() },
  { id: '2', slug: 'advertising', name: 'Advertising Studio', description: 'Brand strategy, campaign ideation, and treatments', icon: 'megaphone', sort_order: 2, created_at: new Date().toISOString() },
  { id: '3', slug: 'pr', name: 'PR Studio', description: 'Narrative and opportunity intelligence', icon: 'radio', sort_order: 3, created_at: new Date().toISOString() },
  { id: '4', slug: 'author', name: 'Author Studio', description: 'Book creation, doctoring, design, and marketing', icon: 'book-open', sort_order: 4, created_at: new Date().toISOString() },
  { id: '5', slug: 'personal_branding', name: 'Personal Branding Studio', description: 'Content, publishing, and website presence', icon: 'user-circle', sort_order: 5, created_at: new Date().toISOString() },
  { id: '6', slug: 'psychology', name: 'Psychology Studio', description: 'NLP, reflections, and cognitive tools', icon: 'brain', sort_order: 6, created_at: new Date().toISOString() },
  { id: '7', slug: 'life', name: 'Life Studio', description: 'Finance, health, priorities, and learning', icon: 'heart', sort_order: 7, created_at: new Date().toISOString() },
  { id: '8', slug: 'business', name: 'Business Studio', description: 'Ventures, strategy, business plans, and growth', icon: 'briefcase', sort_order: 8, created_at: new Date().toISOString() },
];

const studiosData: Studio[] = [
  // Cinema Studios
  { id: 's1', domain_id: '1', slug: 'floats', name: 'Floats Studio', description: 'Capture and expand raw movie ideas', sort_order: 1, created_at: new Date().toISOString() },
  { id: 's2', domain_id: '1', slug: 'screenplay', name: 'Screenplay Studio', description: 'Complete screenplay development pipeline', sort_order: 2, created_at: new Date().toISOString() },
  { id: 's3', domain_id: '1', slug: 'doctoring', name: 'Script Doctoring Studio', description: 'Analyze and improve existing scripts', sort_order: 3, created_at: new Date().toISOString() },
  { id: 's4', domain_id: '1', slug: 'direction', name: 'Direction Studio', description: 'Directorial interpretation and treatment', sort_order: 4, created_at: new Date().toISOString() },
  { id: 's5', domain_id: '1', slug: 'production', name: 'Production Studio', description: 'Production planning and readiness', sort_order: 5, created_at: new Date().toISOString() },
  { id: 's6', domain_id: '1', slug: 'marketing_producer', name: 'Marketing Producer Studio', description: 'Investor and actor targeting', sort_order: 6, created_at: new Date().toISOString() },
  { id: 's7', domain_id: '1', slug: 'pitch', name: 'Pitch Studio', description: 'Pitch decks and visual materials', sort_order: 7, created_at: new Date().toISOString() },
  
  // Advertising Studios
  { id: 's8', domain_id: '2', slug: 'brief', name: 'Brief Studio', description: 'Capture brand briefs', sort_order: 1, created_at: new Date().toISOString() },
  { id: 's9', domain_id: '2', slug: 'planning', name: 'Planning Studio', description: 'Strategic discovery and intelligence', sort_order: 2, created_at: new Date().toISOString() },
  { id: 's10', domain_id: '2', slug: 'strategy', name: 'Strategy Studio', description: 'Core campaign strategy', sort_order: 3, created_at: new Date().toISOString() },
  { id: 's11', domain_id: '2', slug: 'creative_direction', name: 'Creative Direction Studio', description: 'Creative concept development', sort_order: 4, created_at: new Date().toISOString() },
  { id: 's12', domain_id: '2', slug: 'copywriting', name: 'Copywriting Studio', description: 'Campaign copy and scripts', sort_order: 5, created_at: new Date().toISOString() },
  { id: 's13', domain_id: '2', slug: 'art_direction', name: 'Art Direction Studio', description: 'Visual design and aesthetics', sort_order: 6, created_at: new Date().toISOString() },
  { id: 's14', domain_id: '2', slug: 'director_treatment', name: 'Director Treatment Studio', description: 'Film treatment for campaigns', sort_order: 7, created_at: new Date().toISOString() },
  { id: 's15', domain_id: '2', slug: 'marketing_producer', name: 'Marketing Producer Studio', description: 'Outreach and amplification', sort_order: 8, created_at: new Date().toISOString() },
  
  // Author Studios
  { id: 's16', domain_id: '4', slug: 'book_creation', name: 'Book Creation Studio', description: 'Write and develop books', sort_order: 1, created_at: new Date().toISOString() },
  { id: 's17', domain_id: '4', slug: 'book_doctoring', name: 'Book Doctoring Studio', description: 'Analyze and improve manuscripts', sort_order: 2, created_at: new Date().toISOString() },
  
  // Business Studios
  { id: 's18', domain_id: '8', slug: 'venture', name: 'Venture Studio', description: 'Develop business ventures', sort_order: 1, created_at: new Date().toISOString() },
  { id: 's19', domain_id: '8', slug: 'business_plan', name: 'Business Plan Studio', description: 'Create business plans', sort_order: 2, created_at: new Date().toISOString() },
  
  // Personal Branding
  { id: 's20', domain_id: '5', slug: 'content', name: 'Content Studio', description: 'Create and schedule content', sort_order: 1, created_at: new Date().toISOString() },
  
  // Psychology
  { id: 's21', domain_id: '6', slug: 'reflection', name: 'Reflection Studio', description: 'Journal and reflect', sort_order: 1, created_at: new Date().toISOString() },
  
  // Life
  { id: 's22', domain_id: '7', slug: 'finance', name: 'Finance Studio', description: 'Track finances', sort_order: 1, created_at: new Date().toISOString() },
];

// ============================================
// MOCK PROJECTS DATA
// ============================================
const mockProjects: Project[] = [
  {
    id: 'p1',
    user_id: 'user1',
    domain_id: '1',
    studio_id: 's2',
    title: 'Citizen - Feature Film',
    slug: 'citizen-feature',
    description: 'A psychological thriller about identity and power',
    project_type: 'feature_film',
    status: 'active',
    stage: 'screenplay_writing',
    priority: 'high',
    visibility: 'private',
    health_score: 78,
    started_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 45,
    next_action: 'Continue writing Scene 14 - The confrontation',
  },
  {
    id: 'p2',
    user_id: 'user1',
    domain_id: '1',
    studio_id: 's2',
    title: 'The Last Train',
    slug: 'last-train',
    description: 'A romantic drama set in Mumbai local trains',
    project_type: 'feature_film',
    status: 'idea',
    stage: 'float',
    priority: 'medium',
    visibility: 'private',
    health_score: 25,
    last_activity_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 10,
    next_action: 'Develop story kernel from float',
  },
  {
    id: 'p3',
    user_id: 'user1',
    domain_id: '2',
    studio_id: 's10',
    title: 'Hypnotic - Brand Campaign',
    slug: 'hypnotic-campaign',
    description: 'Positioning strategy for AI venture',
    project_type: 'campaign',
    status: 'active',
    stage: 'strategy_development',
    priority: 'high',
    visibility: 'private',
    health_score: 65,
    started_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 60,
    next_action: 'Refine positioning narrative',
  },
  {
    id: 'p4',
    user_id: 'user1',
    domain_id: '8',
    studio_id: 's18',
    title: 'CreatorOS Platform',
    slug: 'creatoros-platform',
    description: 'AI-powered creative operating system',
    project_type: 'venture',
    status: 'active',
    stage: 'mvp_development',
    priority: 'critical',
    visibility: 'private',
    health_score: 82,
    started_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    progress: 35,
    next_action: 'Complete Cinema Studio restructuring',
  },
  {
    id: 'p5',
    user_id: 'user1',
    domain_id: '1',
    studio_id: 's7',
    title: 'Midnight Diner - Pitch Package',
    slug: 'midnight-diner-pitch',
    description: 'Pitch materials for Midnight Diner film',
    project_type: 'pitch_package',
    status: 'active',
    stage: 'deck_creation',
    priority: 'high',
    visibility: 'private',
    health_score: 70,
    started_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 75,
    next_action: 'Finalize investor deck',
  },
  {
    id: 'p6',
    user_id: 'user1',
    domain_id: '1',
    studio_id: 's2',
    title: 'Echoes of Silence',
    slug: 'echoes-of-silence',
    description: 'A drama about a deaf musician',
    project_type: 'feature_film',
    status: 'stalled',
    stage: 'character_development',
    priority: 'medium',
    visibility: 'private',
    health_score: 30,
    started_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    last_activity_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 25,
    next_action: 'Resume character questionnaire',
  },
];

// ============================================
// MOCK FLOATS DATA
// ============================================
const mockFloats: Float[] = [
  {
    id: 'f1',
    user_id: 'user1',
    content: 'A story about a man who can hear colors but is going blind',
    title: 'Synesthetic Blindness',
    float_type: 'idea',
    emotional_hook: 'The tragedy of losing the very gift that made you special',
    possible_genres: ['Drama', 'Psychological'],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'f2',
    user_id: 'user1',
    content: 'Opening scene: A funeral where everyone is laughing',
    title: 'The Laughing Funeral',
    float_type: 'scene',
    emotional_hook: 'The complexity of grief and celebration',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'f3',
    user_id: 'user1',
    content: 'Character: A hitman who only kills on Tuesdays because he believes it\'s his lucky day',
    title: 'Tuesday Hitman',
    float_type: 'character',
    emotional_hook: 'Ritual and superstition in a violent world',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ============================================
// MOCK TASKS DATA
// ============================================
const mockTasks: Task[] = [
  {
    id: 't1',
    user_id: 'user1',
    project_id: 'p1',
    title: 'Continue writing Scene 14',
    description: 'The confrontation between protagonist and antagonist',
    priority: 'high',
    status: 'in_progress',
    suggested_by_ai: true,
    source_context: { project_title: 'Citizen', scene_number: 14 },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 't2',
    user_id: 'user1',
    project_id: 'p3',
    title: 'Refine Hypnotic positioning',
    description: 'Clarify the narrative for investor pitch',
    priority: 'high',
    status: 'todo',
    suggested_by_ai: true,
    source_context: { project_title: 'Hypnotic' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 't3',
    user_id: 'user1',
    title: 'Draft LinkedIn post',
    description: 'Share insight from advertising campaign work',
    priority: 'medium',
    status: 'todo',
    suggested_by_ai: true,
    source_context: { source: 'campaign_insight' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK CHARACTERS DATA
// ============================================
const mockCharacters: Character[] = [
  {
    id: 'c1',
    project_id: 'p1',
    name: 'Arjun Mehra',
    role_type: 'protagonist',
    fear: 'Being forgotten, becoming irrelevant',
    ambition: 'To create something that outlasts him',
    talent: 'Reading people, understanding their desires',
    virtue: 'Loyalty to those he trusts',
    courage: 'Faces danger head-on when protecting others',
    worldview: 'The world is a stage and everyone is performing',
    internal_struggle: 'Between authenticity and the masks he wears',
    arc_summary: 'From a man who hides behind personas to someone who embraces his true self',
    archetypes: ['Magician', 'Shape-shifter'],
    questionnaire: {
      face_tells: 'Intensity, someone who has seen too much',
      posture_tells: 'Controlled, deliberate movements',
      childhood_event: 'Father\'s public disgrace',
    },
    album_data: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK AGENTS DATA
// ============================================
const mockAgents: Agent[] = [
  { id: 'a1', domain_id: '1', studio_id: 's2', name: 'Story Alchemist', slug: 'story-alchemist', description: 'Transforms raw concepts into cinematic potential', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a2', domain_id: '1', studio_id: 's2', name: 'Genre Architect', slug: 'genre-architect', description: 'Creates unexpected genre frameworks', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a3', domain_id: '1', studio_id: 's2', name: 'Character Builder', slug: 'character-builder', description: 'Builds deeply layered characters', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a4', domain_id: '1', studio_id: 's2', name: 'World Builder', slug: 'world-builder', description: 'Creates immersive story worlds', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a5', domain_id: '1', studio_id: 's2', name: 'Dialogue Smith', slug: 'dialogue-smith', description: 'Crafts authentic dialogue', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a6', domain_id: '1', studio_id: 's3', name: 'Script Doctor', slug: 'script-doctor', description: 'Analyzes and improves scripts', agent_type: 'analytical', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a7', domain_id: '1', studio_id: 's4', name: 'Treatment Builder', slug: 'treatment-builder', description: 'Creates director treatments', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a8', domain_id: '1', studio_id: 's7', name: 'Pitch Architect', slug: 'pitch-architect', description: 'Builds compelling pitch materials', agent_type: 'creative', model_provider: 'anthropic', default_model: 'claude-3-opus', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
];

// ============================================
// MOCK RECOMMENDATIONS DATA
// ============================================
const mockRecommendations: SystemRecommendation[] = [
  {
    id: 'r1',
    user_id: 'user1',
    project_id: 'p1',
    domain_id: '1',
    recommendation_type: 'story_insight',
    title: 'Character Arc Opportunity',
    body: 'Your film script has strong character arcs but lacks a midpoint twist that would elevate the tension. Consider adding a revelation that forces Arjun to question his core belief.',
    priority: 'high',
    status: 'open',
    source_context: { project_title: 'Citizen' },
    created_at: new Date().toISOString(),
  },
  {
    id: 'r2',
    user_id: 'user1',
    project_id: 'p3',
    recommendation_type: 'positioning',
    title: 'Positioning Clarity',
    body: 'Your Hypnotic venture may benefit from a clearer positioning narrative. Focus on the transformation it enables rather than the features it offers.',
    priority: 'medium',
    status: 'open',
    source_context: { project_title: 'Hypnotic' },
    created_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK NOTIFICATIONS DATA
// ============================================
const mockNotifications: AppNotification[] = [
  { id: 'n1', type: 'info', title: 'Scene 14 saved', message: 'Your progress on Citizen has been saved.', timestamp: new Date().toISOString(), read: false },
  { id: 'n2', type: 'success', title: 'Character created', message: 'Arjun Mehra has been added to Citizen.', timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), read: true },
];

// ============================================
// MOCK RESUME ITEMS
// ============================================
const mockResumeItems: ResumeItem[] = [
  {
    id: 'res1',
    entity_type: 'script',
    entity_id: 'p1',
    title: 'Citizen - Scene 14',
    description: 'Last edited: The confrontation dialogue',
    last_edited_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resume_url: '/cinema/screenplay/p1/scene/14',
  },
  {
    id: 'res2',
    entity_type: 'deck',
    entity_id: 'p5',
    title: 'Midnight Diner - Pitch Deck',
    description: 'Last edited: Visual treatment slides',
    last_edited_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    resume_url: '/cinema/pitch/p5/deck',
  },
  {
    id: 'res3',
    entity_type: 'note',
    entity_id: 'note1',
    title: 'Campaign Strategy Notes',
    description: 'Last edited: Hypnotic positioning insights',
    last_edited_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    resume_url: '/advertising/strategy/p3/notes',
  },
];

// ============================================
// STORE INTERFACE
// ============================================
interface CreatorOSState {
  // User
  user: { id: string; email: string; name: string; avatar?: string } | null;
  isAuthenticated: boolean;
  
  // Core Data
  domains: Domain[];
  studios: Studio[];
  projects: Project[];
  floats: Float[];
  tasks: Task[];
  characters: Character[];
  agents: Agent[];
  recommendations: SystemRecommendation[];
  notifications: AppNotification[];
  resumeItems: ResumeItem[];
  
  // UI State
  currentDomain: DomainSlug | null;
  currentStudio: string | null;
  currentProject: string | null;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  quickCaptureOpen: boolean;
  
  // Actions
  setUser: (user: any) => void;
  logout: () => void;
  setCurrentDomain: (domain: DomainSlug | null) => void;
  setCurrentStudio: (studio: string | null) => void;
  setCurrentProject: (project: string | null) => void;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setQuickCaptureOpen: (open: boolean) => void;
  
  // Project Actions
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Float Actions
  addFloat: (float: Omit<Float, 'id' | 'created_at' | 'user_id'>) => void;
  updateFloat: (id: string, updates: Partial<Float>) => void;
  deleteFloat: (id: string) => void;
  connectFloatToProject: (floatId: string, projectId: string) => void;
  
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Character Actions
  addCharacter: (character: Omit<Character, 'id' | 'created_at' | 'updated_at'>) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  dismissAllNotifications: () => void;
  
  // Recommendation Actions
  dismissRecommendation: (id: string) => void;
  acceptRecommendation: (id: string) => void;
  
  // Selectors
  getProjectsByDomain: (domainId: string) => Project[];
  getProjectsByStudio: (studioId: string) => Project[];
  getActiveProjects: () => Project[];
  getStalledProjects: () => Project[];
  getPitchReadyProjects: () => Project[];
  getFilmProjects: () => Project[];
  getCharactersByProject: (projectId: string) => Character[];
  getDomainStudios: (domainId: string) => Studio[];
  getTodayFocus: () => Task[];
  getUnreadNotifications: () => AppNotification[];
}

// ============================================
// STORE IMPLEMENTATION
// ============================================
export const useCreatorOSStore = create<CreatorOSState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: { id: 'user1', email: 'creator@example.com', name: 'Niddhish', avatar: undefined },
      isAuthenticated: true,
      
      domains: domainsData,
      studios: studiosData,
      projects: mockProjects,
      floats: mockFloats,
      tasks: mockTasks,
      characters: mockCharacters,
      agents: mockAgents,
      recommendations: mockRecommendations,
      notifications: mockNotifications,
      resumeItems: mockResumeItems,
      
      currentDomain: null,
      currentStudio: null,
      currentProject: null,
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      quickCaptureOpen: false,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setCurrentDomain: (domain) => set({ currentDomain: domain }),
      setCurrentStudio: (studio) => set({ currentStudio: studio }),
      setCurrentProject: (project) => set({ currentProject: project }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setQuickCaptureOpen: (open) => set({ quickCaptureOpen: open }),
      
      // Project Actions
      addProject: (project) => set((state) => ({
        projects: [...state.projects, {
          ...project,
          id: `p${Date.now()}`,
          user_id: 'user1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Project],
      })),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
        ),
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      })),
      
      // Float Actions
      addFloat: (float) => set((state) => ({
        floats: [...state.floats, {
          ...float,
          id: `f${Date.now()}`,
          user_id: 'user1',
          created_at: new Date().toISOString(),
        } as Float],
      })),
      
      updateFloat: (id, updates) => set((state) => ({
        floats: state.floats.map((f) => 
          f.id === id ? { ...f, ...updates } : f
        ),
      })),
      
      deleteFloat: (id) => set((state) => ({
        floats: state.floats.filter((f) => f.id !== id),
      })),
      
      connectFloatToProject: (floatId, projectId) => set((state) => ({
        floats: state.floats.map((f) => 
          f.id === floatId ? { ...f, connected_project_id: projectId } : f
        ),
      })),
      
      // Task Actions
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: `t${Date.now()}`,
          user_id: 'user1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Task],
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t
        ),
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),
      
      // Character Actions
      addCharacter: (character) => set((state) => ({
        characters: [...state.characters, {
          ...character,
          id: `c${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Character],
      })),
      
      updateCharacter: (id, updates) => set((state) => ({
        characters: state.characters.map((c) => 
          c.id === id ? { ...c, ...updates, updated_at: new Date().toISOString() } : c
        ),
      })),
      
      deleteCharacter: (id) => set((state) => ({
        characters: state.characters.filter((c) => c.id !== id),
      })),
      
      // Notification Actions
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => 
          n.id === id ? { ...n, read: true } : n
        ),
      })),
      
      dismissAllNotifications: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),
      
      // Recommendation Actions
      dismissRecommendation: (id) => set((state) => ({
        recommendations: state.recommendations.map((r) => 
          r.id === id ? { ...r, status: 'dismissed' as const } : r
        ),
      })),
      
      acceptRecommendation: (id) => set((state) => ({
        recommendations: state.recommendations.map((r) => 
          r.id === id ? { ...r, status: 'done' as const } : r
        ),
      })),
      
      // Selectors
      getProjectsByDomain: (domainId) => {
        return get().projects.filter((p) => p.domain_id === domainId);
      },
      
      getProjectsByStudio: (studioId) => {
        return get().projects.filter((p) => p.studio_id === studioId);
      },
      
      getActiveProjects: () => {
        return get().projects.filter((p) => p.status === 'active');
      },
      
      getStalledProjects: () => {
        return get().projects.filter((p) => p.status === 'stalled');
      },
      
      getPitchReadyProjects: () => {
        return get().projects.filter((p) => 
          p.stage?.includes('pitch') || p.project_type === 'pitch_package'
        );
      },
      
      getFilmProjects: () => {
        const cinemaDomain = get().domains.find((d) => d.slug === 'cinema');
        if (!cinemaDomain) return [];
        return get().projects.filter((p) => p.domain_id === cinemaDomain.id);
      },
      
      getCharactersByProject: (projectId) => {
        return get().characters.filter((c) => c.project_id === projectId);
      },
      
      getDomainStudios: (domainId) => {
        return get().studios.filter((s) => s.domain_id === domainId);
      },
      
      getTodayFocus: () => {
        return get().tasks.filter((t) => 
          t.priority === 'high' && t.status !== 'done'
        ).slice(0, 3);
      },
      
      getUnreadNotifications: () => {
        return get().notifications.filter((n) => !n.read);
      },
    }),
    {
      name: 'creatoros-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
