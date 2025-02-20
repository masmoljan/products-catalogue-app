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
import { setNextPage, setPreviousPage, setRowsPerPage } from "@/reducer/productPagination";
import { RootState } from "@/store";
import { PAGINATION_OPTIONS } from "@/utils/constants";
import { ProductsPerPage } from "@/validation/pagination";
import { throttle } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface PaginationProps {
  total: number
}

export function BasicPagination({
  total
} : PaginationProps) {

  const dispatch = useDispatch();

  const startPage = useSelector((state : RootState) => state.productPagination.startPage);
  const endPage = useSelector((state : RootState) => state.productPagination.endPage);
  const rowsPerPage = useSelector((state : RootState) => state.productPagination.rowsPerPage);

  const validateSelection = (value : number) => {
    const validate = ProductsPerPage.safeParse(value);
    if (!validate.success) {
      validate.error.issues.map(issue => toast(issue.message));
      return;
    }
    dispatch(setRowsPerPage({rowsPerPage: value}));
  };

  const getNextPage = useMemo(() => 
    throttle(() => dispatch(setNextPage()), 1000), [dispatch]
  );
  const getPreviousPage = useMemo(() => 
    throttle(() => dispatch(setPreviousPage()), 1000), [dispatch]
);


  useEffect(()=> {
    return () => {
      getNextPage.cancel();
      getPreviousPage.cancel();
    };
  }, [getNextPage, getPreviousPage]);
  

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
                  onClick={getPreviousPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  disabled={endPage >= total}
                  onClick={getNextPage}
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
                placeholder={`${rowsPerPage}`}
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

