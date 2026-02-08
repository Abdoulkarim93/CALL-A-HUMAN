
export enum AppView {
  LANDING = 'LANDING',
  CONCIERGE = 'CONCIERGE',
  DASHBOARD = 'DASHBOARD',
  PROVIDER_SIGNUP = 'PROVIDER_SIGNUP',
  USER_SIGNUP = 'USER_SIGNUP',
  ADMIN = 'ADMIN',
  CONTRACTS = 'CONTRACTS',
  PROFILE = 'PROFILE',
  DIRECT_CHAT = 'DIRECT_CHAT',
  SUPPORT_TICKETS = 'SUPPORT_TICKETS'
}

export type Language = 'EN' | 'FR' | 'TR';

export type PaymentType = 'Fixed Rate' | 'Hourly' | 'Per Unit' | 'Retainer' | 'Milestone-based';

export interface PaymentPlan {
  type: PaymentType;
  rate: string;
  justification: string;
}

export interface AnthroIntent {
  serviceType: string;
  urgency: 'Low' | 'Medium' | 'High';
  estimatedManHours: number;
  requiredHumanSkills: string[];
  suggestedPaymentModel: PaymentType;
}

export interface ServiceTier {
  name: 'Budget' | 'Standard' | 'Elite';
  price: number;
  paymentPlan: PaymentPlan;
  providerLevel: string;
  humanValueProp: string;
  estimatedArrival: string;
  isNegotiated?: boolean;
}

export interface ParsedJobNeed {
  id: string;
  message: string;
  choices?: string[];
  summary: string;
  intent: AnthroIntent;
  tasks: string[];
  strategy: string;
  tiers: ServiceTier[];
  currencySymbol: string; 
  fairPriceLogic: string;
  isFinalOffer?: boolean;
  isReadyToQuote: boolean;
  status: 'PENDING' | 'MATCHING' | 'HIRED' | 'COMPLETED';
  isRequestFeePaid?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  jobData?: ParsedJobNeed;
  isNegotiationStep?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: 'Requester' | 'Provider' | 'Admin';
  walletBalance: number;
  isSubscribed: boolean;
  hasFreeCreditClaimed: boolean;
  skills: string[];
  rating: number;
  feedbackCount: number;
  nextPaymentDue?: number; 
  requestHistory?: string[];
}

export type ContractStatus = 'PENDING_ACCEPTANCE' | 'ACTIVE' | 'DISPUTED' | 'RELEASED';

export interface Contract {
  id: string;
  jobId: string;
  requesterId: string;
  providerId: string;
  tierName: string;
  partnerName: string;
  price: number;
  commissionDue: number;
  status: ContractStatus;
  createdAt: number;
}

export type TicketStatus = 'OPEN' | 'PAYMENT_PENDING' | 'IN_REVIEW' | 'RESOLVED_PAID' | 'CLOSED';

export interface SupportTicket {
  id: string;
  type: 'DISPUTE' | 'PAYMENT_VERIFICATION';
  contractId?: string;
  jobId?: string;
  userId: string;
  userName: string;
  reason: string;
  status: TicketStatus;
  createdAt: number;
  amount?: number;
}
