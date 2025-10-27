'use client'

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

//TData
type Expense = {
  amount: number
  category?: string
  description?: string
  date: Date
}

const columnHelper = createColumnHelper<Expense>()

const columns = [
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
]

export default function ExpensesTable() {
  const [data, setData] = useState<Expense[]>([
    {
      amount: 45.5,
      category: 'Transporte',
      description: 'Taxi al trabajo',
      date: new Date('2025-10-25'),
    },
    {
      amount: 120.0,
      category: 'Comida',
      description: 'Cena con amigos',
      date: new Date('2025-10-24'),
    },
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // mandatory
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
