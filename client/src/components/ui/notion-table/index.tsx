import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { NotionPopoverMenu } from "./NotionPopoverMenu";
import { useNotionTable } from "./useNotionTable";
import { cn } from "@/lib/utils";
import { NotionTableHeader } from "./NotionTableHeader";
import { NotionTableRow } from "./NotionTableRow";
import { NotionTableProps } from "./types";

export function NotionTable({
  data,
  columns,
  defaultSort,
  defaultFilters,
  defaultGroupBy,
  onRowClick,
  onCellChange,
  activeDragId,
  overId,
}: NotionTableProps & { activeDragId?: string | null; overId?: string | null }) {
  const {
    processedData,
    visibleColumns,
    filters,
    sortConfig,
    groupConfig,
    toggleColumn,
    addFilter,
    removeFilter,
    changeFilter,
    changeSort,
    changeGroup,
    handleSearch,
  } = useNotionTable({
    data,
    columns,
    defaultSort,
    defaultFilters,
    defaultGroupBy,
  });

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <NotionTableHeader
        columns={visibleColumns}
        filters={filters}
        sortConfig={sortConfig}
        groupConfig={groupConfig}
        onToggleColumn={toggleColumn}
        onAddFilter={addFilter}
        onRemoveFilter={removeFilter}
        onChangeFilter={changeFilter}
        onChangeSort={changeSort}
        onChangeGroup={changeGroup}
        onSearch={handleSearch}
      />
      <div className="flex-1 overflow-auto">
        {processedData.map((row, index) => {
          if (row.__group) {
            return (
              <NotionTableRow
                key={`group-${row.__groupValue}`}
                row={row}
                columns={visibleColumns}
                isGroupHeader
                groupValue={row.__groupValue}
                groupCount={row.__groupCount}
              />
            );
          }

          return (
            <NotionTableRow
              key={index}
              row={row}
              columns={visibleColumns}
              onRowClick={onRowClick}
              onCellChange={value => onCellChange?.(row, value)}
              isDragging={activeDragId === row.id}
              isOver={overId === row.id}
            />
          );
        })}
      </div>
    </div>
  );
} 