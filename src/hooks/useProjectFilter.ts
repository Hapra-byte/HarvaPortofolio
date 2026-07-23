import { useState, useCallback } from "react";

export type FilterType = "all" | string;

export function useProjectFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const updateFilter = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
  }, []);

  return { activeFilter, updateFilter };
}
