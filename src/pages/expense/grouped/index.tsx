'use client'
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import AppLayout from "@/src/layout/commonLayout";
import { Expense, WeeklyExpenseSummary } from "@/src/types"; // Import the type we defined
import { getWeeklyGroupedExpenses } from "@/src/service/expense.service";
import { formattedDate } from "@/src/helper/dateTimeHelper";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

// 1. Move Column Definition outside or wrap in useMemo
const columnHelper = createColumnHelper<Expense>();
const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => `₹${info.getValue()}`,
  }),
  columnHelper.accessor('createdDate', {
    header: 'Date',
    cell: info => formattedDate(info.getValue() as string),
  }),
];

export default function Expenses() {
  const router = useRouter();
  const [weeklyData, setWeeklyData] = useState<WeeklyExpenseSummary[]>([]);

  useEffect(() => {
    getWeeklyGroupedExpenses().then((res) => {
      if (res) setWeeklyData(res);
    });
  }, []);

  return (
    <AppLayout title="Expense">
      <div className="p-2 mt-4 space-y-8">
        {weeklyData.map((week, index) => (
          <WeeklyTable key={`${week.year}-${week.weekNumber}`} weekData={week} router={router} />
        ))}
      </div>
    </AppLayout>
  );
}

function WeeklyTable({ weekData, router }: { weekData: WeeklyExpenseSummary, router: any }) {
  const table = useReactTable({
    data: weekData.expenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mb-8 bg-gray-500 rounded p-2">
      <div className="flex justify-between items-center mb-2 bg-gray-100 p-3 rounded shadow-sm">
        <h3 className="font-bold text-gray-700">
          Week {weekData.weekNumber} ({formattedDate(weekData.weekStartDate as string)})
        </h3>
        <span className="font-bold text-crimson">Total: ₹{weekData.totalAmount}</span>
      </div>

      <Table className="min-w-full bg-white border border-gray-200">
        <TableHeader className="bg-crimson">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-white px-4 py-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow 
              key={row.id} 
              className="hover:bg-gray-50 cursor-pointer" 
              onClick={() => router.push(`/expense/${row.original._id}`)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}