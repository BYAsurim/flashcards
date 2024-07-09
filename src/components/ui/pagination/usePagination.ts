import { useCallback, useMemo } from 'react'

// original code: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

type PaginationParams = {
  currentPage: number
  //itemsPerPage: number
  onPageChange: (pageNumber: number) => void
  siblings?: number
  totalPageCount: number
}

type PaginationRange = ('...' | number)[]

export const usePagination = ({
  currentPage,
  //itemsPerPage,
  onPageChange,
  siblings = 1,
  totalPageCount,
}: PaginationParams) => {
  const paginationRange = useMemo(() => {
    const DOTS = '...'

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblings + 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount)

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalPageCount, siblings, currentPage]) as PaginationRange

  const isLastPage = paginationRange?.at(-1)

  const firstPage = currentPage === 1
  const lastPage = currentPage === isLastPage

  const handleNextPageClicked = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])
  const handlePrevPageClicked = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const handleMainPageClicked = (pageNumber: number) => {
    return () => onPageChange(pageNumber)
  }

  return {
    firstPage,
    handleMainPageClicked,
    handleNextPageClicked,
    handlePrevPageClicked,
    lastPage,
    paginationRange: paginationRange || [],
  }
}
