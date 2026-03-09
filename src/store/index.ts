import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Domain, Studio, Project, Task,
  Float, Character, Agent,
  SystemRecommendation, AppNotification, ResumeItem,
  DomainSlug, FinanceEntry
} from '@/types';

// ============================================
// DOMAIN & STUDIO SEED DATA
// ============================================
const domainsData: Domain[] = [
  { id: '1', slug: 'cinema',            name: 'Cinema Studio',            description: 'Film writing, direction, production, and pitching',  icon: 'film',         sort_order: 1, created_at: new Date().toISOString() },
  { id: '2', slug: 'advertising',       name: 'Advertising Studio',       description: 'Brand strategy, campaign ideation, and treatments',  icon: 'megaphone',    sort_order: 2, created_at: new Date().toISOString() },
  { id: '3', slug: 'pr',                name: 'PR Studio',                description: 'Narrative intelligence and opportunity engine',      icon: 'radio',        sort_order: 3, created_at: new Date().toISOString() },
  { id: '4', slug: 'author',            name: 'Author Studio',            description: 'Book creation, doctoring, design, and marketing',   icon: 'book-open',    sort_order: 4, created_at: new Date().toISOString() },
  { id: '5', slug: 'personal_branding', name: 'Personal Branding Studio', description: 'Content, publishing, and website presence',         icon: 'user-circle',  sort_order: 5, created_at: new Date().toISOString() },
  { id: '6', slug: 'psychology',        name: 'Psychology Studio',        description: 'NLP, reflections, and cognitive tools',             icon: 'brain',        sort_order: 6, created_at: new Date().toISOString() },
  { id: '7', slug: 'life',              name: 'Life Studio',              description: 'Finance, health, priorities, and learning',         icon: 'heart',        sort_order: 7, created_at: new Date().toISOString() },
  { id: '8', slug: 'business',          name: 'Business Studio',          description: 'Ventures, strategy, business plans, and growth',    icon: 'briefcase',    sort_order: 8, created_at: new Date().toISOString() },
];

