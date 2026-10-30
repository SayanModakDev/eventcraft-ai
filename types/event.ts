export type Currency = 'INR' | 'USD' | 'EUR';

export interface EventIntakeData {
  eventType: string;
  eventTitle: string;
  guestCount: number;
  totalBudget: number;
  currency: Currency;
  vibe: string;
  locationOrVenue: string;
  specialRequirements: string;
}

export interface BudgetCategory {
  category: string;
  percentage: number;
  estimated_cost: number;
  cost_saving_tip: string;
}

export interface TimelineTask {
  task_name: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  completed?: boolean;
}

export interface TimelineMilestone {
  phase: string;
  tasks: TimelineTask[];
}

export interface VendorChecklist {
  vendor_type: string;
  suggested_deliverables: string[];
  negotiation_questions: string[];
  red_flags_to_avoid: string[];
}

export interface PersonalizedIdeas {
  decor_concept: string;
  signature_activity: string;
  curated_playlist_vibe: string;
  invitation_copy: string;
}

export interface DietaryRequirement {
  category: string;
  estimated_percentage: number;
  recommended_substitutions: string;
  chef_note: string;
}

export interface DayOfScheduleItem {
  time: string;
  activity: string;
  lead_coordinator_or_vendor: string;
  logistical_cue: string;
}

export interface LogisticsAndContingency {
  seating_and_floorplan_advice: string;
  weather_contingency_plan: string;
  emergency_kit_essentials: string[];
}

export interface EventPlan {
  event_title: string;
  theme_tagline: string;
  audience_profile: string;
  total_budget: number;
  currency: Currency | string;
  budget_breakdown: BudgetCategory[];
  timeline_milestones: TimelineMilestone[];
  vendor_checklists: VendorChecklist[];
  personalized_ideas: PersonalizedIdeas;
  dietary_breakdown?: DietaryRequirement[];
  day_of_schedule?: DayOfScheduleItem[];
  logistics_contingency?: LogisticsAndContingency;
  created_at?: string;
  guest_count?: number;
  location?: string;
  eventType?: string;
}

export interface RefineRequest {
  currentPlan?: EventPlan;
  userRequest: string;
}

export interface RefineResponse {
  answer: string;
  model_used: string;
  is_live: boolean;
  suggestedPlanUpdate?: Partial<EventPlan>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedPlanUpdate?: Partial<EventPlan>;
}
