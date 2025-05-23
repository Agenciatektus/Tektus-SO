import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  getGroupedRowModel,
  ColumnDef,
  VisibilityState,
} from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { MoreVertical, Plus, ArrowUpDown, ArrowUp, ArrowDown, List, LayoutGrid, Eye, EyeOff, Layers, ListFilter, Text, ChevronDown, ChevronRight, Building2, GripVertical, X, MoreHorizontal } from "lucide-react";
import { NotionPopoverMenu } from "@/components/ui/NotionPopoverMenu";
import { NotionTable } from "@/components/ui/notion-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NotionEditor } from '@/components/ui/notion-editor';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Drawer } from '@/components/ui/drawer';
import { useEditor } from '@/hooks/useEditor';
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";

// Mock de usuários
const users = [
  { id: 1, name: "Peterson De Lima", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Felipe Delgado", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  { id: 3, name: "Maria Souza", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
];

// Mock de clientes
const clients = [
  { id: 1, name: "DGA Acadêmico" },
  { id: 2, name: "Imports 4 You" },
];

// DADOS FICTÍCIOS BASEADOS NO PRINT DO NOTION
const fakeTasks: Task[] = [
  {
    id: 1,
    title: "Criar Novo contrato do DGA",
    description: "Contrato para novo cliente DGA Acadêmico.",
    type: "task",
    status: "completed",
    priority: "medium",
    dueDate: "2025-04-01",
    requestDate: "2025-04-01",
    completedAt: "2025-04-01",
    estimatedHours: 4,
    clientId: 1,
    assigneeId: 1,
    requesterId: 1,
    sector: "Jurídico",
    subtasks: [],
  },
  {
    id: 2,
    title: "Mandar pra assinatura",
    description: "Enviar contrato para assinatura.",
    type: "task",
    status: "in_progress",
    priority: "medium",
    dueDate: "2025-04-01",
    requestDate: "2025-04-01",
    completedAt: null,
    estimatedHours: 2,
    clientId: 1,
    assigneeId: 1,
    requesterId: 1,
    sector: "Jurídico",
    subtasks: [],
  },
  {
    id: 3,
    title: "Subir novos Anuncios Mestrado e Doutorado Tiktok",
    description: "Campanha para Tiktok.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-05",
    requestDate: "2025-05-05",
    completedAt: null,
    estimatedHours: 3,
    clientId: 1,
    assigneeId: 2,
    requesterId: 2,
    sector: "Gestão de Tráfego",
    subtasks: [],
  },
  {
    id: 4,
    title: "Edição do Site / Nova Landing Page p/ Google Ads",
    description: "Atualizar landing page.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-09",
    requestDate: "2025-05-07",
    completedAt: null,
    estimatedHours: 5,
    clientId: 1,
    assigneeId: 1,
    requesterId: 1,
    sector: "Web Design",
    subtasks: [],
  },
  {
    id: 5,
    title: "Anúncios Google Ads",
    description: "Criar anúncios para Google Ads.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-09",
    requestDate: "2025-05-07",
    completedAt: null,
    estimatedHours: 2,
    clientId: 1,
    assigneeId: 2,
    requesterId: 1,
    sector: "Gestão de Tráfego",
    subtasks: [],
  },
  {
    id: 6,
    title: "Verificar CRm Multiplataforma que faça sentido pra DGA",
    description: "Pesquisar CRMs.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-23",
    requestDate: "2025-05-19",
    completedAt: null,
    estimatedHours: 2,
    clientId: 1,
    assigneeId: 1,
    requesterId: 1,
    sector: "Automação e CRM",
    subtasks: [],
  },
  {
    id: 7,
    title: "Subir videos dos relógios já cadastrados no site pro youtube",
    description: "Upload de vídeos.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-03-24",
    requestDate: "2025-03-17",
    completedAt: null,
    estimatedHours: 1,
    clientId: 2,
    assigneeId: 1,
    requesterId: 1,
    sector: "Gestão de conteúdo",
    subtasks: [],
  },
  {
    id: 8,
    title: "Reeditar fotos dos Bvlgari, embaçando o nome",
    description: "Editar fotos.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-03-21",
    requestDate: "2025-03-18",
    completedAt: null,
    estimatedHours: 1,
    clientId: 2,
    assigneeId: 1,
    requesterId: 1,
    sector: "Web Design",
    subtasks: [],
  },
  {
    id: 9,
    title: "Dashboard Comercial Tektus Looker studio",
    description: "Criar dashboard.",
    type: "task",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-10-11",
    requestDate: "2024-09-24",
    completedAt: null,
    estimatedHours: 6,
    clientId: 3,
    assigneeId: 1,
    requesterId: 1,
    sector: "Sucesso do Cliente",
    subtasks: [],
  },
  {
    id: 10,
    title: "Criar acesso ao Spotter e CRM kommo Para Poliana SDR",
    description: "Acesso para Poliana.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-08",
    requestDate: "2025-05-07",
    completedAt: null,
    estimatedHours: 2,
    clientId: 3,
    assigneeId: 1,
    requesterId: 1,
    sector: "Comercial",
    subtasks: [],
  },
  {
    id: 11,
    title: "LP",
    description: "Landing page.",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: "2025-05-14",
    requestDate: "2025-05-14",
    completedAt: null,
    estimatedHours: 2,
    clientId: 3,
    assigneeId: 1,
    requesterId: 1,
    sector: "Comercial",
    subtasks: [],
  },
];

const statusOptions = [
  { label: "Não iniciado", value: "Não iniciado", description: "Tarefa ainda não iniciada" },
  { label: "Travado", value: "Travado", description: "Tarefa bloqueada por dependência" },
  { label: "Em progresso", value: "Em progresso", description: "Tarefa em desenvolvimento" },
  { label: "Em revisão", value: "Em revisão", description: "Tarefa em fase de revisão" },
  { label: "Em aprovação", value: "Em aprovação", description: "Tarefa aguardando aprovação" },
];

const sectorColors: Record<string, { color: string; description: string }> = {
  "Sucesso do Cliente": {
    color: "bg-green-200 text-green-800",
    description: "Setor responsável pelo sucesso e satisfação dos clientes"
  },
  "Gestão de Tráfego": {
    color: "bg-blue-200 text-blue-800",
    description: "Setor responsável pela gestão de campanhas e tráfego"
  },
  "Gestão de conteúdo": {
    color: "bg-purple-200 text-purple-800",
    description: "Setor responsável pela criação e gestão de conteúdo"
  },
  "Web Design": {
    color: "bg-pink-200 text-pink-800",
    description: "Setor responsável pelo design e desenvolvimento web"
  },
  "Comercial": {
    color: "bg-yellow-200 text-yellow-800",
    description: "Setor responsável pelas vendas e relacionamento comercial"
  },
  "Automação e CRM": {
    color: "bg-cyan-200 text-cyan-800",
    description: "Setor responsável por automações e gestão de relacionamento"
  },
  "Jurídico": {
    color: "bg-red-200 text-red-800",
    description: "Setor responsável por questões jurídicas e contratuais"
  },
  "Financeiro": {
    color: "bg-orange-200 text-orange-800",
    description: "Setor responsável pela gestão financeira"
  },
  "Recursos Humanos (RH)": {
    color: "bg-gray-200 text-gray-800",
    description: "Setor responsável pela gestão de pessoas"
  },
};

const priorityColors: Record<string, { color: string; description: string }> = {
  "Padrão": {
    color: "bg-gray-100 text-gray-800",
    description: "Prioridade normal, sem urgência"
  },
  "Alta": {
    color: "bg-orange-100 text-orange-800",
    description: "Prioridade alta, requer atenção em breve"
  },
  "Urgente": {
    color: "bg-red-100 text-red-800",
    description: "Prioridade máxima, requer atenção imediata"
  },
};

interface Task {
  id: number;
  title: string;
  description: string;
  type: "feature" | "bug" | "task" | "document" | "meeting";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "urgent" | "high" | "medium" | "low";
  dueDate: string | null;
  requestDate: string;
  completedAt: string | null;
  estimatedHours: number | null;
  clientId: number | null;
  assigneeId: number | null;
  requesterId: number | null;
  sector: string;
  subtasks: Task[];
  isExpanded?: boolean;
}

// Tipos de tarefa e seus ícones
const taskTypeIcons = {
  feature: { icon: "🧠", label: "Feature" },
  bug: { icon: "🐛", label: "Bug" },
  task: { icon: "📝", label: "Tarefa" },
  document: { icon: "📎", label: "Documento" },
  meeting: { icon: "👥", label: "Reunião" },
};

// Status com cores e ícones
const statusConfig = {
  pending: { color: "bg-yellow-500", label: "Pendente", icon: "⏳" },
  in_progress: { color: "bg-blue-500", label: "Em progresso", icon: "🔄" },
  completed: { color: "bg-green-500", label: "Concluído", icon: "✅" },
  cancelled: { color: "bg-red-500", label: "Cancelado", icon: "❌" },
};

// Prioridades com bullets
const priorityConfig = {
  urgent: { bullet: "●", color: "text-red-500" },
  high: { bullet: "●", color: "text-orange-500" },
  medium: { bullet: "●", color: "text-yellow-500" },
  low: { bullet: "●", color: "text-green-500" },
};

export default function TasksTable({ onOpenCreateTask }: { onOpenCreateTask?: () => void }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [limit, setLimit] = useState<number>(25);
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc"|"desc">("asc");
  const [groupBy, setGroupBy] = useState<string>("none");
  const [hideEmpty, setHideEmpty] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "board">("table");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [editingFilter, setEditingFilter] = useState<number | null>(null);
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState<any>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: any[] }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tektus_saved_filters");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [saveFilterModal, setSaveFilterModal] = useState(false);
  const [newFilterName, setNewFilterName] = useState("");

  // Sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Detectar viewport mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carregar mais tarefas quando scrollar até o final
  useEffect(() => {
    if (inView && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore]);

  // Fetch tasks com paginação
  const { data: tasksData, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks", page],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/tasks?page=${page}&limit=20`);
      const data = await res.json();
      setHasMore(data.length === 20);
      return data;
    },
  });

  // Calcular estatísticas
  const stats = useMemo(() => {
    const total = tasksData?.length || 0;
    const completed = tasksData?.filter(t => t.status === "completed").length || 0;
    const empty = tasksData?.filter(t => !t.title).length || 0;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      empty,
      progress,
    };
  }, [tasksData]);

  const data = useMemo(() => tasksData, [tasksData]);

  const { value: editorValue, handleChange: handleEditorChange, reset: resetEditor } = useEditor({
    onSave: (content) => {
      if (selectedTask) {
        setTasks(prev =>
          prev.map(task =>
            task.id === selectedTask.id
              ? { ...task, content }
              : task
          )
        );
      }
    },
  });

  // Propriedades filtráveis
  const filterableProps = [
    { id: "title", label: "Backlog", type: "text" },
    { id: "status", label: "Status", type: "select", options: [
      { value: "pending", label: "Não iniciado" },
      { value: "in_progress", label: "Em progresso" },
      { value: "completed", label: "Feito" },
      { value: "cancelled", label: "Cancelado" },
    ] },
    { id: "dueDate", label: "Data de Vencimento", type: "date" },
    { id: "requestDate", label: "Data de Solicitação", type: "date" },
    { id: "priority", label: "Prioridade", type: "select", options: [
      { value: "urgent", label: "Urgente" },
      { value: "high", label: "Alta" },
      { value: "medium", label: "Média" },
      { value: "low", label: "Baixa" },
    ] },
    { id: "assigneeId", label: "Responsável", type: "person", options: users.map(u => ({ value: u.id, label: u.name, avatar: u.avatar })) },
    { id: "sector", label: "Setor", type: "select", options: Object.keys(sectorColors).map(s => ({ value: s, label: s })) },
    { id: "requesterId", label: "Solicitante", type: "person", options: users.map(u => ({ value: u.id, label: u.name, avatar: u.avatar })) },
    // Adicione mais propriedades se quiser
  ];

  // Adicionar novo filtro
  const handleAddFilter = (propId: string) => {
    const prop = filterableProps.find(p => p.id === propId);
    if (!prop) return;
    setFilters([...filters, { propId, operator: prop.type === "text" ? "contém" : "igual", value: "" }]);
    setFilterMenuOpen(false);
    setFilterSearch("");
  };

  // Remover filtro
  const handleRemoveFilter = (idx: number) => {
    setFilters(filters.filter((_, i) => i !== idx));
  };

  // Atualizar valor do filtro
  const handleChangeFilter = (idx: number, value: any) => {
    setFilters(filters.map((f, i) => i === idx ? { ...f, value } : f));
  };

  // Atualizar operador do filtro
  const handleChangeOperator = (idx: number, operator: string) => {
    setFilters(filters.map((f, i) => i === idx ? { ...f, operator } : f));
  };

  // Filtros aplicados
  const filteredData = useMemo(() => {
    let d = data || [];
    filters.forEach(f => {
      const prop = filterableProps.find(p => p.id === f.propId);
      if (!prop) return;
      if (prop.type === "text") {
        if (f.value) d = d.filter(t => (t[f.propId] || "").toLowerCase().includes(f.value.toLowerCase()));
      } else if (prop.type === "select") {
        if (f.value) d = d.filter(t => t[f.propId] === f.value);
      } else if (prop.type === "person") {
        if (f.value) d = d.filter(t => t[f.propId]?.toString() === f.value.toString());
      } else if (prop.type === "date") {
        if (f.value) d = d.filter(t => t[f.propId]?.slice(0, 10) === f.value);
      }
    });
    return d;
  }, [data, filters]);

  // Definição das colunas principais conforme o print do Notion
  const columns = useMemo(() => [
    {
      id: "status",
      label: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusMap = {
          "pending": { label: "Não iniciado", color: "bg-gray-200 text-gray-800" },
          "in_progress": { label: "Em progresso", color: "bg-blue-200 text-blue-800" },
          "completed": { label: "Feito", color: "bg-green-200 text-green-800" },
          "cancelled": { label: "Cancelado", color: "bg-red-200 text-red-800" },
        };
        const s = statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800" };
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${s.color}`}>{s.label}</span>
        );
      },
    },
    {
      id: "title",
      label: "Backlog",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.title}</span>
      ),
    },
    {
      id: "dueDate",
      label: "Data de Vencimento",
      cell: ({ row }) => (
        <span>{row.original.dueDate ? format(new Date(row.original.dueDate), "dd/MM/yyyy") : "-"}</span>
      ),
    },
    {
      id: "requestDate",
      label: "Data de Solicitação",
      cell: ({ row }) => (
        <span>{row.original.requestDate ? format(new Date(row.original.requestDate), "dd/MM/yyyy") : "-"}</span>
      ),
    },
    {
      id: "prazo",
      label: "Prazo em dias",
      cell: ({ row }) => {
        const { dueDate, status } = row.original;
        if (!dueDate) return <span>-</span>;
        if (status === "completed") return <span className="text-green-600">Ok 🟢</span>;
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return <span className="text-red-600">Atrasado 🔴</span>;
        if (diffDays === 0) return <span className="text-yellow-600">Vence hoje</span>;
        return <span className="text-blue-600">{diffDays} dias</span>;
      },
    },
    {
      id: "priority",
      label: "Prioridade",
      cell: ({ row }) => {
        const priority = row.original.priority;
        const priorityMap = {
          "urgent": { label: "Urgente", color: "text-red-600" },
          "high": { label: "Alta", color: "text-orange-600" },
          "medium": { label: "Média", color: "text-yellow-600" },
          "low": { label: "Baixa", color: "text-green-600" },
        };
        const p = priorityMap[priority] || { label: priority, color: "text-gray-600" };
        return (
          <span className={`font-semibold ${p.color}`}>{p.label}</span>
        );
      },
    },
    {
      id: "assigneeId",
      label: "Responsável",
      cell: ({ row }) => {
        const user = users.find(u => u.id === row.original.assigneeId);
        return user ? (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
        ) : <span>-</span>;
      },
    },
    {
      id: "sector",
      label: "Setor",
      cell: ({ row }) => (
        <Badge className={sectorColors[row.original.sector]?.color || "bg-gray-100 text-gray-800"}>
          {row.original.sector}
        </Badge>
      ),
    },
    {
      id: "requesterId",
      label: "Solicitante",
      cell: ({ row }) => {
        const user = users.find(u => u.id === row.original.requesterId);
        return user ? (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
        ) : <span>-</span>;
      },
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    debugTable: false,
  });

  // Colunas visíveis: todas as principais
  const visibleColumns = useMemo(() => columns.map(col => col.id), [columns]);

  // Handlers para o menu
  function handleToggleColumn(id) {
    table.getColumn(id)?.toggleVisibility();
  }
  function handleResizeColumn(e, id) {
    e.preventDefault();
    const startX = e.clientX;
    const col = table.getColumn(id);
    const startWidth = col.getSize();
    function onMouseMove(ev) {
      const newWidth = Math.max(60, startWidth + (ev.clientX - startX));
      col.setSize(newWidth);
    }
    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  function handleChangeOrderBy(val) { setSortBy(val); }
  function handleChangeOrderDirection(val) { setSortOrder(val); }
  function handleChangeGroupBy(val) { setGroupBy(val); }
  function handleToggleHideEmpty() { setHideEmpty(v => !v); }
  function handleChangeLimit(val) { setLimit(val); }

  const handleCellChange = (row: any, columnId: string, value: any) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === row.id ? { ...task, [columnId]: value } : task
      )
    );
  };

  const handleRowClick = (row: any) => {
    setSelectedTask(row);
    resetEditor(row.content || []);
    setDrawerOpen(true);
  };

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id);
  };
  const handleDragOver = (event) => {
    setOverId(event.over?.id || null);
  };
  const handleDragEnd = (event) => {
    setActiveDragId(null);
    setOverId(null);
    // ... lógica de reordenação/status ...
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedTask(null);
    resetEditor();
  };

  const filteredTasks = data?.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedTasks = [...filteredTasks].sort((a, b) => {
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Renderização da tabela com as colunas principais
  const renderTasks = (tasks: Task[] = [], level = 0) => {
    return tasks.map((task) => (
      <React.Fragment key={task.id}>
        <TableRow className={cn(
          "hover:bg-gray-50",
          level > 0 && "bg-gray-50"
        )}>
          {columns.map((col) => (
            <TableCell key={col.id} style={col.id === "title" ? { paddingLeft: `${level * 2 + 1}rem` } : undefined}>
              {col.cell({ row: { original: task } })}
            </TableCell>
          ))}
        </TableRow>
        {task.isExpanded && task.subtasks?.length > 0 && renderTasks(task.subtasks, level + 1)}
      </React.Fragment>
    ));
  };

  // Função para agrupar tarefas
  const groupTasks = (tasks: Task[] = [], groupBy: string) => {
    if (!groupBy || groupBy === "none") return { "": tasks };
    return tasks.reduce((acc, task) => {
      let key = "";
      if (groupBy === "status") key = columns.find(c => c.id === "status")?.cell({ row: { original: task } }).props.children || task.status;
      else if (groupBy === "sector") key = task.sector;
      else if (groupBy === "clientId") key = clients.find(c => c.id === task.clientId)?.name || "Sem cliente";
      else key = task[groupBy] || "Outro";
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
  };

  // Agrupamento dinâmico
  const groupedTasks = useMemo(() => groupTasks(tasksData, groupBy), [tasksData, groupBy]);

  // Barra de filtros ativos estilo Notion
  const renderActiveFilters = () => (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f, idx) => {
        const prop = filterableProps.find(p => p.id === f.propId);
        if (!prop) return null;
        return (
          <Popover key={idx} open={editingFilter === idx} onOpenChange={open => setEditingFilter(open ? idx : null)}>
            <PopoverTrigger asChild>
              <div className="flex items-center bg-gray-100 rounded px-2 py-1 cursor-pointer text-sm gap-1">
                <span className="font-medium text-gray-700">{prop.label}</span>
                <span className="text-gray-500">{f.operator}</span>
                {prop.type === "select" && (
                  <span className="font-semibold text-gray-700">{prop.options.find(o => o.value === f.value)?.label || ""}</span>
                )}
                {prop.type === "person" && (
                  <span className="font-semibold text-gray-700">{users.find(u => u.id.toString() === f.value?.toString())?.name || ""}</span>
                )}
                {prop.type === "text" && f.value && (
                  <span className="font-semibold text-gray-700">{f.value}</span>
                )}
                {prop.type === "date" && f.value && (
                  <span className="font-semibold text-gray-700">{f.value}</span>
                )}
                <Button variant="ghost" size="icon" className="ml-1" onClick={e => { e.stopPropagation(); handleRemoveFilter(idx); }}>
                  <X className="w-3 h-3" />
                </Button>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-1">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{prop.label}</span>
                <Select value={f.operator} onValueChange={val => handleChangeOperator(idx, val)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contém">Contém</SelectItem>
                    <SelectItem value="igual">Igual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {prop.type === "text" && (
                <Input
                  placeholder="Digite o valor..."
                  value={f.value}
                  onChange={e => handleChangeFilter(idx, e.target.value)}
                  autoFocus
                />
              )}
              {prop.type === "select" && (
                <Select value={f.value} onValueChange={val => handleChangeFilter(idx, val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {prop.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {prop.type === "person" && (
                <Select value={f.value?.toString() || ""} onValueChange={val => handleChangeFilter(idx, val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {prop.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value.toString()}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={opt.avatar} />
                            <AvatarFallback>{opt.label.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{opt.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {prop.type === "date" && (
                <Input
                  type="date"
                  value={f.value}
                  onChange={e => handleChangeFilter(idx, e.target.value)}
                />
              )}
              <div className="mt-2 flex flex-col gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleRemoveFilter(idx)}>
                  Excluir filtro
                </Button>
                <Button variant="ghost" size="sm" onClick={() => alert('Filtro avançado em breve!')}>
                  Adicionar ao filtro avançado
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );

  // Função para alternar grupo (acordeão)
  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Ajuste de agrupamento e filtros conforme aba
  useEffect(() => {
    if (activeTab === "todas") {
      setGroupBy("clientId");
    } else if (activeTab === "kanban") {
      setGroupBy("priority");
    } else if (activeTab === "responsavel") {
      setGroupBy("assigneeId");
    } else if (activeTab === "etapas") {
      setGroupBy("status");
    }
  }, [activeTab]);

  // Barra de abas de visualização
  const renderTabs = () => (
    <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-gray-200 bg-background">
      <button
        className={`px-3 py-1 rounded-t font-medium text-sm border-b-2 transition-all ${activeTab === "todas" ? "border-blue-500 text-blue-600 bg-white" : "border-transparent text-gray-500 bg-transparent hover:bg-gray-50"}`}
        onClick={() => setActiveTab("todas")}
      >
        Todas as Tarefas
      </button>
      <button
        className={`px-3 py-1 rounded-t font-medium text-sm border-b-2 transition-all ${activeTab === "kanban" ? "border-blue-500 text-blue-600 bg-white" : "border-transparent text-gray-500 bg-transparent hover:bg-gray-50"}`}
        onClick={() => setActiveTab("kanban")}
      >
        Kanban Prioridades
      </button>
      <button
        className={`px-3 py-1 rounded-t font-medium text-sm border-b-2 transition-all ${activeTab === "responsavel" ? "border-blue-500 text-blue-600 bg-white" : "border-transparent text-gray-500 bg-transparent hover:bg-gray-50"}`}
        onClick={() => setActiveTab("responsavel")}
      >
        Por responsável
      </button>
      <button
        className={`px-3 py-1 rounded-t font-medium text-sm border-b-2 transition-all ${activeTab === "etapas" ? "border-blue-500 text-blue-600 bg-white" : "border-transparent text-gray-500 bg-transparent hover:bg-gray-50"}`}
        onClick={() => setActiveTab("etapas")}
      >
        Etapas da Tarefa
      </button>
    </div>
  );

  // Salvar filtros no localStorage
  const persistSavedFilters = (filters) => {
    setSavedFilters(filters);
    if (typeof window !== "undefined") {
      localStorage.setItem("tektus_saved_filters", JSON.stringify(filters));
    }
  };

  // Salvar filtro atual
  const handleSaveCurrentFilter = () => {
    if (!newFilterName.trim()) return;
    const newSaved = [...savedFilters, { name: newFilterName.trim(), filters }];
    persistSavedFilters(newSaved);
    setSaveFilterModal(false);
    setNewFilterName("");
  };

  // Aplicar filtro salvo
  const handleApplySavedFilter = (idx: number) => {
    setFilters(savedFilters[idx].filters);
  };

  // Excluir filtro salvo
  const handleDeleteSavedFilter = (idx: number) => {
    const newSaved = savedFilters.filter((_, i) => i !== idx);
    persistSavedFilters(newSaved);
  };

  // Barra de filtros e agrupamento ajustada conforme aba
  const renderFiltersBar = () => (
    <div className="flex w-full flex-nowrap items-center justify-between gap-2 px-4 py-2 border-b border-gray-100 bg-background overflow-x-auto">
      <div className="flex w-full flex-nowrap items-center gap-2">
        {/* Filtros dinâmicos ativos e '+ Filtrar' */}
        {renderActiveFilters()}
        <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2">
              + Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <Input
              placeholder="Procurar uma propriedade..."
              value={filterSearch}
              onChange={e => setFilterSearch(e.target.value)}
              className="mb-2"
              autoFocus
            />
            <div className="max-h-60 overflow-y-auto flex flex-col gap-1">
              {filterableProps.filter(p => p.label.toLowerCase().includes(filterSearch.toLowerCase()) && !filters.some(f => f.propId === p.id)).map(p => (
                <Button
                  key={p.id}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleAddFilter(p.id)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => alert('Filtro avançado em breve!')}>
              + Adicionar filtro avançado
            </Button>
          </PopoverContent>
        </Popover>
        {/* Botão Salvar filtro */}
        {filters.length > 0 && (
          <Button variant="outline" size="sm" className="ml-2" onClick={() => setSaveFilterModal(true)}>
            Salvar filtro
          </Button>
        )}
        {/* Dropdown de filtros salvos */}
        {savedFilters.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                Filtros salvos
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-col gap-1">
                {savedFilters.map((sf, idx) => (
                  <div key={idx} className="flex items-center justify-between group hover:bg-gray-50 rounded px-2 py-1 cursor-pointer">
                    <span onClick={() => handleApplySavedFilter(idx)} className="flex-1 truncate group-hover:text-blue-600">{sf.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSavedFilter(idx)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        {/* Modal para nomear filtro salvo */}
        {saveFilterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-xs flex flex-col gap-3">
              <span className="font-medium text-gray-800">Nome do filtro salvo</span>
              <Input
                placeholder="Ex: Tarefas urgentes do cliente X"
                value={newFilterName}
                onChange={e => setNewFilterName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSaveFilterModal(false)}>Cancelar</Button>
                <Button onClick={handleSaveCurrentFilter} disabled={!newFilterName.trim()}>Salvar</Button>
              </div>
            </div>
          </div>
        )}
        {/* Dropdown de agrupamento */}
        <div className="ml-4 flex-nowrap flex items-center gap-2 min-w-[260px]">
           <span className="text-sm text-gray-500 min-w-[80px] w-auto">Agrupar por</span>
           <Select value={groupBy} onValueChange={setGroupBy}>
             <SelectTrigger className="min-w-[180px] bg-white border border-gray-200 text-gray-700">
               <SelectValue placeholder="Nenhum" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="clientId">Cliente</SelectItem>
               <SelectItem value="assigneeId">Responsável</SelectItem>
               <SelectItem value="sector">Setor</SelectItem>
               <SelectItem value="requesterId">Solicitante</SelectItem>
               <SelectItem value="none">Nenhum</SelectItem>
             </SelectContent>
           </Select>
         </div>
      </div>
      {/* Ícones de ações e botão Nova à direita */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><ListFilter className="w-5 h-5 text-gray-400" /></Button>
        <Button variant="ghost" size="icon"><ArrowUpDown className="w-5 h-5 text-gray-400" /></Button>
        <Button variant="ghost" size="icon"><Search className="w-5 h-5 text-gray-400" /></Button>
        <Button variant="ghost" size="icon"><LayoutGrid className="w-5 h-5 text-gray-400" /></Button>
        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
        <Button variant="blue" onClick={onOpenCreateTask} className="ml-2">
          <Plus className="w-4 h-4" /> Nova
        </Button>
      </div>
    </div>
  );

  // Renderização final
  return (
    <div className="space-y-4">
      {renderTabs()}
      {renderFiltersBar()}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.id}>
                    {isDraggable && col.id === "title" && (
                      <GripVertical className="w-4 h-4 inline-block mr-2" />
                    )}
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={filteredData?.map(t => t.id) || []}
                strategy={verticalListSortingStrategy}
              >
                {Object.entries(groupTasks(filteredData || [], groupBy)).map(([group, groupTasks]) => (
                  <React.Fragment key={group}>
                    {groupBy !== "none" && (
                      <TableRow className="bg-gray-50 cursor-pointer select-none" onClick={() => toggleGroup(group)}>
                        <TableCell colSpan={columns.length} className="font-bold text-gray-700 text-base py-2 flex items-center gap-2">
                          {collapsedGroups[group] ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          <span>{group}</span>
                          <span className="text-xs text-gray-500">({groupTasks.length})</span>
                        </TableCell>
                      </TableRow>
                    )}
                    {!collapsedGroups[group] && renderTasks(groupTasks)}
                  </React.Fragment>
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
      </DndContext>
      {/* Rodapé com estatísticas */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-medium">Progresso</div>
              <div className="text-2xl font-bold">{Math.round(stats.progress)}%</div>
            </div>
            <Progress value={stats.progress} className="w-[60%]" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-semibold">{stats.total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Concluídas</div>
              <div className="text-lg font-semibold text-green-600">{stats.completed}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Vazias</div>
              <div className="text-lg font-semibold text-gray-400">{stats.empty}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Elemento para carregar mais */}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
} 