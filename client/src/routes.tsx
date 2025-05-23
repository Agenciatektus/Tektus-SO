import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgot-password";
import { ResetPassword } from "./pages/reset-password";
import { Profile } from "./pages/profile";
import { Settings } from "./pages/settings";
import { NotFound } from "./pages/not-found";
import { PainelDesempenhoTarefas } from "./pages/central-tarefas/painel-desempenho";
import { AgendaReunioes } from "./pages/central-clientes/agenda-reunioes";
import { ControleClientes } from "./pages/central-clientes/controle-clientes";
import { DashboardClientes } from "./pages/central-clientes/dashboard-clientes";
import { NPSTracker } from "./pages/central-clientes/nps-tracker";
import { OffboardingChurn } from "./pages/central-clientes/offboarding-churn";
import { PainelDesempenhoSocial } from "./pages/central-conteudo/painel-desempenho";
import { DocumentosSocial } from "./pages/central-conteudo/documentos";
import { PipelineConteudo } from "./pages/central-conteudo/pipeline";
import { CalendarioPublicacao } from "./pages/central-conteudo/calendario";
import { TarefasConteudo } from "./pages/central-conteudo/tarefas";
import { PainelDesempenhoTrafego } from "./pages/central-trafego/painel-desempenho";
import { Campanhas } from "./pages/central-trafego/campanhas";
import { Anuncios } from "./pages/central-trafego/anuncios";
import { Analytics } from "./pages/central-trafego/analytics";
import { PainelDesempenhoVendas } from "./pages/central-vendas/painel-desempenho";
import { PipelineVendas } from "./pages/central-vendas/pipeline";
import { Prospeccao } from "./pages/central-vendas/prospeccao";
import { Contratos } from "./pages/central-vendas/contratos";
import { PainelDesempenhoFinanceiro } from "./pages/central-financeiro/painel-desempenho";
import { Faturamento } from "./pages/central-financeiro/faturamento";
import { ContasPagar } from "./pages/central-financeiro/contas-pagar";
import { ContasReceber } from "./pages/central-financeiro/contas-receber";
import { PainelDesempenhoProjetos } from "./pages/central-projetos/painel-desempenho";
import { GerenciamentoProjetos } from "./pages/central-projetos/gerenciamento";
import { Recursos } from "./pages/central-projetos/recursos";
import { Timeline } from "./pages/central-projetos/timeline";
import { PainelDesempenhoAutomacao } from "./pages/central-automacao/painel-desempenho";
import { Workflows } from "./pages/central-automacao/workflows";
import { Templates } from "./pages/central-automacao/templates";
import { IntegracoesAutomacao } from "./pages/central-automacao/integracoes";
import { PainelDesempenhoDesign } from "./pages/central-design/painel-desempenho";
import { Biblioteca } from "./pages/central-design/biblioteca";
import { TemplatesDesign } from "./pages/central-design/templates";
import { RecursosDesign } from "./pages/central-design/recursos";
import { PainelDesempenhoSuporte } from "./pages/central-suporte/painel-desempenho";
import { Tickets } from "./pages/central-suporte/tickets";
import { BaseConhecimento } from "./pages/central-suporte/base-conhecimento";
import { Chat } from "./pages/central-suporte/chat";
import { PainelDesempenhoRelatorios } from "./pages/central-relatorios/painel-desempenho";
import { RelatoriosVendas } from "./pages/central-relatorios/vendas";
import { RelatoriosFinanceiro } from "./pages/central-relatorios/financeiro";
import { RelatoriosMarketing } from "./pages/central-relatorios/marketing";
import { PainelDesempenhoConfiguracoes } from "./pages/central-configuracoes/painel-desempenho";
import { Usuarios } from "./pages/central-configuracoes/usuarios";
import { Integracoes } from "./pages/central-configuracoes/integracoes";
import { PainelDesempenhoAjuda } from "./pages/central-ajuda/painel-desempenho";
import { Artigos } from "./pages/central-ajuda/artigos";
import { Tutoriais } from "./pages/central-ajuda/tutoriais";
import { FAQ } from "./pages/central-ajuda/faq";
import { Contato } from "./pages/central-ajuda/contato";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      // Central de Tarefas
      {
        path: "/central-tarefas/painel-desempenho",
        element: <PainelDesempenhoTarefas />,
      },
      // Central de Clientes
      {
        path: "/central-clientes/agenda-reunioes",
        element: <AgendaReunioes />,
      },
      {
        path: "/central-clientes/controle-clientes",
        element: <ControleClientes />,
      },
      {
        path: "/central-clientes/dashboard-clientes",
        element: <DashboardClientes />,
      },
      {
        path: "/central-clientes/nps-tracker",
        element: <NPSTracker />,
      },
      {
        path: "/central-clientes/offboarding-churn",
        element: <OffboardingChurn />,
      },
      // Central de Conteúdo
      {
        path: "/central-conteudo/painel-desempenho",
        element: <PainelDesempenhoSocial />,
      },
      {
        path: "/central-conteudo/documentos",
        element: <DocumentosSocial />,
      },
      {
        path: "/central-conteudo/pipeline",
        element: <PipelineConteudo />,
      },
      {
        path: "/central-conteudo/calendario",
        element: <CalendarioPublicacao />,
      },
      {
        path: "/central-conteudo/tarefas",
        element: <TarefasConteudo />,
      },
      // Central de Tráfego
      {
        path: "/central-trafego/painel-desempenho",
        element: <PainelDesempenhoTrafego />,
      },
      {
        path: "/central-trafego/campanhas",
        element: <Campanhas />,
      },
      {
        path: "/central-trafego/anuncios",
        element: <Anuncios />,
      },
      {
        path: "/central-trafego/analytics",
        element: <Analytics />,
      },
      // Central de Vendas
      {
        path: "/central-vendas/painel-desempenho",
        element: <PainelDesempenhoVendas />,
      },
      {
        path: "/central-vendas/pipeline",
        element: <PipelineVendas />,
      },
      {
        path: "/central-vendas/prospeccao",
        element: <Prospeccao />,
      },
      {
        path: "/central-vendas/contratos",
        element: <Contratos />,
      },
      // Central Financeiro
      {
        path: "/central-financeiro/painel-desempenho",
        element: <PainelDesempenhoFinanceiro />,
      },
      {
        path: "/central-financeiro/faturamento",
        element: <Faturamento />,
      },
      {
        path: "/central-financeiro/contas-pagar",
        element: <ContasPagar />,
      },
      {
        path: "/central-financeiro/contas-receber",
        element: <ContasReceber />,
      },
      // Central de Projetos
      {
        path: "/central-projetos/painel-desempenho",
        element: <PainelDesempenhoProjetos />,
      },
      {
        path: "/central-projetos/gerenciamento",
        element: <GerenciamentoProjetos />,
      },
      {
        path: "/central-projetos/recursos",
        element: <Recursos />,
      },
      {
        path: "/central-projetos/timeline",
        element: <Timeline />,
      },
      // Central de Automação
      {
        path: "/central-automacao/painel-desempenho",
        element: <PainelDesempenhoAutomacao />,
      },
      {
        path: "/central-automacao/workflows",
        element: <Workflows />,
      },
      {
        path: "/central-automacao/templates",
        element: <Templates />,
      },
      {
        path: "/central-automacao/integracoes",
        element: <IntegracoesAutomacao />,
      },
      // Central de Design
      {
        path: "/central-design/painel-desempenho",
        element: <PainelDesempenhoDesign />,
      },
      {
        path: "/central-design/biblioteca",
        element: <Biblioteca />,
      },
      {
        path: "/central-design/templates",
        element: <TemplatesDesign />,
      },
      {
        path: "/central-design/recursos",
        element: <RecursosDesign />,
      },
      // Central de Suporte
      {
        path: "/central-suporte/painel-desempenho",
        element: <PainelDesempenhoSuporte />,
      },
      {
        path: "/central-suporte/tickets",
        element: <Tickets />,
      },
      {
        path: "/central-suporte/base-conhecimento",
        element: <BaseConhecimento />,
      },
      {
        path: "/central-suporte/chat",
        element: <Chat />,
      },
      // Central de Relatórios
      {
        path: "/central-relatorios/painel-desempenho",
        element: <PainelDesempenhoRelatorios />,
      },
      {
        path: "/central-relatorios/vendas",
        element: <RelatoriosVendas />,
      },
      {
        path: "/central-relatorios/financeiro",
        element: <RelatoriosFinanceiro />,
      },
      {
        path: "/central-relatorios/marketing",
        element: <RelatoriosMarketing />,
      },
      // Central de Configurações
      {
        path: "/central-configuracoes/painel-desempenho",
        element: <PainelDesempenhoConfiguracoes />,
      },
      {
        path: "/central-configuracoes/usuarios",
        element: <Usuarios />,
      },
      {
        path: "/central-configuracoes/integracoes",
        element: <Integracoes />,
      },
      // Central de Ajuda
      {
        path: "/central-ajuda/painel-desempenho",
        element: <PainelDesempenhoAjuda />,
      },
      {
        path: "/central-ajuda/artigos",
        element: <Artigos />,
      },
      {
        path: "/central-ajuda/tutoriais",
        element: <Tutoriais />,
      },
      {
        path: "/central-ajuda/faq",
        element: <FAQ />,
      },
      {
        path: "/central-ajuda/contato",
        element: <Contato />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 