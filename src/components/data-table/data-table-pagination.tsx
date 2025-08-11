// import {
//   faChevronLeft,
//   faChevronRight,
//   faChevronsLeft,
//   faChevronsRight,
// } from '@fortawesome/pro-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Table } from '@tanstack/react-table'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Button } from '@/components/ui/button'

// interface DataTablePaginationProps<TData> {
//   table: Table<TData>
// }

// export function DataTablePagination<TData>({
//   table,
// }: Readonly<DataTablePaginationProps<TData>>) {
//   return (
//     <div
//       data-testid="pagination-container"
//       className="flex items-center justify-end pt-6 pb-2 bg-white"
//     >
//       <div className="flex items-center space-x-12">
//         <div className="flex items-center space-x-2">
//           <p className="text-sm text-blue-900">Results per page</p>
//           <Select
//             value={`${table.getState().pagination.pageSize}`}
//             onValueChange={(value) => {
//               table.setPageSize(Number(value))
//               table.resetPageIndex()
//             }}
//             aria-label="PaginationDropdown"
//             data-testid="page-size-select"
//           >
//             <SelectTrigger
//               data-testid="pagination-select-trigger"
//               className="h-8 w-16 px-2 border-1 border-gray-500 text-blue-900"
//             >
//               <SelectValue placeholder={table.getState().pagination.pageSize} />
//             </SelectTrigger>
//             <SelectContent
//               data-testid="pagination-select-options"
//               side="top"
//               className="bg-accent-foreground text-blue-900"
//             >
//               {[25, 50, 100].map((pageSize) => (
//                 <SelectItem
//                   key={pageSize}
//                   value={`${pageSize}`}
//                   data-testid={`page-size-select-item-${pageSize}`}
//                 >
//                   {pageSize}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div
//           data-testid="pagination-page-counter"
//           className="flex w-[90px] items-center justify-center text-sm font-medium text-blue-900"
//         >
//           Page {table.getState().pagination.pageIndex + 1} of{' '}
//           {table.getRowModel().rows?.length ? table.getPageCount() : '1'}
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="secondary"
//             className="h-8 w-8 p-0 border-gray-600 rounded-sm"
//             onClick={() => table.firstPage()}
//             disabled={!table.getCanPreviousPage()}
//             data-testid="first-page-button"
//           >
//             <span className="sr-only">Go to first page</span>
//             <FontAwesomeIcon
//               icon={faChevronsLeft}
//               className="text-gray-600"
//             />
//           </Button>
//           <Button
//             variant="secondary"
//             className="h-8 w-8 p-0 border-gray-600 rounded-sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             data-testid="previous-page-button"
//           >
//             <span className="sr-only">Go to previous page</span>
//             <FontAwesomeIcon
//               icon={faChevronLeft}
//               className="text-gray-600"
//             />
//           </Button>
//           <Button
//             variant="secondary"
//             className="h-8 w-8 p-0 border-gray-600 rounded-sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             data-testid="next-page-button"
//           >
//             <span className="sr-only">Go to next page</span>
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="text-gray-600"
//             />
//           </Button>
//           <Button
//             variant="secondary"
//             className="h-8 w-8 p-0 border-gray-600 rounded-sm"
//             onClick={() => table.lastPage()}
//             disabled={!table.getCanNextPage()}
//             data-testid="last-page-button"
//           >
//             <span className="sr-only">Go to last page</span>
//             <FontAwesomeIcon
//               icon={faChevronsRight}
//               className="text-gray-600"
//             />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
