import { useState, useMemo } from "react";
import { UseNotionTableProps, UseNotionTableReturn } from "./types";

export function useNotionTable({
  data,
  columns,
  defaultSort,
  defaultFilters = [],
  defaultGroupBy = "",
}: UseNotionTableProps): UseNotionTableReturn {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortConfig, setSortConfig] = useState(
    defaultSort || { orderBy: "", orderDirection: "asc" as const }
  );
  const [groupConfig, setGroupConfig] = useState({
    groupBy: defaultGroupBy,
    hideEmpty: false,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(col => ({ ...col, visible: col.visible !== false }))
  );
  const [searchValue, setSearchValue] = useState("");

  const processedData = useMemo(() => {
    let result = [...data];

    // Aplicar filtros
    if (filters.length > 0) {
      result = result.filter(row => {
        return filters.every(filter => {
          const value = row[filter.column]?.toString().toLowerCase() || "";
          const filterValue = filter.value.toLowerCase();

          switch (filter.operator) {
            case "contains":
              return value.includes(filterValue);
            case "equals":
              return value === filterValue;
            case "startsWith":
              return value.startsWith(filterValue);
            case "endsWith":
              return value.endsWith(filterValue);
            default:
              return true;
          }
        });
      });
    }

    // Aplicar busca global
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      result = result.filter(row => {
        return Object.entries(row).some(([key, value]) => {
          const column = visibleColumns.find(col => col.id === key);
          if (!column?.visible) return false;

          const strValue = value?.toString().toLowerCase() || "";
          return strValue.includes(searchLower);
        });
      });
    }

    // Aplicar ordenação
    if (sortConfig.orderBy) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.orderBy];
        const bValue = b[sortConfig.orderBy];

        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.orderDirection === "asc" ? comparison : -comparison;
      });
    }

    // Aplicar agrupamento
    if (groupConfig.groupBy) {
      const groups = new Map<string, any[]>();
      result.forEach(row => {
        const groupValue = row[groupConfig.groupBy]?.toString() || "Sem valor";
        if (!groups.has(groupValue)) {
          groups.set(groupValue, []);
        }
        groups.get(groupValue)?.push(row);
      });

      // Filtrar grupos vazios se necessário
      if (groupConfig.hideEmpty) {
        for (const [key, value] of groups.entries()) {
          if (value.length === 0) {
            groups.delete(key);
          }
        }
      }

      // Converter para array de grupos
      result = Array.from(groups.entries()).map(([key, value]) => ({
        __group: true,
        __groupValue: key,
        __groupCount: value.length,
        __groupItems: value,
      }));
    }

    return result;
  }, [data, filters, sortConfig, groupConfig, visibleColumns, searchValue]);

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const addFilter = () => {
    setFilters(prev => [
      ...prev,
      { column: visibleColumns[0]?.id || "", operator: "contains", value: "" },
    ]);
  };

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };

  const changeFilter = (index: number, filter: any) => {
    setFilters(prev =>
      prev.map((f, i) => (i === index ? { ...f, ...filter } : f))
    );
  };

  const changeSort = (config: any) => {
    setSortConfig(config);
  };

  const changeGroup = (config: any) => {
    setGroupConfig(config);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
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
  };
} 