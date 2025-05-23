import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Settings2, Eye, Filter, ArrowUpDown, Layers } from "lucide-react";
import { NotionPopoverMenuProps } from "./types";

export function NotionPopoverMenu({
  columns,
  visibleColumns,
  onToggleColumn,
  onAddFilter,
  onRemoveFilter,
  onSortChange,
  onGroupChange,
  filters = [],
  sortConfig,
  groupConfig,
}: NotionPopoverMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="flex flex-col">
          {/* Colunas */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
              <Eye className="h-4 w-4" />
              Colunas
            </div>
            <ScrollArea className="h-[200px]">
              <div className="p-2 space-y-1">
                {columns.map(column => (
                  <div
                    key={column.id}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded"
                  >
                    <Checkbox
                      id={column.id}
                      checked={column.visible}
                      onCheckedChange={() => onToggleColumn(column.id)}
                    />
                    <Label
                      htmlFor={column.id}
                      className="flex-1 cursor-pointer"
                    >
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Filtros */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filtros
            </div>
            <div className="p-2 space-y-2">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 text-sm bg-muted rounded"
                >
                  <span className="flex-1">
                    {columns.find(col => col.id === filter.columnId)?.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onRemoveFilter(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onAddFilter()}
              >
                Adicionar Filtro
              </Button>
            </div>
          </div>

          <Separator />

          {/* Ordenação */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
              <ArrowUpDown className="h-4 w-4" />
              Ordenação
            </div>
            <div className="p-2 space-y-2">
              <select
                value={sortConfig?.orderBy || ""}
                onChange={e => onSortChange({ orderBy: e.target.value, orderDirection: "asc" })}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                <option value="">Selecione uma coluna</option>
                {columns.map(column => (
                  <option key={column.id} value={column.id}>
                    {column.label}
                  </option>
                ))}
              </select>
              {sortConfig?.orderBy && (
                <select
                  value={sortConfig.orderDirection}
                  onChange={e => onSortChange({ ...sortConfig, orderDirection: e.target.value as "asc" | "desc" })}
                  className="w-full px-2 py-1 text-sm border rounded"
                >
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              )}
            </div>
          </div>

          <Separator />

          {/* Agrupamento */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
              <Layers className="h-4 w-4" />
              Agrupar por
            </div>
            <div className="p-2">
              <select
                value={groupConfig?.groupBy || ""}
                onChange={e => onGroupChange({ groupBy: e.target.value, hideEmpty: false })}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                <option value="">Nenhum</option>
                {columns.map(column => (
                  <option key={column.id} value={column.id}>
                    {column.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 