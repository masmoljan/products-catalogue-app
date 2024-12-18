import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGINATION_OPTIONS } from "@/utils/constants";
import { ProductsPerPage } from "@/validation/pagination";
import { useState } from "react";
import { toast } from "sonner";

interface PaginationProps {
  total: number
  startPage: number,
  endPage: number,
  handlePagination: (start: number, end: number) => void,
  handleProductsPerPage: (total: number) => void,
}

export function BasicPagination({
  total,
  startPage,
  endPage,
  handlePagination,
  handleProductsPerPage
} : PaginationProps) {

  const [rowsPerPage, setRowsPerPage] = useState<number>(PAGINATION_OPTIONS[0]);

  const validateSelection = (value : number) => {
    const validate = ProductsPerPage.safeParse(value);
    if (!validate.success) {
      validate.error.issues.map(issue => toast(issue.message));
      return;
    }
    setRowsPerPage(+value);
    handleProductsPerPage(+value);
  };

  return (
    <footer className="border-t sticky min-w-full bottom-0 bg-stone-50 px-4">
      <div className="container min-w-full flex items-center justify-between py-2">
        <div className="w-1/3" />
        <div className="flex w-1/3 flex-1 justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={startPage === 0}
                  onClick={() => {
                    handlePagination(startPage - rowsPerPage, endPage - rowsPerPage);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  disabled={endPage >= total}
                  onClick={() => {
                    handlePagination(startPage + rowsPerPage, endPage + rowsPerPage);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex w-1/3 justify-end items-center gap-2">
          <p className="hidden sm:block text-sm">Show per page:</p>
          <Select 
            value={`${rowsPerPage}`}
            onValueChange={(value) => {
              validateSelection(+value);
            }}
          >
            <SelectTrigger className="max-w-fit">
              <SelectValue 
                placeholder={PAGINATION_OPTIONS[0]}
              />
            </SelectTrigger>
            <SelectContent className="min-w-0 max-w-fit">
              {PAGINATION_OPTIONS.map((option, index) => (
                <SelectItem
                  key={index} 
                  value={`${option}`}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
}

