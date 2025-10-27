'use client'

import { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Expense = {
  category: string
  description: string
  date: Date
  amount: number
}

interface Props {
  expenseHistory: Expense[]
}

export function ExpensesTable({ expenseHistory }: Props) {
  const columnHelper = createColumnHelper<Expense>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('category', {
        header: 'Gasto',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: 'Descripcion',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('date', {
        header: 'Fecha',
        cell: (info) => info.getValue().toISOString().split('T')[0],
      }),
      columnHelper.accessor('amount', {
        header: 'Cantidad',
        cell: (info) => `-${info.getValue()} $`,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: expenseHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section
      aria-label="Expenses list"
      className="bg-white rounded-xl py-4 h-auto"
    >
      {/* Table Header */}
      <div className="flex flex-row justify-between bg-white leading-[1.4em] px-6 text-sm text-[hsl(0,0%,30%)]">
        {table.getHeaderGroups()[0].headers.map((header) => (
          <div key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {table.getRowModel().rows.map((row, index) => (
        <div
          key={row.id}
          className={`flex flex-row justify-between items-center h-14 px-6 text-sm ${
            index % 2 === 0 ? 'bg-[#f1f1f1]' : 'bg-white'
          }`}
        >
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
