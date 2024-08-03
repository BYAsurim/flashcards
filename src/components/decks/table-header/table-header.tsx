import { ComponentPropsWithoutRef, FC } from 'react'

import { TableHead, TableHeadCell, TableRow } from '../table-elements'

export type TableHeadColumn = {
  key: string
  sortable?: boolean
  title: string
}
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type TableHeaderProps = {
  columns: TableHeadColumn[]
  setSort?: (sort: Sort) => void
  sort?: Sort
}

export const TableHeader: FC<
  Omit<ComponentPropsWithoutRef<'thead'> & TableHeaderProps, 'children'>
> = ({ columns, setSort, sort, ...restProps }) => {
  // const { setSort, sort } = useDeckParams()
  // const [sort, setSort] = useState<Sort>(null)

  const onSortHandler = (key: string, sortable: boolean) => () => {
    if (!sortable) {
      return
    }

    if (sort?.key !== key) {
      // return onSort({ direction: 'asc', key })
      return setSort?.({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      // return onSort(null)
      return setSort?.(null)
    }

    return setSort?.({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable = true, title }) => (
          <TableHeadCell key={key} onClick={onSortHandler(key, sortable)}>
            {title}
            {sortable && key === sort?.key && <span>{sort?.direction === 'asc' ? '▲' : '▼'}</span>}
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
