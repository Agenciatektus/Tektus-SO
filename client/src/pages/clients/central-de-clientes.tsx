// ✅ Estrutura base para as páginas da Central de Clientes
// Caminho sugerido: client/src/pages/clients/

// 1. Calendário de Reuniões (Meeting Calendar)
export function MeetingCalendar() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendário de Reuniões</h1>
      <p>Integração com Google Calendar em breve.</p>
    </div>
  );
}

// 2. Controle de Clientes
export function ClientControl() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Central de Clientes</h1>
      <p>Lista com status, health score, mensalidade e mais.</p>
    </div>
  );
}

// 3. Dashboards de Clientes
export function ClientDashboards() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboards dos Clientes</h1>
      <p>Acesse os workspaces de cada cliente individualmente.</p>
    </div>
  );
}

// 4. NPS Tracker
export function NPSTracker() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Acompanhamento de NPS</h1>
      <p>Monitoramento da satisfação dos clientes com feedbacks.</p>
    </div>
  );
}

// 5. Onboarding Pipelines
export function OnboardingPipelines() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pipelines de Onboarding</h1>
      <p>Fluxos para novos clientes.</p>
    </div>
  );
}

// 6. Gestão de Crises
export function CrisisManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestão de Crises</h1>
      <p>Visualização Kanban para lidar com situações críticas.</p>
    </div>
  );
}

// 7. Offboarding e Churn
export function OffboardingChurn() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offboarding & Churn</h1>
      <p>Gestão de saída e base de churn.</p>
    </div>
  );
}
