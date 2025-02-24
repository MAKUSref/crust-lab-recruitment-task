import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetUsersList from "@/hooks/useGetUsersList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  nextPage,
  prevPage,
  ResultsPerPage,
  setResultsPerPage,
} from "@/redux/session/sessionSlice";

const resultCount: ResultsPerPage[] = [5, 25, 100];

export default function ListFooter() {
  const { resultsPerPage, currentPage } = useAppSelector(
    (state) => state.session.userFilters
  );
  const { prevPageIndex, nextPageIndex } = useGetUsersList();

  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    if (nextPageIndex) {
      dispatch(nextPage());
    }
  };

  const handlePrevPage = () => {
    if (prevPageIndex) {
      dispatch(prevPage());
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between items-center px-3 py-2">
      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer select-none"
                onClick={handlePrevPage}
              />
            </PaginationItem>
            {!nextPageIndex && prevPageIndex && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {prevPageIndex && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={handlePrevPage}
                >
                  {prevPageIndex}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            {nextPageIndex && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={handleNextPage}
                >
                  {nextPageIndex}
                </PaginationLink>
              </PaginationItem>
            )}
            {!prevPageIndex && nextPageIndex && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer select-none"
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex gap-2">
        {resultCount.map((count, i) => (
          <Button
            key={i}
            variant={resultsPerPage === count ? "default" : "secondary"}
            onClick={() => dispatch(setResultsPerPage(count))}
          >
            {count}
          </Button>
        ))}
      </div>
    </div>
  );
}
