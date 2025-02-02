import * as React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Expense } from '../types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

const defaultData: Expense[] = [
    {
        _id: '1',
        title: 'tanner',
        category: 'linsley',
        createdDate: "24",
        amount: 100
    },
    {
        _id: '1',
        title: 'tanner',
        category: 'linsley',
        createdDate: "24",
        amount: 100
    },
    {
        _id: '1',
        title: 'tanner',
        category: 'linsley',
        createdDate: "24",
        amount: 100
    }
]

const columnHelper = createColumnHelper<Expense>()

const columns = [
    columnHelper.accessor(row => row.title, {
        id: 'Title',
        cell: info => <>{info.getValue()}</>
    }),
    columnHelper.accessor(row => row.category, {
        id: 'Category',
        cell: info => <>{info.getValue()}</>
    }),
    columnHelper.accessor(row => row.createdDate, {
        id: 'Created Date',
        cell: info => <>{info.getValue()}</>
    }),
    columnHelper.accessor(row => row.amount, {
        id: 'Amount',
        cell: info => <>{info.getValue()}</>
    }),
]

function ExampleList() {
    const [data, _setData] = React.useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2">
            <Table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <TableHeader className="bg-crimson rounded-t-lg">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className="px-4 py-2 border-b border-gray-200 text-left text-sm font-medium text-white">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ExampleList;