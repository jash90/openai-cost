export interface UsageData {
  model: string;
  cost: number;
  tokens: number;
  timestamp: string;
  project_id?: string | null;
}

export interface ModelUsage {
  model: string;
  totalCost: number;
  totalTokens: number;
}

export interface ProjectUsage {
  project_id: string | null;
  name: string; // Friendly name (or project_id if no name is available)
  totalCost: number;
  totalTokens: number;
}

export interface UsageResponse {
  totalCost: number;
  modelUsage: ModelUsage[];
  projectUsage: ProjectUsage[];
  dailyUsage: UsageData[];
}

// Updated types for OpenAI organization costs API
export interface CostAmount {
  value: number;
  currency: string;
}

export interface CostResult {
  object: string;
  amount: CostAmount;
  line_item: string | null;
  project_id: string | null;
  organization_id: string;
}

export interface CostBucket {
  object: string;
  start_time: number;
  end_time: number;
  results: CostResult[];
}

export interface CostsResponse {
  object: string;
  has_more: boolean;
  next_page?: string;
  data: CostBucket[];
}

// API pricing data
export interface ModelPricing {
  name: string;
  input_per_1M_tokens: number;
  output_per_1M_tokens: number;
}

export interface ToolPricing {
  name: string;
  cost: number;
  unit: string;
}

export interface PricingData {
  models: ModelPricing[];
  tools: ToolPricing[];
}