export type NotionColumnType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "multiSelect"
  | "person"
  | "checkbox"
  | "url"
  | "email";

export interface NotionColumn {
  id: string;
  label: string;
  type: NotionColumnType;
  visible?: boolean;
  options?: { label: string; value: string }[];
}

export interface NotionFilter {
  column: string;
  operator: "contains" | "equals" | "startsWith" | "endsWith";
  value: string;
}

export interface NotionSortConfig {
  orderBy: string;
  orderDirection: "asc" | "desc";
}

export interface NotionGroupConfig {
  groupBy: string;
  hideEmpty: boolean;
}

export interface NotionTableProps {
  data: any[];
  columns: NotionColumn[];
  defaultSort?: NotionSortConfig;
  defaultFilters?: NotionFilter[];
  defaultGroupBy?: string;
  onRowClick?: (row: any) => void;
  onCellChange?: (row: any, columnId: string, value: any) => void;
}

export interface NotionTableHeaderProps {
  columns: NotionColumn[];
  filters: NotionFilter[];
  sortConfig: NotionSortConfig;
  groupConfig: NotionGroupConfig;
  onToggleColumn: (columnId: string) => void;
  onAddFilter: () => void;
  onRemoveFilter: (index: number) => void;
  onChangeFilter: (index: number, filter: NotionFilter) => void;
  onChangeSort: (config: NotionSortConfig) => void;
  onChangeGroup: (config: NotionGroupConfig) => void;
  onSearch: (value: string) => void;
}

export interface NotionTableRowProps {
  row: any;
  columns: NotionColumn[];
  onRowClick?: (row: any) => void;
  onCellChange?: (columnId: string, value: any) => void;
  isGroupHeader?: boolean;
  groupValue?: string;
  groupCount?: number;
  isDragging?: boolean;
  isOver?: boolean;
}

export interface NotionTableCellProps {
  value: any;
  type: NotionColumnType;
  options?: { label: string; value: string }[];
  onChange?: (value: any) => void;
  readOnly?: boolean;
}

export interface NotionPopoverMenuProps {
  columns: NotionColumn[];
  filters: NotionFilter[];
  sortConfig: NotionSortConfig;
  groupConfig: NotionGroupConfig;
  onToggleColumn: (columnId: string) => void;
  onAddFilter: () => void;
  onRemoveFilter: (index: number) => void;
  onChangeFilter: (index: number, filter: NotionFilter) => void;
  onChangeSort: (config: NotionSortConfig) => void;
  onChangeGroup: (config: NotionGroupConfig) => void;
}

export interface UseNotionTableProps {
  data: any[];
  columns: NotionColumn[];
  defaultSort?: NotionSortConfig;
  defaultFilters?: NotionFilter[];
  defaultGroupBy?: string;
}

export interface UseNotionTableReturn {
  processedData: any[];
  visibleColumns: NotionColumn[];
  filters: NotionFilter[];
  sortConfig: NotionSortConfig;
  groupConfig: NotionGroupConfig;
  toggleColumn: (columnId: string) => void;
  addFilter: () => void;
  removeFilter: (index: number) => void;
  changeFilter: (index: number, filter: NotionFilter) => void;
  changeSort: (config: NotionSortConfig) => void;
  changeGroup: (config: NotionGroupConfig) => void;
  handleSearch: (value: string) => void;
} 