// ============================================
// CreatorOS Type Definitions
// Based on creatoros_mvp_schema.sql and detailed specifications
// ============================================

// ============================================
// CORE USER TYPES
// ============================================
export interface UserProfile {
  id: string;
  user_id: string;
  timezone: string;
  country?: string;
  primary_role?: string;
  bio?: string;
  brand_voice_notes?: string;
  creative_preferences: Record<string, any>;
  working_preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  profile?: UserProfile;
}

// ============================================
// DOMAIN & STUDIO TYPES
// ============================================
export interface Domain {
  id: string;
  slug: DomainSlug;
  name: string;
  description?: string;
  icon?: string;
  sort_order: number;
  created_at: string;
}

export type DomainSlug = 
  | 'cinema' 
  | 'advertising' 
  | 'pr' 
  | 'author' 
  | 'personal_branding' 
  | 'psychology' 
  | 'life' 
  | 'business';

export interface Studio {
  id: string;
  domain_id: string;
  slug: string;
  name: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

// ============================================
// PROJECT TYPES
// ============================================
export type ProjectStatus = 'idea' | 'active' | 'paused' | 'stalled' | 'archived' | 'completed';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  user_id: string;
  domain_id: string;
  studio_id?: string;
  title: string;
  slug?: string;
  description?: string;
  project_type?: string;
  status: ProjectStatus;
  stage?: string;
  priority: ProjectPriority;
  visibility: 'private' | 'shared';
  health_score?: number;
  started_at?: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  domain?: Domain;
  studio?: Studio;
  progress?: number;
  next_action?: string;
}

export interface ProjectStage {
  id: string;
  project_id: string;
  stage_key: string;
  stage_name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  started_at?: string;
  completed_at?: string;
  notes?: string;
  created_at: string;
}

export interface ProjectLink {
  id: string;
  source_project_id: string;
  target_project_id: string;
  relationship_type: string;
  notes?: string;
  created_at: string;
}

