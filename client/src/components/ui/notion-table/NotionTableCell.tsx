import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown, Info } from "lucide-react";
import { format, isAfter, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NotionTableCellProps {
  value: any;
  type: "text" | "number" | "date" | "select" | "multiSelect" | "person" | "checkbox" | "url" | "email";
  options?: { label: string; value: string; color?: string; description?: string }[];
  onChange?: (value: any) => void;
  readOnly?: boolean;
}

export function NotionTableCell({
  value,
  type,
  options,
  onChange,
  readOnly = false,
}: NotionTableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (onChange) {
      onChange(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (type === "date") {
    const date = value ? new Date(value) : null;
    const isPast = date ? isBefore(date, startOfDay(new Date())) : false;
    const isFuture = date ? isAfter(date, startOfDay(new Date())) : false;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full px-2 py-1 text-left text-sm transition-all duration-200",
                    !value && "text-muted-foreground",
                    readOnly && "cursor-default",
                    isPast && "text-red-500",
                    isFuture && "text-green-500"
                  )}
                >
                  {value ? (
                    format(new Date(value), "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    onChange?.(date?.toISOString());
                    setOpen(false);
                  }}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent>
            {isPast ? "Data passada" : isFuture ? "Data futura" : "Data atual"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (type === "select") {
    const option = options?.find((opt) => opt.value === value);
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Select
              value={value}
              onValueChange={onChange}
              disabled={readOnly}
            >
              <SelectTrigger className="h-8 border-none px-2 py-1 transition-all duration-200 hover:bg-muted/50">
                <SelectValue>
                  {option && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-normal transition-colors duration-200",
                        option.color
                      )}
                    >
                      {option.label}
                    </Badge>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-normal transition-colors duration-200",
                          option.color
                        )}
                      >
                        {option.label}
                      </Badge>
                      {option.description && (
                        <Info className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipTrigger>
          {option?.description && (
            <TooltipContent>
              {option.description}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (type === "multiSelect") {
    const selectedValues = Array.isArray(value) ? value : [];
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center gap-1 px-2 py-1 text-left text-sm transition-all duration-200",
              !selectedValues.length && "text-muted-foreground",
              readOnly && "cursor-default",
              "hover:bg-muted/50"
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedValues.map((v) => {
                  const option = options?.find((opt) => opt.value === v);
                  return (
                    <TooltipProvider key={v}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "flex items-center gap-1 font-normal transition-all duration-200",
                              option?.color,
                              "hover:opacity-80"
                            )}
                          >
                            {option?.label}
                            {!readOnly && (
                              <X
                                className="h-3 w-3 cursor-pointer transition-colors duration-200 hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onChange?.(selectedValues.filter((val) => val !== v));
                                }}
                              />
                            )}
                          </Badge>
                        </TooltipTrigger>
                        {option?.description && (
                          <TooltipContent>
                            {option.description}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ) : (
              <span>Selecione...</span>
            )}
            <ChevronDown className="ml-auto h-4 w-4 opacity-50 transition-transform duration-200" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup>
              {options
                ?.sort((a, b) => a.label.localeCompare(b.label))
                .map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newValue = selectedValues.includes(option.value)
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      onChange?.(newValue);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {selectedValues.includes(option.value) && (
                        <Check className="h-4 w-4 transition-colors duration-200" />
                      )}
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-normal transition-colors duration-200",
                          option.color
                        )}
                      >
                        {option.label}
                      </Badge>
                      {option.description && (
                        <Info className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  if (type === "person") {
    const option = options?.find((opt) => opt.value === value);
    if (!option) return null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 px-2 py-1 transition-all duration-200 hover:bg-muted/50">
              <Avatar className="h-6 w-6 transition-transform duration-200 hover:scale-110">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${option.label}`} />
                <AvatarFallback>{option.label.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{option.label}</span>
            </div>
          </TooltipTrigger>
          {option.description && (
            <TooltipContent>
              {option.description}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (readOnly) {
    return <div className="px-2 py-1">{renderValue()}</div>;
  }

  if (isEditing) {
    return (
      <div className="px-2 py-1">
        {renderEditor()}
      </div>
    );
  }

  return (
    <div
      className="px-2 py-1 hover:bg-muted/50 cursor-pointer rounded"
      onClick={() => setIsEditing(true)}
    >
      {renderValue()}
    </div>
  );

  function renderValue() {
    switch (type) {
      case "text":
        return <span className="text-sm">{value || ""}</span>;
      
      case "number":
        return <span className="text-sm">{value?.toLocaleString() || ""}</span>;
      
      case "date":
        return value ? (
          <span className="text-sm">
            {format(new Date(value), "dd/MM/yyyy", { locale: ptBR })}
          </span>
        ) : null;
      
      case "select":
        return value ? (
          <Badge variant="secondary" className="text-xs">
            {options?.find(opt => opt.value === value)?.label || value}
          </Badge>
        ) : null;
      
      case "multiSelect":
        return (
          <div className="flex flex-wrap gap-1">
            {value?.map((v: string) => (
              <Badge key={v} variant="secondary" className="text-xs">
                {options?.find(opt => opt.value === v)?.label || v}
              </Badge>
            ))}
          </div>
        );
      
      case "person":
        return value ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={value.avatar} />
              <AvatarFallback>{value.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{value.name}</span>
          </div>
        ) : null;
      
      case "checkbox":
        return (
          <Checkbox
            checked={value}
            onCheckedChange={onChange}
            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
        );
      
      case "url":
        return value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
            onClick={e => e.stopPropagation()}
          >
            {value}
          </a>
        ) : null;
      
      case "email":
        return value ? (
          <a
            href={`mailto:${value}`}
            className="text-sm text-primary hover:underline"
            onClick={e => e.stopPropagation()}
          >
            {value}
          </a>
        ) : null;
      
      default:
        return <span className="text-sm">{value || ""}</span>;
    }
  }

  function renderEditor() {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            value={editValue || ""}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        );
      
      case "number":
        return (
          <input
            type="number"
            value={editValue || ""}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        );
      
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !editValue && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {editValue ? (
                  format(new Date(editValue), "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={editValue ? new Date(editValue) : undefined}
                onSelect={date => {
                  setEditValue(date?.toISOString());
                  handleSave();
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      
      case "select":
        return (
          <select
            value={editValue || ""}
            onChange={e => {
              setEditValue(e.target.value);
              handleSave();
            }}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          >
            <option value="">Selecione...</option>
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case "multiSelect":
        return (
          <div className="flex flex-wrap gap-1 p-1 border rounded">
            {options?.map(opt => (
              <Badge
                key={opt.value}
                variant={editValue?.includes(opt.value) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  const newValue = editValue?.includes(opt.value)
                    ? editValue.filter((v: string) => v !== opt.value)
                    : [...(editValue || []), opt.value];
                  setEditValue(newValue);
                  handleSave();
                }}
              >
                {opt.label}
              </Badge>
            ))}
          </div>
        );
      
      case "person":
        return (
          <select
            value={editValue?.id || ""}
            onChange={e => {
              const selected = options?.find(opt => opt.value === e.target.value);
              setEditValue(selected);
              handleSave();
            }}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          >
            <option value="">Selecione...</option>
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case "url":
      case "email":
        return (
          <input
            type={type === "email" ? "email" : "url"}
            value={editValue || ""}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        );
      
      default:
        return null;
    }
  }
} 