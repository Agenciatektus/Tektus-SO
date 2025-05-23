import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotionPopoverMenu } from "./NotionPopoverMenu";
import { NotionTableHeaderProps } from "./types";

export function NotionTableHeader({
  columns,
  filters,
  sortConfig,
  groupConfig,
  onToggleColumn,
  onAddFilter,
  onRemoveFilter,
  onChangeFilter,
  onChangeSort,
  onChangeGroup,
  onSearch,
}: NotionTableHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="flex items-center gap-2 p-2 border-b">
        <Input
          placeholder="Pesquisar..."
          value={searchValue}
          onChange={e => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <NotionPopoverMenu
          columns={columns}
          filters={filters}
          sortConfig={sortConfig}
          groupConfig={groupConfig}
          onToggleColumn={onToggleColumn}
          onAddFilter={onAddFilter}
          onRemoveFilter={onRemoveFilter}
          onChangeFilter={onChangeFilter}
          onChangeSort={onChangeSort}
          onChangeGroup={onChangeGroup}
        />
      </div>
      <div className="flex">
        {columns.map(col => {
          if (!col.visible) return null;

          const isSorted = sortConfig.orderBy === col.id;
          const isGrouped = groupConfig.groupBy === col.id;

          return (
            <div
              key={col.id}
              className={cn(
                "flex items-center gap-1 px-2 py-2 text-sm font-medium border-r",
                isSorted && "bg-muted/50",
                isGrouped && "bg-primary/5"
              )}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <span>{col.label}</span>
              {isSorted && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() =>
                    onChangeSort({
                      orderBy: col.id,
                      orderDirection: sortConfig.orderDirection === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  {sortConfig.orderDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      {filters.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted/50">
          {filters.map((filter, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-background rounded border"
            >
              <span className="font-medium">
                {columns.find(col => col.id === filter.column)?.label}
              </span>
              <span className="text-muted-foreground">
                {filter.operator === "contains" && "contém"}
                {filter.operator === "equals" && "igual a"}
                {filter.operator === "startsWith" && "começa com"}
                {filter.operator === "endsWith" && "termina com"}
              </span>
              <span className="font-medium">{filter.value}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => onRemoveFilter(idx)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 