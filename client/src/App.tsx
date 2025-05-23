import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout";

// Páginas principais
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";

// Central de Tarefas
import CentralTarefas from "@/pages/central-tarefas";
import PainelDesempenhoTarefas from "@/pages/central-tarefas/painel-desempenho";
import Tarefas from "@/pages/central-tarefas/tarefas";

// Central de Clientes
import CentralClientes from "@/pages/central-clientes";
import AgendaReunioes from "@/pages/central-clientes/agenda-reunioes";
import ControleClientes from "@/pages/central-clientes/controle-clientes";
import DashboardClientes from "@/pages/central-clientes/dashboard-clientes";
import NPSTracker from "@/pages/central-clientes/nps-tracker";
import OnboardingClientes from "@/pages/central-clientes/onboarding";
import GestaoCrise from "@/pages/central-clientes/gestao-crise";
import OffboardingChurn from "@/pages/central-clientes/offboarding-churn";

// Central de Conteúdo
import CentralConteudo from "@/pages/central-conteudo";
import PainelDesempenhoSocial from "@/pages/central-conteudo/painel-desempenho";
import DocumentosSocial from "@/pages/central-conteudo/documentos";
import PipelineConteudo from "@/pages/central-conteudo/pipeline";
import CalendarioPublicacao from "@/pages/central-conteudo/calendario";
import TarefasConteudo from "@/pages/central-conteudo/tarefas";

// Central do Tráfego
import CentralTrafego from "@/pages/central-trafego";
import PainelDesempenhoTrafego from "@/pages/central-trafego/painel-desempenho";
import GestaoAnunciosMeta from "@/pages/central-trafego/gestao-anuncios-meta";
import GestaoAnunciosGoogle from "@/pages/central-trafego/gestao-anuncios-google";
import TarefasTrafego from "@/pages/central-trafego/tarefas";
import MetricasTintim from "@/pages/central-trafego/metricas-tintim";

// Vendas
import Vendas from "@/pages/vendas";
import PainelDesempenhoVendas from "@/pages/vendas/painel-desempenho";
import CRM from "@/pages/vendas/crm";
import AgendaComercial from "@/pages/vendas/agenda-comercial";
import DocumentosVenda from "@/pages/vendas/documentos";
import CasesSucesso from "@/pages/vendas/cases";
import MetasComercial from "@/pages/vendas/metas";
import ServicosPlanos from "@/pages/vendas/servicos-planos";
import AcompanhamentoFunil from "@/pages/vendas/acompanhamento-funil";

// Criação de Sites
import CriacaoSites from "@/pages/criacao-sites";
import ProjetosAtivos from "@/pages/criacao-sites/projetos-ativos";
import ProjetosFinalizados from "@/pages/criacao-sites/projetos-finalizados";
import ReferenciasWeb from "@/pages/criacao-sites/referencias";
import PluginsFerramentas from "@/pages/criacao-sites/plugins";
import OnboardingSites from "@/pages/criacao-sites/onboarding";
import OnboardingEcommerce from "@/pages/criacao-sites/onboarding-ecommerce";
import PainelDesempenhoSites from "@/pages/criacao-sites/painel-desempenho";

// Marketing Agência
import MarketingAgencia from "@/pages/marketing-agencia";
import PainelDesempenhoMarketing from "@/pages/marketing-agencia/painel-desempenho";
import GestaoAnunciosMetaMarketing from "@/pages/marketing-agencia/gestao-anuncios-meta";
import GestaoAnunciosGoogleMarketing from "@/pages/marketing-agencia/gestao-anuncios-google";
import MetricasTintimMarketing from "@/pages/marketing-agencia/metricas-tintim";
import CaixaEmail from "@/pages/marketing-agencia/caixa-email";
import EmailMarketing from "@/pages/marketing-agencia/email-marketing";

// OKRs Tracker
import OKRsTracker from "@/pages/okrs-tracker";

// RH
import RH from "@/pages/rh";
import Equipe from "@/pages/rh/equipe";
import BancoTalentos from "@/pages/rh/banco-talentos";
import CentralVagas from "@/pages/rh/central-vagas";
import TrilhaSalarial from "@/pages/rh/trilha-salarial";
import RegrasConduta from "@/pages/rh/regras-conduta";
import OnboardingEstrategico from "@/pages/rh/onboarding-estrategico";
import OnboardingBurocratico from "@/pages/rh/onboarding-burocratico";
import OffboardingTime from "@/pages/rh/offboarding";

