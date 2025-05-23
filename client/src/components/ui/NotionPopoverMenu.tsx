import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import {
  MoreVertical, Eye, EyeOff, Filter, List, Group, ChevronRight, ChevronLeft, X, ArrowUp, ArrowDown, LayoutGrid, Loader2
} from "lucide-react";

export function NotionPopoverMenu({
  columns,
  onToggleColumn,
  filters,
  onAddFilter,
  onRemoveFilter,
  onChangeFilter,
  orderBy,
  onChangeOrderBy,
  orderDirection,
  onChangeOrderDirection,
  groupBy,
  onChangeGroupBy,
  hideEmpty,
  onToggleHideEmpty,
  limit,
  onChangeLimit,
  allColumns,
}) {
  const [openMenu, setOpenMenu] = useState<null | "columns" | "filter" | "order" | "group" | "limit">(null);
  const [orderSearch, setOrderSearch] = useState("");

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="p-2 rounded hover:bg-muted transition-colors" aria-label="Abrir menu" type="button">
          <MoreVertical className="w-5 h-5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={8} align="end" className="z-50 min-w-[320px] rounded-xl border border-border bg-popover p-2 shadow-xl animate-in fade-in-0 slide-in-from-top-2">
          {openMenu === null && (
            <MenuPrincipal onOpen={setOpenMenu} />
          )}
          {openMenu === "columns" && (
            <SubMenuColunas onBack={() => setOpenMenu(null)} columns={columns} onToggleColumn={onToggleColumn} />
          )}
          {openMenu === "filter" && (
            <SubMenuFiltros onBack={() => setOpenMenu(null)} filters={filters} onAddFilter={onAddFilter} onRemoveFilter={onRemoveFilter} onChangeFilter={onChangeFilter} allColumns={allColumns} />
          )}
          {openMenu === "order" && (
            <SubMenuOrdenar onBack={() => setOpenMenu(null)} orderBy={orderBy} onChangeOrderBy={onChangeOrderBy} orderDirection={orderDirection} onChangeOrderDirection={onChangeOrderDirection} allColumns={allColumns} orderSearch={orderSearch} setOrderSearch={setOrderSearch} />
          )}
          {openMenu === "group" && (
            <SubMenuAgrupar onBack={() => setOpenMenu(null)} groupBy={groupBy} onChangeGroupBy={onChangeGroupBy} hideEmpty={hideEmpty} onToggleHideEmpty={onToggleHideEmpty} allColumns={allColumns} />
          )}
          {openMenu === "limit" && (
            <SubMenuLimite onBack={() => setOpenMenu(null)} limit={limit} onChangeLimit={onChangeLimit} />
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MenuPrincipal({ onOpen }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold text-sm px-2 py-2">Ver configurações</div>
      <button className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-sm" onClick={() => onOpen("columns")}> <LayoutGrid className="w-4 h-4" /> Propriedades <ChevronRight className="ml-auto w-4 h-4" /> </button>
      <button className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-sm" onClick={() => onOpen("filter")}> <Filter className="w-4 h-4" /> Filtrar <ChevronRight className="ml-auto w-4 h-4" /> </button>
      <button className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-sm" onClick={() => onOpen("order")}> <List className="w-4 h-4" /> Ordenar <ChevronRight className="ml-auto w-4 h-4" /> </button>
      <button className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-sm" onClick={() => onOpen("group")}> <Group className="w-4 h-4" /> Agrupar <ChevronRight className="ml-auto w-4 h-4" /> </button>
      <button className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-sm" onClick={() => onOpen("limit")}> <Loader2 className="w-4 h-4" /> Carregar <ChevronRight className="ml-auto w-4 h-4" /> </button>
    </div>
  );
}

function SubMenuColunas({ onBack, columns, onToggleColumn }) {
  return (
    <div className="flex flex-col gap-1 min-w-[280px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b bg-background sticky top-0 z-10"><button onClick={onBack}><ChevronLeft className="w-4 h-4" /></button><span className="font-semibold text-sm">Propriedades</span></div>
      <div className="flex flex-col gap-1 py-2 max-h-72 overflow-y-auto">
        {columns.map(col => (
          <button key={col.id} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted text-sm" onClick={() => onToggleColumn(col.id)}>
            {col.visible ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
            <span className="flex-1 text-left">{col.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SubMenuFiltros({ onBack, filters, onAddFilter, onRemoveFilter, onChangeFilter, allColumns }) {
  return (
    <div className="flex flex-col gap-1 min-w-[280px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b bg-background sticky top-0 z-10"><button onClick={onBack}><ChevronLeft className="w-4 h-4" /></button><span className="font-semibold text-sm">Filtros</span></div>
      <div className="flex flex-col gap-1 py-2 max-h-72 overflow-y-auto">
        {filters.map((f, idx) => (
          <div key={idx} className="flex items-center gap-2 px-2 py-1 rounded text-sm bg-muted">
            <select className="border rounded px-1 py-0.5 text-xs" value={f.column} onChange={e => onChangeFilter(idx, { ...f, column: e.target.value })}>
              {allColumns.map(col => (
                <option key={col.id} value={col.id}>{col.label}</option>
              ))}
            </select>
            <select className="border rounded px-1 py-0.5 text-xs" value={f.operator} onChange={e => onChangeFilter(idx, { ...f, operator: e.target.value })}>
              <option value="contains">Contém</option>
              <option value="equals">Igual</option>
              <option value="startsWith">Começa com</option>
              <option value="endsWith">Termina com</option>
            </select>
            <input className="border rounded px-1 py-0.5 text-xs" value={f.value} onChange={e => onChangeFilter(idx, { ...f, value: e.target.value })} placeholder="Valor" />
            <X className="w-4 h-4 text-destructive cursor-pointer" onClick={() => onRemoveFilter(idx)} />
          </div>
        ))}
        <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted text-sm mt-2 text-primary" onClick={onAddFilter}>
          <Filter className="w-4 h-4" /> Novo filtro
        </button>
      </div>
    </div>
  );
}

function SubMenuOrdenar({ onBack, orderBy, onChangeOrderBy, orderDirection, onChangeOrderDirection, allColumns, orderSearch, setOrderSearch }) {
  const filteredCols = allColumns.filter(col => col.label.toLowerCase().includes(orderSearch.toLowerCase()));
  return (
    <div className="flex flex-col gap-1 min-w-[280px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b bg-background sticky top-0 z-10"><button onClick={onBack}><ChevronLeft className="w-4 h-4" /></button><span className="font-semibold text-sm">Nova ordenação</span></div>
      <input className="border rounded px-2 py-1 m-2 text-sm" placeholder="Ordenar por..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
      <div className="flex flex-col gap-1 py-2 max-h-60 overflow-y-auto">
        {filteredCols.map(col => (
          <button key={col.id} className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-muted text-sm ${orderBy === col.id ? 'bg-muted font-semibold' : ''}`} onClick={() => onChangeOrderBy(col.id)}>
            <List className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-left">{col.label}</span>
            <button type="button" className="ml-2" onClick={e => { e.stopPropagation(); onChangeOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc'); }}>
              {orderDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}

function SubMenuAgrupar({ onBack, groupBy, onChangeGroupBy, hideEmpty, onToggleHideEmpty, allColumns }) {
  return (
    <div className="flex flex-col gap-1 min-w-[280px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b bg-background sticky top-0 z-10"><button onClick={onBack}><ChevronLeft className="w-4 h-4" /></button><span className="font-semibold text-sm">Agrupar</span></div>
      <div className="flex flex-col gap-1 py-2">
        <div className="flex items-center gap-2 px-2 py-1">
          <span className="text-xs text-muted-foreground">Agrupar por</span>
          <select className="flex-1 border rounded px-2 py-1 text-sm" value={groupBy} onChange={e => onChangeGroupBy(e.target.value)}>
            <option value="">Nenhum</option>
            {allColumns.map(col => (
              <option key={col.id} value={col.id}>{col.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 px-2 py-1">
          <input type="checkbox" className="mr-2" checked={hideEmpty} onChange={onToggleHideEmpty} />
          <span className="text-xs">Ocultar grupos vazios</span>
        </div>
      </div>
    </div>
  );
}

function SubMenuLimite({ onBack, limit, onChangeLimit }) {
  return (
    <div className="flex flex-col gap-1 min-w-[220px]">
      <div className="flex items-center gap-2 px-2 py-2 border-b bg-background sticky top-0 z-10"><button onClick={onBack}><ChevronLeft className="w-4 h-4" /></button><span className="font-semibold text-sm">Carregar</span></div>
      <div className="flex flex-col gap-1 py-2">
        <select className="border rounded px-2 py-1 text-sm" value={limit} onChange={e => onChangeLimit(Number(e.target.value))}>
          {[10, 25, 50, 100].map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 