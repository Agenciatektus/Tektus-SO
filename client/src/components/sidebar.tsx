import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Central de Tarefas",
    path: "/central-tarefas",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-tarefas/painel-desempenho",
      },
    ],
  },
  {
    title: "Central de Clientes",
    path: "/central-clientes",
    submenu: [
      {
        title: "Agenda de Reuniões",
        path: "/central-clientes/agenda-reunioes",
      },
      {
        title: "Controle de Clientes",
        path: "/central-clientes/controle-clientes",
      },
      {
        title: "Dashboard de Clientes",
        path: "/central-clientes/dashboard-clientes",
      },
      {
        title: "NPS Tracker",
        path: "/central-clientes/nps-tracker",
      },
      {
        title: "Offboarding e Churn",
        path: "/central-clientes/offboarding-churn",
      },
    ],
  },
  {
    title: "Central de Conteúdo",
    path: "/central-conteudo",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-conteudo/painel-desempenho",
      },
      {
        title: "Documentos",
        path: "/central-conteudo/documentos",
      },
      {
        title: "Pipeline de Conteúdo",
        path: "/central-conteudo/pipeline",
      },
      {
        title: "Calendário de Publicação",
        path: "/central-conteudo/calendario",
      },
      {
        title: "Tarefas de Conteúdo",
        path: "/central-conteudo/tarefas",
      },
    ],
  },
  {
    title: "Central de Tráfego",
    path: "/central-trafego",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-trafego/painel-desempenho",
      },
      {
        title: "Campanhas",
        path: "/central-trafego/campanhas",
      },
      {
        title: "Anúncios",
        path: "/central-trafego/anuncios",
      },
      {
        title: "Analytics",
        path: "/central-trafego/analytics",
      },
    ],
  },
  {
    title: "Central de Vendas",
    path: "/central-vendas",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-vendas/painel-desempenho",
      },
      {
        title: "Pipeline de Vendas",
        path: "/central-vendas/pipeline",
      },
      {
        title: "Prospecção",
        path: "/central-vendas/prospeccao",
      },
      {
        title: "Contratos",
        path: "/central-vendas/contratos",
      },
    ],
  },
  {
    title: "Central Financeiro",
    path: "/central-financeiro",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-financeiro/painel-desempenho",
      },
      {
        title: "Faturamento",
        path: "/central-financeiro/faturamento",
      },
      {
        title: "Contas a Pagar",
        path: "/central-financeiro/contas-pagar",
      },
      {
        title: "Contas a Receber",
        path: "/central-financeiro/contas-receber",
      },
    ],
  },
  {
    title: "Central de Projetos",
    path: "/central-projetos",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-projetos/painel-desempenho",
      },
      {
        title: "Gerenciamento de Projetos",
        path: "/central-projetos/gerenciamento",
      },
      {
        title: "Recursos",
        path: "/central-projetos/recursos",
      },
      {
        title: "Timeline",
        path: "/central-projetos/timeline",
      },
    ],
  },
  {
    title: "Central de Automação",
    path: "/central-automacao",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-automacao/painel-desempenho",
      },
      {
        title: "Workflows",
        path: "/central-automacao/workflows",
      },
      {
        title: "Templates",
        path: "/central-automacao/templates",
      },
      {
        title: "Integrações",
        path: "/central-automacao/integracoes",
      },
    ],
  },
  {
    title: "Central de Design",
    path: "/central-design",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-design/painel-desempenho",
      },
      {
        title: "Biblioteca",
        path: "/central-design/biblioteca",
      },
      {
        title: "Templates",
        path: "/central-design/templates",
      },
      {
        title: "Recursos",
        path: "/central-design/recursos",
      },
    ],
  },
  {
    title: "Central de Suporte",
    path: "/central-suporte",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-suporte/painel-desempenho",
      },
      {
        title: "Tickets",
        path: "/central-suporte/tickets",
      },
      {
        title: "Base de Conhecimento",
        path: "/central-suporte/base-conhecimento",
      },
      {
        title: "Chat",
        path: "/central-suporte/chat",
      },
    ],
  },
  {
    title: "Central de Relatórios",
    path: "/central-relatorios",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-relatorios/painel-desempenho",
      },
      {
        title: "Relatórios de Vendas",
        path: "/central-relatorios/vendas",
      },
      {
        title: "Relatórios Financeiros",
        path: "/central-relatorios/financeiro",
      },
      {
        title: "Relatórios de Marketing",
        path: "/central-relatorios/marketing",
      },
    ],
  },
  {
    title: "Central de Configurações",
    path: "/central-configuracoes",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-configuracoes/painel-desempenho",
      },
      {
        title: "Usuários",
        path: "/central-configuracoes/usuarios",
      },
      {
        title: "Integrações",
        path: "/central-configuracoes/integracoes",
      },
    ],
  },
  {
    title: "Central de Ajuda",
    path: "/central-ajuda",
    submenu: [
      {
        title: "Painel de Desempenho",
        path: "/central-ajuda/painel-desempenho",
      },
      {
        title: "Artigos",
        path: "/central-ajuda/artigos",
      },
      {
        title: "Tutoriais",
        path: "/central-ajuda/tutoriais",
      },
      {
        title: "FAQ",
        path: "/central-ajuda/faq",
      },
      {
        title: "Contato",
        path: "/central-ajuda/contato",
      },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <span className="text-xl font-bold text-gradient-tektus">Tektus</span>
        </Link>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => item.submenu && toggleMenu(item.path)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  location.pathname.startsWith(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span>{item.title}</span>
                {item.submenu && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      openMenus[item.path] && "transform rotate-180"
                    )}
                  />
                )}
              </button>
              {item.submenu && openMenus[item.path] && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        location.pathname === subItem.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
} 