const studiosData: Studio[] = [
  // Cinema
  { id: 's1',  domain_id: '1', slug: 'floats',             name: 'Floats Studio',             description: 'Capture and expand raw movie ideas',            sort_order: 1, created_at: new Date().toISOString() },
  { id: 's2',  domain_id: '1', slug: 'screenplay',         name: 'Screenplay Studio',         description: 'Complete screenplay development pipeline',       sort_order: 2, created_at: new Date().toISOString() },
  { id: 's3',  domain_id: '1', slug: 'doctoring',          name: 'Script Doctoring Studio',   description: 'Analyze and improve existing scripts',           sort_order: 3, created_at: new Date().toISOString() },
  { id: 's4',  domain_id: '1', slug: 'direction',          name: 'Direction Studio',          description: 'Directorial interpretation and treatment',       sort_order: 4, created_at: new Date().toISOString() },
  { id: 's5',  domain_id: '1', slug: 'production',         name: 'Production Studio',         description: 'Production planning and readiness',              sort_order: 5, created_at: new Date().toISOString() },
  { id: 's6',  domain_id: '1', slug: 'pitch',              name: 'Pitch Studio',              description: 'Pitch decks and visual materials',               sort_order: 6, created_at: new Date().toISOString() },
  // Advertising
  { id: 's7',  domain_id: '2', slug: 'brief',              name: 'Brief Studio',              description: 'Capture and define the client brief',            sort_order: 1, created_at: new Date().toISOString() },
  { id: 's8',  domain_id: '2', slug: 'planning',           name: 'Planning Studio',           description: 'Category intelligence and brand discovery',      sort_order: 2, created_at: new Date().toISOString() },
  { id: 's9',  domain_id: '2', slug: 'strategy',           name: 'Strategy Studio',           description: 'Core campaign strategy and insight engine',      sort_order: 3, created_at: new Date().toISOString() },
  { id: 's10', domain_id: '2', slug: 'creative_direction', name: 'Creative Direction Studio', description: 'Campaign concept and ideation engine',           sort_order: 4, created_at: new Date().toISOString() },
  { id: 's11', domain_id: '2', slug: 'copywriting',        name: 'Copywriting Studio',        description: 'Campaign copy, scripts, and taglines',           sort_order: 5, created_at: new Date().toISOString() },
  { id: 's12', domain_id: '2', slug: 'art_direction',      name: 'Art Direction Studio',      description: 'Visual design and aesthetic direction',          sort_order: 6, created_at: new Date().toISOString() },
  { id: 's13', domain_id: '2', slug: 'director_treatment', name: 'Director Treatment Studio', description: 'Film treatment for ad campaigns',                sort_order: 7, created_at: new Date().toISOString() },
  { id: 's14', domain_id: '2', slug: 'marketing_producer', name: 'Marketing Producer (Maya)', description: 'Outreach, CMO targeting, and amplification',     sort_order: 8, created_at: new Date().toISOString() },
  // PR
  { id: 's15', domain_id: '3', slug: 'trend_radar',        name: 'Trend Radar',               description: 'Surface important cultural trends',             sort_order: 1, created_at: new Date().toISOString() },
  { id: 's16', domain_id: '3', slug: 'narrative_lab',      name: 'Narrative Lab',             description: 'Translate trends into strategic narratives',    sort_order: 2, created_at: new Date().toISOString() },
  { id: 's17', domain_id: '3', slug: 'pr_opportunity',     name: 'PR Opportunity Engine',     description: 'Generate press angles and media hooks',         sort_order: 3, created_at: new Date().toISOString() },
  { id: 's18', domain_id: '3', slug: 'thought_leadership', name: 'Thought Leadership Studio', description: 'LinkedIn articles and opinion content',          sort_order: 4, created_at: new Date().toISOString() },
  { id: 's19', domain_id: '3', slug: 'media_interaction',  name: 'Media Interaction Studio',  description: 'Interview prep and media positioning',          sort_order: 5, created_at: new Date().toISOString() },
  // Author
  { id: 's20', domain_id: '4', slug: 'book_float',         name: 'Float Studio',              description: 'Capture the early seed of a book idea',         sort_order: 1, created_at: new Date().toISOString() },
  { id: 's21', domain_id: '4', slug: 'book_creation',      name: 'Book Creation Studio',      description: 'Concept to full manuscript development',        sort_order: 2, created_at: new Date().toISOString() },
  { id: 's22', domain_id: '4', slug: 'book_doctoring',     name: 'Book Doctoring Studio',     description: 'Analyze and improve existing manuscripts',      sort_order: 3, created_at: new Date().toISOString() },
  { id: 's23', domain_id: '4', slug: 'humanizer',          name: 'Humanizer Studio',          description: 'Make AI-assisted writing feel human',           sort_order: 4, created_at: new Date().toISOString() },
  { id: 's24', domain_id: '4', slug: 'book_design',        name: 'Book Design Studio',        description: 'Cover design, layout, and publishing assets',   sort_order: 5, created_at: new Date().toISOString() },
  { id: 's25', domain_id: '4', slug: 'book_marketing',     name: 'Book Marketing Studio',     description: 'Launch strategy, positioning, and promotion',   sort_order: 6, created_at: new Date().toISOString() },
  // Personal Branding
  { id: 's26', domain_id: '5', slug: 'identity',           name: 'Identity Studio',           description: 'Define your intellectual and public identity',  sort_order: 1, created_at: new Date().toISOString() },
  { id: 's27', domain_id: '5', slug: 'narrative',          name: 'Narrative Studio',          description: 'Unified narrative connecting all your work',    sort_order: 2, created_at: new Date().toISOString() },
  { id: 's28', domain_id: '5', slug: 'content_creation',   name: 'Content Creation Studio',   description: 'Convert ideas into posts, articles, videos',    sort_order: 3, created_at: new Date().toISOString() },
  { id: 's29', domain_id: '5', slug: 'platform_strategy',  name: 'Platform Strategy Studio',  description: 'Distribute content across LinkedIn, YouTube',   sort_order: 4, created_at: new Date().toISOString() },
  { id: 's30', domain_id: '5', slug: 'content_hub',        name: 'Content Hub',               description: 'Central writing and idea storage system',       sort_order: 5, created_at: new Date().toISOString() },
  // Psychology
  { id: 's31', domain_id: '6', slug: 'manifesto',          name: 'Creative Manifesto Studio', description: 'Define your creative philosophy',               sort_order: 1, created_at: new Date().toISOString() },
  { id: 's32', domain_id: '6', slug: 'nlp_modelling',      name: 'NLP Modelling Studio',      description: 'Model thinking patterns of exceptional people', sort_order: 2, created_at: new Date().toISOString() },
  { id: 's33', domain_id: '6', slug: 'nlp_lens',           name: 'NLP Lens Engine',           description: 'Apply psychological filters to your ideas',     sort_order: 3, created_at: new Date().toISOString() },
  { id: 's34', domain_id: '6', slug: 'reflection',         name: 'Reflection Studio',         description: 'Structured journaling and insight capture',     sort_order: 4, created_at: new Date().toISOString() },
  { id: 's35', domain_id: '6', slug: 'pattern_breaker',    name: 'Pattern Breaker Studio',    description: 'Challenge habitual thinking patterns',          sort_order: 5, created_at: new Date().toISOString() },
  // Life
  { id: 's36', domain_id: '7', slug: 'priorities',         name: 'Priority Management',       description: 'Clarity on what matters most right now',        sort_order: 1, created_at: new Date().toISOString() },
  { id: 's37', domain_id: '7', slug: 'finance',            name: 'Finance Studio',            description: 'Income, expenses, and financial health',         sort_order: 2, created_at: new Date().toISOString() },
  { id: 's38', domain_id: '7', slug: 'health',             name: 'Health Studio',             description: 'Exercise, nutrition, and energy tracking',       sort_order: 3, created_at: new Date().toISOString() },
  { id: 's39', domain_id: '7', slug: 'learning',           name: 'Learning Studio',           description: 'Continuous skill development and tracking',     sort_order: 4, created_at: new Date().toISOString() },
  { id: 's40', domain_id: '7', slug: 'spirituality',       name: 'Spiritual Studio',          description: 'Reflection, mindfulness, and purpose',          sort_order: 5, created_at: new Date().toISOString() },
  // Business
  { id: 's41', domain_id: '8', slug: 'venture_map',        name: 'Venture Mapping Studio',    description: 'Overview of all your businesses',               sort_order: 1, created_at: new Date().toISOString() },
  { id: 's42', domain_id: '8', slug: 'stage_assessment',   name: 'Stage Assessment Studio',   description: 'Maturity and readiness of each venture',        sort_order: 2, created_at: new Date().toISOString() },
  { id: 's43', domain_id: '8', slug: 'strategy',           name: 'Strategy Studio',           description: 'Strategic direction per venture',               sort_order: 3, created_at: new Date().toISOString() },
  { id: 's44', domain_id: '8', slug: 'growth',             name: 'Growth Engine Studio',      description: 'Revenue strategy and growth levers',            sort_order: 4, created_at: new Date().toISOString() },
  { id: 's45', domain_id: '8', slug: 'fundraising',        name: 'Fundraising Strategy Studio', description: 'Capital raising and investor targeting',      sort_order: 5, created_at: new Date().toISOString() },
  { id: 's46', domain_id: '8', slug: 'synergy',            name: 'Synergy Studio',            description: 'Connections and flywheels between ventures',    sort_order: 6, created_at: new Date().toISOString() },
  { id: 's47', domain_id: '8', slug: 'business_plan',      name: 'Business Plan Studio',      description: 'Investor-ready narrative and plan builder',     sort_order: 7, created_at: new Date().toISOString() },
];

