// import {
//   ColumnDef,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   TableState,
//   useReactTable,
// } from '@tanstack/react-table'
// import { useEffect, useState } from 'react'
// import {
//   DndContext,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   type DragEndEvent,
//   useSensor,
//   useSensors,
//   closestCorners,
// } from '@dnd-kit/core'
// import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
// import { arrayMove } from '@dnd-kit/sortable'
// import { DataTableToolbar } from './data-table-toolbar'
// import { DataTablePagination } from './data-table-pagination'
// import { cn } from '@/lib/utils'
// import DataTableContent from '@/components/data-table/data-table.tsx'

// export interface TableSelectColumnDataProps {
//   id: string
//   label: string
//   defaultVisible?: boolean
// }
// interface DataTableProps<TData, TValue> {
//   className?: string
//   data: TData[]
//   columns: ColumnDef<TData, TValue>[]
//   initialState?: Partial<TableState>
//   tableSelectColumnData: TableSelectColumnDataProps[]
//   toolbarLeftChildren?: React.ReactNode
//   toolbarRightChildren?: React.ReactNode
//   enablePagination?: boolean
//   enableColumnFilters?: boolean
//   enableColumnVisibility?: boolean
//   enableRowSelection?: boolean
//   enableSorting?: boolean
//   enableMultiSort?: boolean
//   persistKey?: string
// }

// export default function DataTable<TData, TValue>({
//   className,
//   data,
//   columns,
//   initialState,
//   tableSelectColumnData,
//   toolbarLeftChildren,
//   toolbarRightChildren,
//   enablePagination = false,
//   enableColumnFilters = false,
//   enableColumnVisibility = false,
//   enableSorting = false,
//   enableMultiSort = false,
//   enableRowSelection = false,
//   persistKey,
//   ...props
// }: Readonly<DataTableProps<TData, TValue>>) {
//   const defaultState: TableState = {
//     sorting: [],
//     columnFilters: [],
//     columnVisibility: {},
//     columnPinning: {},
//     columnOrder: columns.map((c) => c.id!),
//     grouping: [],
//     rowSelection: {},
//     columnSizing: {},
//     rowPinning: {},
//     columnSizingInfo: {
//       startOffset: 0,
//       startSize: 0,
//       deltaOffset: 0,
//       deltaPercentage: 0,
//       isResizingColumn: false,
//       columnSizingStart: [],
//     },
//     expanded: {},
//     globalFilter: undefined,
//     pagination: {
//       pageIndex: 0,
//       pageSize: 25,
//     },
//     ...initialState, // Pagination is preserved automatically due to autoResetPageIndex: false
//   }
//   const [state, setState] = useState<TableState>({
//     ...defaultState,
//   })

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
//     getFilteredRowModel: enableColumnFilters
//       ? getFilteredRowModel()
//       : undefined,
//     getPaginationRowModel: enablePagination
//       ? getPaginationRowModel()
//       : undefined,
//     isMultiSortEvent: () => enableMultiSort,
//     enableRowSelection,
//     columnResizeMode: 'onChange',
//     maxMultiSortColCount: 3,
//     autoResetPageIndex: false,
//     initialState: {
//       ...defaultState,
//     },
//   })

//   table.setOptions((prev) => ({
//     ...prev,
//     state,
//     onStateChange: (updater) => {
//       setState((old) => {
//         if (typeof updater === 'function') {
//           const updatedState = updater(old)
//           if (persistKey) {
//             localStorage.setItem(persistKey, JSON.stringify(updatedState))
//           }
//           return updatedState
//         } else {
//           if (persistKey) {
//             localStorage.setItem(persistKey, JSON.stringify(updater))
//           }
//           return updater
//         }
//       })
//     },
//   }))

//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event
//     if (active && over && active.id !== over.id) {
//       setState((old) => {
//         const columnOrder = arrayMove(
//           old.columnOrder!,
//           old.columnOrder!.indexOf(active.id as string),
//           old.columnOrder!.indexOf(over.id as string)
//         )

//         if (persistKey) {
//           const currentStateJson = localStorage.getItem(persistKey)
//           if (currentStateJson) {
//             const updateState = {
//               ...JSON.parse(currentStateJson),
//               columnOrder,
//             }
//             localStorage.setItem(persistKey, JSON.stringify(updateState))
//           }
//         }

//         return {
//           ...old,
//           columnOrder,
//         }
//       })
//     }
//   }

//   const handleReset = () => {
//     setState((prev) => {
//       const newState: TableState = {
//         ...defaultState,
//         pagination: prev.pagination,
//       }
//       if (persistKey) {
//         localStorage.setItem(persistKey, JSON.stringify(newState))
//       }
//       return newState
//     })
//   }

//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {})
//   )

//   useEffect(() => {
//     if (persistKey) {
//       const cachedState = localStorage.getItem(persistKey)
//       const localState = cachedState ? JSON.parse(cachedState) : state
//       setState(localState)
//     }
//   }, [persistKey])

//   return (
//     <DndContext
//       collisionDetection={closestCorners}
//       modifiers={[restrictToHorizontalAxis]}
//       onDragEnd={handleDragEnd}
//       sensors={sensors}
//     >
//       <div
//         className={cn('flex flex-col flex-1 overflow-hidden', className)}
//         style={{ direction: table.options.columnResizeDirection }}
//       >
//         {(enableColumnVisibility ||
//           toolbarLeftChildren ||
//           toolbarRightChildren) && (
//           <DataTableToolbar
//             table={table}
//             className="pt-6 pb-6.5"
//             toolbarLeftChildren={toolbarLeftChildren}
//             toolbarRightChildren={toolbarRightChildren}
//             tableSelectColumnData={tableSelectColumnData}
//             onReset={handleReset}
//           />
//         )}
//         <div className="rounded-md border border-border flex flex-col flex-1 overflow-hidden">
//           <DataTableContent
//             columns={columns}
//             table={table}
//             {...props}
//           />
//         </div>
//         {enablePagination && <DataTablePagination table={table} />}
//       </div>
//     </DndContext>
//   )
// }