// ============================================
// NOTES & TASKS
// ============================================
export interface Note {
  id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  title?: string;
  content: string;
  note_type?: string;
  source?: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

export interface Task {
  id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  title: string;
  description?: string;
  task_type?: string;
  priority: ProjectPriority;
  status: TaskStatus;
  due_date?: string;
  suggested_by_ai: boolean;
  source_context: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// ============================================
// FILES & CHUNKS
// ============================================
export interface FileItem {
  id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  file_name: string;
  file_type?: string;
  mime_type?: string;
  storage_path: string;
  file_size?: number;
  source_type?: string;
  uploaded_at: string;
  created_at: string;
}

export interface FileChunk {
  id: string;
  file_id: string;
  chunk_index: number;
  content: string;
  token_count?: number;
  metadata: Record<string, any>;
  embedding?: number[];
  created_at: string;
}

// ============================================
// AI AGENTS & WORKFLOWS
// ============================================
export interface Agent {
  id: string;
  domain_id?: string;
  studio_id?: string;
  name: string;
  slug: string;
  description?: string;
  agent_type?: string;
  model_provider?: string;
  default_model?: string;
  system_prompt?: string;
  input_schema: Record<string, any>;
  output_schema: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export type AgentRunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface AgentRun {
  id: string;
  agent_id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  studio_id?: string;
  status: AgentRunStatus;
  input_payload: Record<string, any>;
  output_payload: Record<string, any>;
  summary?: string;
  tokens_input?: number;
  tokens_output?: number;
  cost_estimate?: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface WorkflowTemplate {
  id: string;
  domain_id?: string;
  studio_id?: string;
  name: string;
  slug: string;
  description?: string;
  workflow_definition: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export interface WorkflowRun {
  id: string;
  workflow_template_id: string;
  user_id: string;
  project_id?: string;
  status: AgentRunStatus;
  current_step?: string;
  context_snapshot: Record<string, any>;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

// ============================================
// ARTIFACTS
// ============================================
export interface Artifact {
  id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  studio_id?: string;
  artifact_type: string;
  title: string;
  content?: string;
  structured_content: Record<string, any>;
  version_number: number;
  status: 'draft' | 'review' | 'approved' | 'archived';
  created_by_run_id?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// ACTIVITY & RECOMMENDATIONS
// ============================================
export interface ActivityLog {
  id: string;
  user_id: string;
  domain_id?: string;
  project_id?: string;
  activity_type: string;
  entity_type?: string;
  entity_id?: string;
  summary?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface SystemRecommendation {
  id: string;
  user_id: string;
  project_id?: string;
  domain_id?: string;
  recommendation_type?: string;
  title: string;
  body?: string;
  priority: ProjectPriority;
  status: 'open' | 'dismissed' | 'done';
  source_context: Record<string, any>;
  created_at: string;
}

// ============================================
// CINEMA DOMAIN TYPES
// ============================================
export interface ScreenplayProject {
  id: string;
  project_id: string;
  logline?: string;
  genre?: string;
  tone?: string;
  market?: string;
  structure_model?: string;
  current_draft_number: number;
}

export interface Character {
  id: string;
  project_id: string;
  name: string;
  role_type?: string;
  fear?: string;
  ambition?: string;
  talent?: string;
  virtue?: string;
  courage?: string;
  worldview?: string;
  internal_struggle?: string;
  arc_summary?: string;
  archetypes: string[];
  questionnaire: Record<string, any>;
  album_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Scene {
  id: string;
  project_id: string;
  scene_number: number;
  act_number?: number;
  heading?: string;
  summary?: string;
  objective?: string;
  conflict?: string;
  stakes?: string;
  characters_in_scene: string[];
  dialogue_notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Float for capturing raw ideas
export interface Float {
  id: string;
  user_id: string;
  content: string;
  title?: string;
  float_type?: 'idea' | 'image' | 'scene' | 'character' | 'dialogue' | 'theme' | 'contradiction';
  emotional_hook?: string;
  story_promise?: string;
  possible_genres?: string[];
  protagonist_seed?: string;
  market_positioning?: string;
  recommended_next_step?: string;
  connected_project_id?: string;
  created_at: string;
}

// ============================================
// ADVERTISING DOMAIN TYPES
// ============================================
export interface BrandProject {
  id: string;
  project_id: string;
  brand_name: string;
  industry?: string;
  campaign_objective?: string;
  audience_primary?: string;
  audience_secondary?: string;
  brand_archetype?: string;
  problem_statement?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignIdea {
  id: string;
  project_id: string;
  title: string;
  core_insight?: string;
  strategic_narrative?: string;
  idea_summary?: string;
  fame_score?: number;
  feasibility_score?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// BUSINESS DOMAIN TYPES
// ============================================
export interface Venture {
  id: string;
  project_id: string;
  venture_name: string;
  venture_type?: string;
  stage?: string;
  mission?: string;
  offering?: string;
  target_customer?: string;
  revenue_model?: string;
  positioning?: string;
  next_milestone?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessPlan {
  id: string;
  venture_id: string;
  title: string;
  executive_summary?: string;
  problem?: string;
  solution?: string;
  market_analysis?: string;
  business_model?: string;
  go_to_market?: string;
  financials?: string;
  funding_ask?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// AUTHOR DOMAIN TYPES
// ============================================
export interface BookProject {
  id: string;
  project_id: string;
  book_type?: string;
  thesis?: string;
  reader_promise?: string;
  target_reader?: string;
  category?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  project_id: string;
  chapter_number: number;
  title: string;
  chapter_goal?: string;
  outline?: string;
  draft_content?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// PERSONAL BRANDING DOMAIN TYPES
// ============================================
export interface ContentItem {
  id: string;
  project_id?: string;
  source_project_id?: string;
  platform?: string;
  content_type?: string;
  title?: string;
  caption?: string;
  body?: string;
  status: string;
  scheduled_for?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// PSYCHOLOGY DOMAIN TYPES
// ============================================
export interface Reflection {
  id: string;
  user_id: string;
  title?: string;
  reflection_text: string;
  insights: string[];
  mood?: string;
  created_at: string;
}

// ============================================
// LIFE DOMAIN TYPES
// ============================================
export interface FinanceEntry {
  id: string;
  user_id: string;
  entry_type: string;
  amount: number;
  currency: string;
  category?: string;
  description?: string;
  entry_date: string;
  created_at: string;
}

// ============================================
// DASHBOARD TYPES
// ============================================
export interface DashboardSection {
  id: string;
  title: string;
  type: 'projects' | 'films' | 'pitches' | 'stalled' | 'resume' | 'ai_suggestions' | 'capture' | 'focus' | 'personal' | 'venture';
  items: DashboardItem[];
}

export interface DashboardItem {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  progress?: number;
  last_activity?: string;
  next_action?: string;
  domain?: DomainSlug;
  project_id?: string;
  action_label?: string;
  action_url?: string;
}

export interface ResumeItem {
  id: string;
  entity_type: 'script' | 'deck' | 'note' | 'campaign' | 'chapter';
  entity_id: string;
  title: string;
  description: string;
  last_edited_at: string;
  resume_url: string;
}

// ============================================
// UI TYPES
// ============================================
export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  module: string;
  badge?: number;
  children?: NavItem[];
}

// ============================================
// SCREENPLAY WORKFLOW TYPES
// ============================================
export type ScreenplayStage = 
  | 'float'
  | 'story_kernel'
  | 'universal_structure'
  | 'characters'
  | 'character_album'
  | 'archetype_layer'
  | 'story_circle'
  | 'story_rules'
  | 'shape_of_story'
  | 'beat_sheet'
  | 'step_outline'
  | 'scene_builder'
  | 'dialogue'
  | 'world_building'
  | 'style_craft'
  | 'final_bundling';

export interface StoryKernel {
  what_story_about: string;
  why_emotionally_matters: string;
  why_now: string;
  why_this_protagonist: string;
  why_this_conflict: string;
}

export interface CharacterFramework {
  fear: string;
  ambition: string;
  talent: string;
  virtue: string;
  courage: string;
  worldview: string;
  who_is_character: string;
  what_do_they_do: string;
  why_do_they_do_it: string;
  core_identity: string;
  internal_struggle: string;
  universal_struggle: string;
  unexpected_behavior: string;
  decisive_actions: string;
}

export interface BeatSheetBeat {
  number: number;
  name: string;
  description: string;
  emotional_function: string;
}

// ============================================
// PITCH STUDIO TYPES
// ============================================
export interface PitchPackage {
  id: string;
  project_id: string;
  one_liner?: string;
  short_synopsis?: string;
  long_synopsis?: string;
  emotional_hook_line?: string;
  deck_slides?: PitchDeckSlide[];
  signature_shots?: string[];
  color_script?: string;
  lighting_philosophy?: string;
  visual_motifs?: string[];
  camera_language?: string;
  production_design_anchors?: string;
  midjourney_prompts?: string[];
  trailer_concept?: string;
  trailer_script?: string;
  poster_hook_lines?: string[];
  box_office_estimate?: BoxOfficeEstimate;
}

export interface PitchDeckSlide {
  slide_number: number;
  title: string;
  content: string;
  visual_notes?: string;
}

export interface BoxOfficeEstimate {
  opening_weekend_inr?: string;
  total_domestic_inr?: string;
  international_potential: 'High' | 'Medium' | 'Low';
  key_demographics: string[];
  optimal_release_window: string;
  viability_score: number;
  revenue_optimization: string[];
  risks: string[];
  success_factors: string[];
}