// ============================================
// MOCK DATA
// ============================================
const mockProjects: Project[] = [
  {
    id: 'p1', user_id: 'user1', domain_id: '1', studio_id: 's2',
    title: 'Citizen — Feature Film', slug: 'citizen-feature',
    description: 'A psychological thriller about identity and power in modern India',
    project_type: 'feature_film', status: 'active', stage: 'screenplay_writing',
    priority: 'high', visibility: 'private', health_score: 78,
    started_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    last_activity_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    progress: 45, next_action: 'Continue writing Scene 14 — The confrontation',
  },
  {
    id: 'p2', user_id: 'user1', domain_id: '1', studio_id: 's2',
    title: 'The Last Train', slug: 'last-train',
    description: 'A romantic drama set in Mumbai local trains',
    project_type: 'feature_film', status: 'idea', stage: 'float',
    priority: 'medium', visibility: 'private', health_score: 25,
    last_activity_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    progress: 10, next_action: 'Develop story kernel from float',
  },
  {
    id: 'p3', user_id: 'user1', domain_id: '2', studio_id: 's9',
    title: 'Hypnotic — Brand Campaign', slug: 'hypnotic-campaign',
    description: 'Positioning strategy and integrated campaign for the AI venture',
    project_type: 'campaign', status: 'active', stage: 'strategy_development',
    priority: 'high', visibility: 'private', health_score: 65,
    started_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    last_activity_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    progress: 60, next_action: 'Refine positioning narrative',
  },
  {
    id: 'p4', user_id: 'user1', domain_id: '8', studio_id: 's41',
    title: 'CreatorOS Platform', slug: 'creatoros-platform',
    description: 'AI-powered creative operating system for filmmakers and advertisers',
    project_type: 'venture', status: 'active', stage: 'mvp_development',
    priority: 'critical', visibility: 'private', health_score: 82,
    started_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    last_activity_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    progress: 35, next_action: 'Complete domain studio modules',
  },
  {
    id: 'p5', user_id: 'user1', domain_id: '1', studio_id: 's6',
    title: 'Midnight Diner — Pitch Package', slug: 'midnight-diner-pitch',
    description: 'Full pitch materials for Midnight Diner — a slice-of-life drama',
    project_type: 'pitch_package', status: 'active', stage: 'deck_creation',
    priority: 'high', visibility: 'private', health_score: 70,
    started_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    last_activity_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    progress: 75, next_action: 'Finalise investor deck visual treatment',
  },
  {
    id: 'p6', user_id: 'user1', domain_id: '1', studio_id: 's2',
    title: 'Echoes of Silence', slug: 'echoes-of-silence',
    description: 'A drama about a deaf musician finding her voice',
    project_type: 'feature_film', status: 'stalled', stage: 'character_development',
    priority: 'medium', visibility: 'private', health_score: 30,
    started_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    last_activity_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    progress: 25, next_action: 'Resume character questionnaire',
  },
  {
    id: 'p7', user_id: 'user1', domain_id: '8', studio_id: 's41',
    title: 'PlusHuman Marketplace', slug: 'plushuman',
    description: 'Human expert marketplace integrated with AI workflows',
    project_type: 'venture', status: 'idea', stage: 'concept',
    priority: 'medium', visibility: 'private', health_score: 40,
    last_activity_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    progress: 15, next_action: 'Define MVP feature set',
  },
];

