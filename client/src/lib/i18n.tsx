// Internationalization configuration for English and Portuguese (Brazilian)
export type Language = 'en' | 'pt-BR';

export interface Translations {
  // Navigation & Header
  dashboard: string;
  clients: string;
  crm: string;
  tasks: string;
  finance: string;
  content: string;
  automation: string;
  onboarding: string;
  offboarding: string;
  settings: string;
  logout: string;
  
  // Dashboard
  totalRevenue: string;
  activeClients: string;
  tasksCompleted: string;
  teamUtilization: string;
  recentTasks: string;
  upcomingTasks: string;
  clientHealth: string;
  revenueGrowth: string;
  
  // Status labels
  healthy: string;
  atRisk: string;
  critical: string;
  pending: string;
  inProgress: string;
  completed: string;
  
  // Common actions
  create: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  view: string;
  
  // CRM & Sales
  salesPipeline: string;
  leads: string;
  deals: string;
  newLead: string;
  contactMade: string;
  meetingScheduled: string;
  proposalSent: string;
  negotiation: string;
  won: string;
  lost: string;
  
  // Legal
  contracts: string;
  legalCases: string;
  activeContracts: string;
  pendingReview: string;
  
  // HR
  team: string;
  salaryLadder: string;
  teamOnboarding: string;
  teamOffboarding: string;
  
  // OKRs
  objectives: string;
  keyResults: string;
  quarterly: string;
  
  // Automation
  automationRules: string;
  triggers: string;
  actions: string;
}

export const translations: Record<Language, Translations> = {
  'en': {
    // Navigation & Header
    dashboard: 'Dashboard',
    clients: 'Clients',
    crm: 'CRM',
    tasks: 'Tasks',
    finance: 'Finance',
    content: 'Content',
    automation: 'Automation',
    onboarding: 'Onboarding',
    offboarding: 'Offboarding',
    settings: 'Settings',
    logout: 'Logout',
    
    // Dashboard
    totalRevenue: 'Total Revenue',
    activeClients: 'Active Clients',
    tasksCompleted: 'Tasks Completed',
    teamUtilization: 'Team Utilization',
    recentTasks: 'Recent Tasks',
    upcomingTasks: 'Upcoming Tasks',
    clientHealth: 'Client Health',
    revenueGrowth: 'Revenue Growth',
    
    // Status labels
    healthy: 'Healthy',
    atRisk: 'At Risk',
    critical: 'Critical',
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    
    // Common actions
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    view: 'View',
    
    // CRM & Sales
    salesPipeline: 'Sales Pipeline',
    leads: 'Leads',
    deals: 'Deals',
    newLead: 'New Lead',
    contactMade: 'Contact Made',
    meetingScheduled: 'Meeting Scheduled',
    proposalSent: 'Proposal Sent',
    negotiation: 'Negotiation',
    won: 'Won',
    lost: 'Lost',
    
    // Legal
    contracts: 'Contracts',
    legalCases: 'Legal Cases',
    activeContracts: 'Active Contracts',
    pendingReview: 'Pending Review',
    
    // HR
    team: 'Team',
    salaryLadder: 'Salary Ladder',
    teamOnboarding: 'Team Onboarding',
    teamOffboarding: 'Team Offboarding',
    
    // OKRs
    objectives: 'Objectives',
    keyResults: 'Key Results',
    quarterly: 'Quarterly',
    
    // Automation
    automationRules: 'Automation Rules',
    triggers: 'Triggers',
    actions: 'Actions',
  },
  'pt-BR': {
    // Navigation & Header
    dashboard: 'Dashboard',
    clients: 'Clientes',
    crm: 'CRM',
    tasks: 'Tarefas',
    finance: 'Financeiro',
    content: 'Conteúdo',
    automation: 'Automação',
    onboarding: 'Onboarding',
    offboarding: 'Offboarding',
    settings: 'Configurações',
    logout: 'Sair',
    
    // Dashboard
    totalRevenue: 'Receita Total',
    activeClients: 'Clientes Ativos',
    tasksCompleted: 'Tarefas Concluídas',
    teamUtilization: 'Utilização da Equipe',
    recentTasks: 'Tarefas Recentes',
    upcomingTasks: 'Próximas Tarefas',
    clientHealth: 'Saúde dos Clientes',
    revenueGrowth: 'Crescimento da Receita',
    
    // Status labels
    healthy: 'Saudável',
    atRisk: 'Em Risco',
    critical: 'Crítico',
    pending: 'Pendente',
    inProgress: 'Em Andamento',
    completed: 'Concluído',
    
    // Common actions
    create: 'Criar',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    view: 'Visualizar',
    
    // CRM & Sales
    salesPipeline: 'Pipeline de Vendas',
    leads: 'Leads',
    deals: 'Negócios',
    newLead: 'Novo Lead',
    contactMade: 'Contato Realizado',
    meetingScheduled: 'Reunião Agendada',
    proposalSent: 'Proposta Enviada',
    negotiation: 'Negociação',
    won: 'Ganho',
    lost: 'Perdido',
    
    // Legal
    contracts: 'Contratos',
    legalCases: 'Casos Jurídicos',
    activeContracts: 'Contratos Ativos',
    pendingReview: 'Revisão Pendente',
    
    // HR
    team: 'Equipe',
    salaryLadder: 'Escala Salarial',
    teamOnboarding: 'Onboarding da Equipe',
    teamOffboarding: 'Offboarding da Equipe',
    
    // OKRs
    objectives: 'Objetivos',
    keyResults: 'Resultados-Chave',
    quarterly: 'Trimestral',
    
    // Automation
    automationRules: 'Regras de Automação',
    triggers: 'Gatilhos',
    actions: 'Ações',
  }
};

// Language context and hook
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}