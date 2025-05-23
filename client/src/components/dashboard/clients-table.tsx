import React, { useMemo, useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";
import { Plus, ArrowUpDown, Search, LayoutGrid, MoreVertical, ListFilter, ChevronDown, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Row } from "@tanstack/react-table";

interface Client {
  id: number;
  name: string;
  email: string;
  healthScore: number;
  createdAt: string;
  updatedAt: string;
  projects: Project[];
  invoices: Invoice[];
}

interface Project {
  id: number;
  name: string;
  description?: string;
  clientId: number;
}

interface Invoice {
  id: number;
  amount: number;
  status: string;
  clientId: number;
  createdAt: string;
}

export default function ClientsTable({ onOpenCreateClient }: { onOpenCreateClient?: () => void }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [limit, setLimit] = useState(25);
  const [sortBy, setSortBy] = useState<keyof Client>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [groupBy, setGroupBy] = useState("none");
  const [hideEmpty, setHideEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Buscar clientes do backend
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes');
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar clientes');
        console.error('Erro ao buscar clientes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filtrar clientes baseado na busca
  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);

  // Ordenar clientes
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      if (!a[sortBy] && !b[sortBy]) return 0;
      if (!a[sortBy]) return 1;
      if (!b[sortBy]) return -1;

      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredClients, sortBy, sortOrder]);

  // Definição das colunas
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Nome do Cliente",
        cell: ({ row }: { row: Row<Client> }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{row.original.name}</span>
          </div>
        ),
      },
      {
        id: "email",
        label: "E-mail",
        cell: ({ row }: { row: Row<Client> }) => <span>{row.original.email}</span>,
      },
      {
        id: "healthScore",
        label: "Health Score",
        cell: ({ row }: { row: Row<Client> }) => {
          const score = row.original.healthScore;
          let color = "bg-green-500";
          if (score < 3) color = "bg-red-500";
          else if (score < 7) color = "bg-yellow-500";
          
          return (
            <div className="flex items-center gap-2">
              <Progress 
                value={score * 10} 
                className={`w-24 ${color}`} 
              />
              <span className="text-sm font-medium">{score.toFixed(1)}</span>
            </div>
          );
        },
      },
      {
        id: "projects",
        label: "Projetos Ativos",
        cell: ({ row }) => {
          const activeProjects = row.original.projects?.length || 0;
          return (
            <Badge variant="secondary">
              {activeProjects} projeto{activeProjects !== 1 ? "s" : ""}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        label: "Data de Cadastro",
        cell: ({ row }) => (
          <span>
            {format(new Date(row.original.createdAt), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </span>
        ),
      },
    ],
    []
  );

  // Renderização das abas
  const renderTabs = () => (
    <div className="flex items-center gap-1 mb-4">
      <Button
        variant={activeTab === "todos" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("todos")}
      >
        Todos os clientes
      </Button>
      <Button
        variant={activeTab === "ativos" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("ativos")}
      >
        Clientes Ativos
      </Button>
      <Button
        variant={activeTab === "inativos" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("inativos")}
      >
        Clientes Inativos
      </Button>
    </div>
  );

  // Barra de filtros
  const renderFiltersBar = () => (
    <div className="flex items-center justify-between mb-4 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Input
          placeholder="Buscar clientes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex-nowrap flex items-center gap-2 min-w-[260px]">
          <span className="text-sm text-gray-500 min-w-[80px] w-auto">
            Agrupar por
          </span>
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="min-w-[180px] bg-white border border-gray-200 text-gray-700">
              <SelectValue placeholder="Nenhum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthScore">Health Score</SelectItem>
              <SelectItem value="projects">Projetos</SelectItem>
              <SelectItem value="none">Nenhum</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <ListFilter className="w-5 h-5 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowUpDown className="w-5 h-5 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="w-5 h-5 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </Button>
        <Button variant="default" onClick={onOpenCreateClient} className="ml-2">
          <Plus className="w-4 h-4 mr-2" /> Novo Cliente
        </Button>
      </div>
    </div>
  );

  // Função para agrupar clientes
  const groupClients = (clients: Client[], groupByField: string) => {
    if (groupByField === "none") return { "": clients };

    return clients.reduce((groups, client) => {
      let groupKey = "";

      if (groupByField === "healthScore") {
        const score = client.healthScore;
        if (score >= 7) groupKey = "Ótimo (7-10)";
        else if (score >= 4) groupKey = "Regular (4-6)";
        else groupKey = "Crítico (0-3)";
      } else if (groupByField === "projects") {
        const projectCount = client.projects?.length || 0;
        if (projectCount > 5) groupKey = "Mais de 5 projetos";
        else if (projectCount > 0) groupKey = "1-5 projetos";
        else groupKey = "Sem projetos";
      }

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(client);
      return groups;
    }, {} as Record<string, Client[]>);
  };

  // Toggle grupo
  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Renderização dos clientes
  const renderClients = (clients: Client[] = []) => {
    return clients.map((client) => (
      <TableRow key={client.id} className="hover:bg-gray-50">
        {columns.map((col) => (
          <TableCell key={col.id}>
            {col.cell({ row: { original: client } } as { row: Row<Client> })}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Renderização final
  return (
    <div className="space-y-4">
      {renderTabs()}
      {renderFiltersBar()}
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.id}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : Object.entries(groupClients(sortedClients, groupBy)).map(([group, groupClients]) => (
              <React.Fragment key={group}>
                {groupBy !== "none" && (
                  <TableRow
                    className="bg-gray-50 cursor-pointer select-none"
                    onClick={() => toggleGroup(group)}
                  >
                    <TableCell
                      colSpan={columns.length}
                      className="font-bold text-gray-700 text-base py-2 flex items-center gap-2"
                    >
                      {collapsedGroups[group] ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      <span>{group}</span>
                      <span className="text-xs text-gray-500">
                        ({groupClients.length})
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {!collapsedGroups[group] && renderClients(groupClients)}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 