// Administração
import Administracao from "@/pages/administracao";
import Documentos from "@/pages/administracao/documentos";
import Organograma from "@/pages/administracao/organograma";
import Parceiros from "@/pages/administracao/parceiros";
import IdentidadeMarca from "@/pages/administracao/identidade-marca";
import LinksFerramentas from "@/pages/administracao/links-ferramentas";
import Automacoes from "@/pages/administracao/automacoes";
import Integracoes from "@/pages/administracao/integracoes";

// Jurídico
import Juridico from "@/pages/juridico";
import ContratosClientes from "@/pages/juridico/contratos-clientes";
import ContratosFuncionarios from "@/pages/juridico/contratos-funcionarios";
import TemplatesContrato from "@/pages/juridico/templates";
import TermosUso from "@/pages/juridico/termos-uso";
import PoliticaPrivacidade from "@/pages/juridico/politica-privacidade";

// Financeiro
import Financeiro from "@/pages/financeiro";
import BotoesAcaoRapida from "@/pages/financeiro/botoes-acao-rapida";
import MenuFinanceiro from "@/pages/financeiro/menu";
import Databases from "@/pages/financeiro/databases";
import BalancoTrimestral from "@/pages/financeiro/balanco-trimestral";
import CobrancasProximas from "@/pages/financeiro/cobrancas-proximas";
import GraficosRosca from "@/pages/financeiro/graficos-rosca";