const mockFloats: Float[] = [
  {
    id: 'f1', user_id: 'user1',
    content: 'A story about a man who can hear colours but is slowly going blind — the tragedy of losing the very gift that made you special',
    title: 'Synesthetic Blindness', float_type: 'idea',
    emotional_hook: 'Losing the gift that defines you',
    possible_genres: ['Drama', 'Psychological'],
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'f2', user_id: 'user1',
    content: 'Opening scene: A funeral where everyone is laughing. The dead man always wanted it this way.',
    title: 'The Laughing Funeral', float_type: 'scene',
    emotional_hook: 'The complexity of grief and celebration colliding',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'f3', user_id: 'user1',
    content: 'A hitman who only takes contracts on Tuesdays — his ritual, his superst',
    title: 'Tuesday Ritual', float_type: 'character',
    emotional_hook: 'Ritual and violence as comfort',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockTasks: Task[] = [
  {
    id: 't1', user_id: 'user1', project_id: 'p1',
    title: 'Continue writing Scene 14',
    description: 'The confrontation between Arjun and the Minister',
    priority: 'high', status: 'in_progress', suggested_by_ai: true,
    source_context: { project_title: 'Citizen', scene_number: 14 },
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 't2', user_id: 'user1', project_id: 'p3',
    title: 'Refine Hypnotic positioning narrative',
    description: 'Clarify the strategic narrative for investor pitch deck',
    priority: 'high', status: 'todo', suggested_by_ai: true,
    source_context: { project_title: 'Hypnotic' },
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 't3', user_id: 'user1',
    title: 'Draft LinkedIn post on AI filmmaking',
    description: 'Share insight from the CreatorOS campaign work',
    priority: 'medium', status: 'todo', suggested_by_ai: true,
    source_context: { source: 'campaign_insight' },
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

const mockCharacters: Character[] = [
  {
    id: 'c1', project_id: 'p1', name: 'Arjun Mehra', role_type: 'protagonist',
    fear: 'Being forgotten — becoming irrelevant',
    ambition: 'To create something that outlasts him',
    talent: 'Reading people; understanding their hidden desires',
    virtue: 'Fierce loyalty to those he trusts',
    courage: 'Faces danger directly when protecting others',
    worldview: 'The world is a stage — everyone is performing a version of themselves',
    internal_struggle: 'Between the masks he wears and his authentic self',
    arc_summary: 'From a man who hides behind personas to someone who embraces truth at great cost',
    archetypes: ['Magician', 'Shape-shifter'],
    questionnaire: {
      face_tells: 'Intensity — someone who has seen too much',
      childhood_event: "Father's public disgrace at 12",
      recurring_dream: 'Standing on a stage with no lines prepared',
    },
    album_data: {},
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

const mockAgents: Agent[] = [
  { id: 'a1', domain_id: '1', studio_id: 's2', name: 'Story Alchemist',    slug: 'story-alchemist',    description: 'Transforms raw concepts into cinematic potential',   agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a2', domain_id: '1', studio_id: 's2', name: 'Genre Architect',    slug: 'genre-architect',    description: 'Creates unexpected genre frameworks',                agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a3', domain_id: '1', studio_id: 's2', name: 'Character Builder',  slug: 'character-builder',  description: 'Builds deeply layered, paradoxical characters',      agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a4', domain_id: '1', studio_id: 's2', name: 'Dialogue Smith',     slug: 'dialogue-smith',     description: 'Crafts authentic, subtext-rich dialogue',           agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a5', domain_id: '1', studio_id: 's3', name: 'Script Doctor',      slug: 'script-doctor',      description: 'Deep structural and dialogue analysis',             agent_type: 'analytical',  model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a6', domain_id: '1', studio_id: 's4', name: 'Treatment Builder',  slug: 'treatment-builder',  description: 'Creates full director treatment notes',             agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a7', domain_id: '1', studio_id: 's6', name: 'Pitch Architect',    slug: 'pitch-architect',    description: 'Builds compelling pitch decks and materials',       agent_type: 'creative',    model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a8', domain_id: '2', studio_id: 's9', name: 'Strategy Agent',     slug: 'strategy-agent',     description: 'CCO-level integrated campaign strategy',            agent_type: 'strategic',   model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
  { id: 'a9', domain_id: '2', studio_id: 's14',name: 'Maya',               slug: 'maya',               description: 'Marketing producer — CMO outreach and amplification', agent_type: 'outreach',  model_provider: 'anthropic', default_model: 'claude-opus-4-5', system_prompt: '', input_schema: {}, output_schema: {}, is_active: true, created_at: new Date().toISOString() },
];

const mockRecommendations: SystemRecommendation[] = [
  {
    id: 'r1', user_id: 'user1', project_id: 'p1', domain_id: '1',
    recommendation_type: 'story_insight', priority: 'high', status: 'open',
    title: 'Missing Midpoint Twist',
    body: "Citizen has strong character arcs but lacks a midpoint revelation. Consider a discovery that forces Arjun to question his core belief — this is where Act 2 should fracture.",
    source_context: { project_title: 'Citizen' }, created_at: new Date().toISOString(),
  },
  {
    id: 'r2', user_id: 'user1', project_id: 'p3',
    recommendation_type: 'positioning', priority: 'medium', status: 'open',
    title: 'Sharpen Hypnotic Positioning',
    body: "Hypnotic needs a clearer transformation narrative. Lead with what changes for the creator — not what the tool does. 'From idea to execution in hours' is stronger than listing features.",
    source_context: { project_title: 'Hypnotic' }, created_at: new Date().toISOString(),
  },
  {
    id: 'r3', user_id: 'user1', project_id: 'p6',
    recommendation_type: 'stall_alert', priority: 'low', status: 'open',
    title: 'Echoes of Silence — 45 Days Stalled',
    body: "This project hasn't moved in 45 days. Consider either resuming the character work or converting the core idea into a short film first to test the premise.",
    source_context: { project_title: 'Echoes of Silence' }, created_at: new Date().toISOString(),
  },
];

const mockNotifications: AppNotification[] = [
  { id: 'n1', type: 'info',    title: 'Scene 14 autosaved',     message: 'Your progress on Citizen has been saved.',           timestamp: new Date().toISOString(),                               read: false },
  { id: 'n2', type: 'success', title: 'Character created',       message: 'Arjun Mehra has been added to Citizen.',             timestamp: new Date(Date.now() - 3600000).toISOString(),           read: true  },
  { id: 'n3', type: 'warning', title: 'Echoes of Silence stalled', message: 'No activity in 45 days. Review recommended.',     timestamp: new Date(Date.now() - 86400000).toISOString(),          read: false },
];

const mockResumeItems: ResumeItem[] = [
  { id: 'res1', entity_type: 'script', entity_id: 'p1', title: 'Citizen — Scene 14',           description: 'Last edited: The confrontation dialogue',         last_edited_at: new Date(Date.now() - 2 * 86400000).toISOString(), resume_url: '/cinema/screenplay/p1/scene/14' },
  { id: 'res2', entity_type: 'deck',   entity_id: 'p5', title: 'Midnight Diner — Pitch Deck',  description: 'Last edited: Visual treatment slides',            last_edited_at: new Date(Date.now() - 3 * 86400000).toISOString(), resume_url: '/cinema/pitch/p5/deck' },
  { id: 'res3', entity_type: 'note',   entity_id: 'n1', title: 'Hypnotic Positioning Notes',   description: 'Last edited: Transformation narrative draft',     last_edited_at: new Date(Date.now() - 86400000).toISOString(),     resume_url: '/advertising/strategy/p3/notes' },
];

const mockFinanceEntries: FinanceEntry[] = [
  { id: 'fe1', user_id: 'user1', entry_type: 'income',  amount: 350000, currency: 'INR', category: 'Film Direction', description: 'Ad film direction fee — FMCG brand',    entry_date: '2025-03-01', created_at: new Date().toISOString() },
  { id: 'fe2', user_id: 'user1', entry_type: 'income',  amount: 120000, currency: 'INR', category: 'Consulting',     description: 'AI consulting retainer — March',        entry_date: '2025-03-05', created_at: new Date().toISOString() },
  { id: 'fe3', user_id: 'user1', entry_type: 'expense', amount: 45000,  currency: 'INR', category: 'Software',       description: 'AI tools and subscriptions',            entry_date: '2025-03-01', created_at: new Date().toISOString() },
  { id: 'fe4', user_id: 'user1', entry_type: 'expense', amount: 28000,  currency: 'INR', category: 'Equipment',      description: 'Studio equipment rental',               entry_date: '2025-03-10', created_at: new Date().toISOString() },
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
  financeEntries: FinanceEntry[];

  // UI State
  currentDomain: DomainSlug | null;
  currentStudio: string | null;
  currentProject: string | null;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  quickCaptureOpen: boolean;

  // User Actions
  setUser: (user: CreatorOSState['user']) => void;
  logout: () => void;

  // UI Actions
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

  // Finance Actions
  addFinanceEntry: (entry: Omit<FinanceEntry, 'id' | 'created_at'>) => void;

  // Notification Actions
  markNotificationRead: (id: string) => void;
  dismissAllNotifications: () => void;

  // Recommendation Actions
  dismissRecommendation: (id: string) => void;
  acceptRecommendation: (id: string) => void;

  // Selectors
  getProjectsByDomain: (domainId: string) => Project[];
  getActiveProjects: () => Project[];
  getStalledProjects: () => Project[];
  getFilmProjects: () => Project[];
  getCharactersByProject: (projectId: string) => Character[];
  getDomainStudios: (domainId: string) => Studio[];
  getTodayFocus: () => Task[];
  getUnreadNotifications: () => AppNotification[];
}

// ============================================
// STORE
// ============================================
export const useCreatorOSStore = create<CreatorOSState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: { id: 'user1', email: 'niddhish@lightseeker.com', name: 'Niddhish', avatar: undefined },
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
      financeEntries: mockFinanceEntries,

      currentDomain: null,
      currentStudio: null,
      currentProject: null,
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      quickCaptureOpen: false,

      // User Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // UI Actions
      setCurrentDomain: (domain) => set({ currentDomain: domain }),
      setCurrentStudio: (studio) => set({ currentStudio: studio }),
      setCurrentProject: (project) => set({ currentProject: project }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setQuickCaptureOpen: (open) => set({ quickCaptureOpen: open }),

      // Project Actions
      addProject: (project) => set((s) => ({
        projects: [...s.projects, {
          ...project, id: `p${Date.now()}`, user_id: 'user1',
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        } as Project],
      })),
      updateProject: (id, updates) => set((s) => ({
        projects: s.projects.map((p) => p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p),
      })),
      deleteProject: (id) => set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

      // Float Actions
      addFloat: (float) => set((s) => ({
        floats: [...s.floats, { ...float, id: `f${Date.now()}`, user_id: 'user1', created_at: new Date().toISOString() } as Float],
      })),
      updateFloat: (id, updates) => set((s) => ({
        floats: s.floats.map((f) => f.id === id ? { ...f, ...updates } : f),
      })),
      deleteFloat: (id) => set((s) => ({ floats: s.floats.filter((f) => f.id !== id) })),
      connectFloatToProject: (floatId, projectId) => set((s) => ({
        floats: s.floats.map((f) => f.id === floatId ? { ...f, connected_project_id: projectId } : f),
      })),

      // Task Actions
      addTask: (task) => set((s) => ({
        tasks: [...s.tasks, {
          ...task, id: `t${Date.now()}`, user_id: 'user1',
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        } as Task],
      })),
      updateTask: (id, updates) => set((s) => ({
        tasks: s.tasks.map((t) => t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t),
      })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      // Character Actions
      addCharacter: (character) => set((s) => ({
        characters: [...s.characters, {
          ...character, id: `c${Date.now()}`,
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        } as Character],
      })),
      updateCharacter: (id, updates) => set((s) => ({
        characters: s.characters.map((c) => c.id === id ? { ...c, ...updates, updated_at: new Date().toISOString() } : c),
      })),
      deleteCharacter: (id) => set((s) => ({ characters: s.characters.filter((c) => c.id !== id) })),

      // Finance Actions
      addFinanceEntry: (entry) => set((s) => ({
        financeEntries: [...s.financeEntries, {
          ...entry, id: `fe${Date.now()}`, created_at: new Date().toISOString(),
        } as FinanceEntry],
      })),

      // Notification Actions
      markNotificationRead: (id) => set((s) => ({
        notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
      })),
      dismissAllNotifications: () => set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, read: true })),
      })),

      // Recommendation Actions
      dismissRecommendation: (id) => set((s) => ({
        recommendations: s.recommendations.map((r) => r.id === id ? { ...r, status: 'dismissed' as const } : r),
      })),
      acceptRecommendation: (id) => set((s) => ({
        recommendations: s.recommendations.map((r) => r.id === id ? { ...r, status: 'done' as const } : r),
      })),

      // Selectors
      getProjectsByDomain: (domainId) => get().projects.filter((p) => p.domain_id === domainId),
      getActiveProjects: () => get().projects.filter((p) => p.status === 'active'),
      getStalledProjects: () => get().projects.filter((p) => p.status === 'stalled'),
      getFilmProjects: () => {
        const cinema = get().domains.find((d) => d.slug === 'cinema');
        return cinema ? get().projects.filter((p) => p.domain_id === cinema.id) : [];
      },
      getCharactersByProject: (projectId) => get().characters.filter((c) => c.project_id === projectId),
      getDomainStudios: (domainId) => get().studios.filter((s) => s.domain_id === domainId),
      getTodayFocus: () => get().tasks.filter((t) => t.priority === 'high' && t.status !== 'done').slice(0, 3),
      getUnreadNotifications: () => get().notifications.filter((n) => !n.read),
    }),
    {
      name: 'creatoros-v2',          // version bump clears stale localStorage from old schema
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        sidebarCollapsed: s.sidebarCollapsed,
      }),
    }
  )
);
