import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select } from '../select'
import { Typography } from '../typography'
import { usePagination } from './usePagination'

type PaginationConditionals =
  | {
      itemsPerPage?: null
      onPerPageChange?: never
      perPageOptions?: never
    }
  | {
      itemsPerPage?: number
      onPerPageChange: (itemsPerPage: number) => void
      perPageOptions: number[]
    }

export type PaginationProps = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  siblings?: number
  totalPageCount?: number
} & PaginationConditionals

export const Pagination = ({
  className,
  currentPage = 1,
  itemsPerPage = null,
  onPageChange,
  onPerPageChange,
  perPageOptions,
  siblings,
  totalPageCount = 1,
}: PaginationProps) => {
  const {
    firstPage,
    handleMainPageClicked,
    handleNextPageClicked,
    handlePrevPageClicked,
    lastPage,
    paginationRange,
  } = usePagination({ currentPage, onPageChange, siblings, totalPageCount })

  const showPerPageSelect = !!itemsPerPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.container}>
        <PrevButton disabled={firstPage} onClick={handlePrevPageClicked} />
        <PaginationButtons
          currentPage={currentPage}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton disabled={lastPage} onClick={handleNextPageClicked} />
      </div>
      {showPerPageSelect && (
        <ItemsPerPageSelect {...{ itemsPerPage, onPerPageChange, perPageOptions }} />
      )}
    </div>
  )
}

type NavigationButtonProps = {
  disabled?: boolean
  onClick: () => void
}

type PageButtonProps = {
  page: number
  selected: boolean
} & NavigationButtonProps

const PageButton = ({ disabled, onClick, page, selected }: PageButtonProps) => {
  return (
    <button
      className={clsx(s.item, selected && s.selected)}
      disabled={selected || disabled}
      onClick={onClick}
      type={'button'}
    >
      {page}
    </button>
  )
}
const PrevButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick} type={'button'}>
      <ChevronLeftIcon className={s.icon} />
    </button>
  )
}
const NextButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick} type={'button'}>
      <ChevronRightIcon className={s.icon} />
    </button>
  )
}

const Dots = () => {
  return <span>&#8230;</span>
}

type PaginationButtonsProps = {
  currentPage: number
  onClick: (pageNumber: number) => () => void
  paginationRange: (number | string)[]
}

const PaginationButtons = ({ currentPage, onClick, paginationRange }: PaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, idx) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={idx} />
        }

        return <PageButton key={idx} onClick={onClick(page)} page={page} selected={isSelected} />
      })}
    </>
  )
}

type ItemsPerPageProps = {
  itemsPerPage: number
  onPerPageChange: (itemsPerPage: number) => void
  perPageOptions: number[]
}

export const ItemsPerPageSelect = ({
  itemsPerPage,
  onPerPageChange,
  perPageOptions,
}: ItemsPerPageProps) => {
  const selectOptions = perPageOptions.map((option: number) => ({
    label: option.toString(),
    value: option.toString(),
  }))

  const onPerPageChangeHandler = (itemsPerPage: string) => {
    onPerPageChange(+itemsPerPage)
  }

  return (
    <div className={s.selectContainer}>
      <Typography as={'span'} variant={'body2'}>
        Show
      </Typography>
      <Select
        onValueChange={onPerPageChangeHandler}
        options={selectOptions}
        value={itemsPerPage.toString()}
        variant={'pagination'}
      ></Select>

      <Typography as={'span'} variant={'body2'}>
        on page
      </Typography>
    </div>
  )
}
