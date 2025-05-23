import { useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotionTableCell } from "./NotionTableCell";
import { NotionTableRowProps } from "./types";

export function NotionTableRow({
  row,
  columns,
  onRowClick,
  onCellChange,
  isGroupHeader = false,
  groupValue,
  groupCount,
  isDragging = false,
  isOver = false,
}: NotionTableRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (isGroupHeader) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 bg-muted/50 text-sm font-medium">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
        <span>{groupValue}</span>
        <span className="text-muted-foreground">({groupCount})</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center border-b transition-all duration-150",
        onRowClick && "cursor-pointer hover:bg-muted/50",
        isDragging && "shadow-xl scale-95 opacity-80 z-10",
        isOver && "ring-2 ring-primary/80",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRowClick?.(row)}
    >
      {columns.map(col => {
        if (!col.visible) return null;

        return (
          <div key={col.id} className="flex-1 min-w-0 border-r last:border-r-0">
            <NotionTableCell
              value={row[col.id]}
              type={col.type}
              options={col.options}
              onChange={value => onCellChange?.(col.id, value)}
            />
          </div>
        );
      })}
      {isHovered && (
        <div className="flex items-center px-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={e => {
              e.stopPropagation();
              // TODO: Implementar menu de ações da linha
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 