function Router() {
  return (
    <Layout>
      <Switch>
        {/* Rotas principais */}
        <ProtectedRoute path="/" component={Dashboard} />
        <Route path="/auth" component={AuthPage} />

        {/* Central de Tarefas */}
        <ProtectedRoute path="/central-tarefas" component={CentralTarefas} />
        <ProtectedRoute path="/central-tarefas/painel-desempenho" component={PainelDesempenhoTarefas} />
        <ProtectedRoute path="/central-tarefas/tarefas" component={Tarefas} />

        {/* Central de Clientes */}
        <ProtectedRoute path="/central-clientes" component={CentralClientes} />
        <ProtectedRoute path="/central-clientes/agenda-reunioes" component={AgendaReunioes} />
        <ProtectedRoute path="/central-clientes/controle-clientes" component={ControleClientes} />
        <ProtectedRoute path="/central-clientes/dashboard-clientes" component={DashboardClientes} />
        <ProtectedRoute path="/central-clientes/nps-tracker" component={NPSTracker} />
        <ProtectedRoute path="/central-clientes/onboarding" component={OnboardingClientes} />
        <ProtectedRoute path="/central-clientes/gestao-crise" component={GestaoCrise} />
        <ProtectedRoute path="/central-clientes/offboarding-churn" component={OffboardingChurn} />

        {/* Central de Conteúdo */}
        <ProtectedRoute path="/central-conteudo" component={CentralConteudo} />
        <ProtectedRoute path="/central-conteudo/painel-desempenho" component={PainelDesempenhoSocial} />
        <ProtectedRoute path="/central-conteudo/documentos" component={DocumentosSocial} />
        <ProtectedRoute path="/central-conteudo/pipeline" component={PipelineConteudo} />
        <ProtectedRoute path="/central-conteudo/calendario" component={CalendarioPublicacao} />
        <ProtectedRoute path="/central-conteudo/tarefas" component={TarefasConteudo} />

        {/* Central do Tráfego */}
        <ProtectedRoute path="/central-trafego" component={CentralTrafego} />
        <ProtectedRoute path="/central-trafego/painel-desempenho" component={PainelDesempenhoTrafego} />
        <ProtectedRoute path="/central-trafego/gestao-anuncios-meta" component={GestaoAnunciosMeta} />
        <ProtectedRoute path="/central-trafego/gestao-anuncios-google" component={GestaoAnunciosGoogle} />
        <ProtectedRoute path="/central-trafego/tarefas" component={TarefasTrafego} />
        <ProtectedRoute path="/central-trafego/metricas-tintim" component={MetricasTintim} />

        {/* Vendas */}
        <ProtectedRoute path="/vendas" component={Vendas} />
        <ProtectedRoute path="/vendas/painel-desempenho" component={PainelDesempenhoVendas} />
        <ProtectedRoute path="/vendas/crm" component={CRM} />
        <ProtectedRoute path="/vendas/agenda-comercial" component={AgendaComercial} />
        <ProtectedRoute path="/vendas/documentos" component={DocumentosVenda} />
        <ProtectedRoute path="/vendas/cases" component={CasesSucesso} />
        <ProtectedRoute path="/vendas/metas" component={MetasComercial} />
        <ProtectedRoute path="/vendas/servicos-planos" component={ServicosPlanos} />
        <ProtectedRoute path="/vendas/acompanhamento-funil" component={AcompanhamentoFunil} />

        {/* Criação de Sites */}
        <ProtectedRoute path="/criacao-sites" component={CriacaoSites} />
        <ProtectedRoute path="/criacao-sites/projetos-ativos" component={ProjetosAtivos} />
        <ProtectedRoute path="/criacao-sites/projetos-finalizados" component={ProjetosFinalizados} />
        <ProtectedRoute path="/criacao-sites/referencias" component={ReferenciasWeb} />
        <ProtectedRoute path="/criacao-sites/plugins" component={PluginsFerramentas} />
        <ProtectedRoute path="/criacao-sites/onboarding" component={OnboardingSites} />
        <ProtectedRoute path="/criacao-sites/onboarding-ecommerce" component={OnboardingEcommerce} />
        <ProtectedRoute path="/criacao-sites/painel-desempenho" component={PainelDesempenhoSites} />

        {/* Marketing Agência */}
        <ProtectedRoute path="/marketing-agencia" component={MarketingAgencia} />
        <ProtectedRoute path="/marketing-agencia/painel-desempenho" component={PainelDesempenhoMarketing} />
        <ProtectedRoute path="/marketing-agencia/gestao-anuncios-meta" component={GestaoAnunciosMetaMarketing} />
        <ProtectedRoute path="/marketing-agencia/gestao-anuncios-google" component={GestaoAnunciosGoogleMarketing} />
        <ProtectedRoute path="/marketing-agencia/metricas-tintim" component={MetricasTintimMarketing} />
        <ProtectedRoute path="/marketing-agencia/caixa-email" component={CaixaEmail} />
        <ProtectedRoute path="/marketing-agencia/email-marketing" component={EmailMarketing} />

        {/* OKRs Tracker */}
        <ProtectedRoute path="/okrs-tracker" component={OKRsTracker} />

        {/* RH */}
        <ProtectedRoute path="/rh" component={RH} />
        <ProtectedRoute path="/rh/equipe" component={Equipe} />
        <ProtectedRoute path="/rh/banco-talentos" component={BancoTalentos} />
        <ProtectedRoute path="/rh/central-vagas" component={CentralVagas} />
        <ProtectedRoute path="/rh/trilha-salarial" component={TrilhaSalarial} />
        <ProtectedRoute path="/rh/regras-conduta" component={RegrasConduta} />
        <ProtectedRoute path="/rh/onboarding-estrategico" component={OnboardingEstrategico} />
        <ProtectedRoute path="/rh/onboarding-burocratico" component={OnboardingBurocratico} />
        <ProtectedRoute path="/rh/offboarding" component={OffboardingTime} />

        {/* Administração */}
        <ProtectedRoute path="/administracao" component={Administracao} />
        <ProtectedRoute path="/administracao/documentos" component={Documentos} />
        <ProtectedRoute path="/administracao/organograma" component={Organograma} />
        <ProtectedRoute path="/administracao/parceiros" component={Parceiros} />
        <ProtectedRoute path="/administracao/identidade-marca" component={IdentidadeMarca} />
        <ProtectedRoute path="/administracao/links-ferramentas" component={LinksFerramentas} />
        <ProtectedRoute path="/administracao/automacoes" component={Automacoes} />
        <ProtectedRoute path="/administracao/integracoes" component={Integracoes} />

        {/* Jurídico */}
        <ProtectedRoute path="/juridico" component={Juridico} />
        <ProtectedRoute path="/juridico/contratos-clientes" component={ContratosClientes} />
        <ProtectedRoute path="/juridico/contratos-funcionarios" component={ContratosFuncionarios} />
        <ProtectedRoute path="/juridico/templates" component={TemplatesContrato} />
        <ProtectedRoute path="/juridico/termos-uso" component={TermosUso} />
        <ProtectedRoute path="/juridico/politica-privacidade" component={PoliticaPrivacidade} />

        {/* Financeiro */}
        <ProtectedRoute path="/financeiro" component={Financeiro} />
        <ProtectedRoute path="/financeiro/botoes-acao-rapida" component={BotoesAcaoRapida} />
        <ProtectedRoute path="/financeiro/menu" component={MenuFinanceiro} />
        <ProtectedRoute path="/financeiro/databases" component={Databases} />
        <ProtectedRoute path="/financeiro/balanco-trimestral" component={BalancoTrimestral} />
        <ProtectedRoute path="/financeiro/cobrancas-proximas" component={CobrancasProximas} />
        <ProtectedRoute path="/financeiro/graficos-rosca" component={GraficosRosca} />

        {/* Fallback */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
