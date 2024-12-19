import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  currentPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => onPageChange(currentPage - 1)} // Call the passed handler
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {table.getPageCount()}
      </span>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => onPageChange(currentPage + 1)} // Call the passed handler
        disabled={currentPage === table.getPageCount()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
