// import {
//   SortableContext,
//   horizontalListSortingStrategy,
// } from '@dnd-kit/sortable'
// import { Text } from '@/components/ui/text'
// import emptyStateIcon from '@/assets/empty.svg'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import {
//   ColumnDef,
//   flexRender,
//   Header,
//   Row,
//   Table as TableInstance,
// } from '@tanstack/react-table'
// import { cn } from '@/lib/utils'
// import { DragAlongCell } from './data-table-drag-along-cell'
// import { useRef } from 'react'

// interface DataTableProps<TData, TValue> {
//   table: TableInstance<TData>
//   columns: ColumnDef<TData, TValue>[]
// }

// function TableHeadCell<TData, TValue>({
//   header,
// }: Readonly<{
//   header: Header<TData, TValue>
// }>) {
//   return (
//     <TableHead
//       className={cn(
//         'relative text-sm font-semibold h-10 px-0 last-of-type:pr-4 first-of-type:pl-1.5 whitespace-nowrap',
//         header.id === 'empty' && 'w-full p-0'
//       )}
//       style={{ minWidth: header.getSize() }}
//       data-testid={header.id}
//     >
//       {header.isPlaceholder
//         ? null
//         : flexRender(header.column.columnDef.header, header.getContext())}
//     </TableHead>
//   )
// }

// export default function DataTableContent<TData, TValue>({
//   table,
//   columns,
//   ...props
// }: Readonly<DataTableProps<TData, TValue>>) {
//   const previousSortingArrayLength = useRef(
//     table.initialState.sorting?.length ?? 0
//   )
//   const previousRows = useRef<Row<TData>[]>([])

//   const currentRows = table.getRowModel().rows ?? []
//   const currentSortingArrayLength = table.getState().sorting?.length ?? 0

//   const displayedRows = useRef<Row<TData>[]>([])

//   const deepEqualRows = () => {
//     if (previousRows.current.length !== currentRows.length) {
//       return false
//     }
//     return previousRows.current.every(
//       (value, index) => currentRows[index] === value
//     )
//   }

//   // If the last row-data is different from the current row-data (change in filtering, sorting, etc)
//   // synchronize the displayedRows to rerender to the table
//   if (!deepEqualRows()) {
//     // However, if the row-data is different due to sorting, where the previous state was one column
//     // and the current state is unsorted, do not sync the displayedRows
//     if (
//       !(
//         previousSortingArrayLength.current === 1 &&
//         currentSortingArrayLength === 0
//       )
//     ) {
//       displayedRows.current = currentRows
//     }
//   }

//   previousSortingArrayLength.current = currentSortingArrayLength
//   previousRows.current = currentRows

//   return (
//     <Table
//       className={cn(
//         (table.options.data.length === 0 ||
//           table.getRowModel().rows?.length === 0) &&
//           'h-full w-full'
//       )}
//       {...props}
//     >
//       <TableHeader className="bg-gray-300 h-10 sticky top-0 z-10 select-none">
//         {table.getHeaderGroups().map((headerGroup) => (
//           <TableRow
//             key={headerGroup.id}
//             className="hover:bg-gray-300"
//           >
//             <SortableContext
//               items={table.getState().columnOrder}
//               strategy={horizontalListSortingStrategy}
//             >
//               {headerGroup.headers.map((header: Header<TData, unknown>) => (
//                 <TableHeadCell
//                   header={header}
//                   key={header.id}
//                 />
//               ))}
//             </SortableContext>
//           </TableRow>
//         ))}
//       </TableHeader>
//       <TableBody className="h-full last-of-type:border-b last-of-type:border-border">
//         {displayedRows.current.length ? (
//           displayedRows.current.map((row) => (
//             <TableRow
//               key={row.id}
//               data-state={row.getIsSelected() && 'selected'}
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <SortableContext
//                   key={cell.id}
//                   items={table.getState().columnOrder}
//                   strategy={horizontalListSortingStrategy}
//                 >
//                   <DragAlongCell cell={cell} />
//                 </SortableContext>
//               ))}
//             </TableRow>
//           ))
//         ) : (
//           <TableRow className="w-full h-full">
//             <TableCell
//               colSpan={columns.length}
//               rowSpan={100}
//               className="text-center align-middle"
//             >
//               <div
//                 className="flex flex-col p-3.5 gap-y-6 items-center justify-center"
//                 data-testid="data-table-cell-wrapper"
//               >
//                 <img
//                   src={emptyStateIcon}
//                   alt="No data"
//                   className="w-32"
//                   data-testid="data-table-cell-empty-state-icon"
//                 />
//                 {table.options.data.length === 0 ? (
//                   <Text
//                     as="h4"
//                     variant="h4"
//                     weight="semibold"
//                     data-testid="data-table-empty-state-text"
//                   >
//                     There is nothing here.
//                   </Text>
//                 ) : (
//                   <div className="flex flex-col items-center gap-y-1">
//                     <Text
//                       as="h4"
//                       variant="h4"
//                       weight="semibold"
//                       data-testid="data-table-empty-state-text-no-results"
//                     >
//                       No results found.
//                     </Text>
//                     <Text
//                       as="h4"
//                       variant="h4"
//                       weight="semibold"
//                       data-testid="data-table-empty-state-text-adjust-filters"
//                     >
//                       Try adjusting your filters.
//                     </Text>
//                   </div>
//                 )}
//               </div>
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   )
// }
