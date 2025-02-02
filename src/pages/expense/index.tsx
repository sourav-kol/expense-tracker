'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppLayout from "@/src/layout/commonLayout";
import { Expense, Paged, Pagination } from "@/src/types";
import { DefaultPaginationValue, DefaultCategory } from "@/src/constants/AppConstants";
import { getExpenses, createExpenses } from "@/src/clientService/expenseService";
import { formattedDate } from "@/src/helper/dateTimeHelper";
import { Button } from "@/src/components/ui/button";
import AddExpenseDrawer from "@/src/components/Expense/AddDrawer";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"


export default function Expenses() {
  const router = useRouter();
  const [expenseList, setExpenseList] = useState<Paged<Expense>>({
    data: [],
    total: 0
  });

  const [openDrawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const defaultFilter: Pagination = {
    page: DefaultPaginationValue.page,
    pageSize: DefaultPaginationValue.pageSize
  }

  const onFinish = (e: Expense) => {
    console.log(e);
    // createExpenses(e)
    //   .then(res => {
    //     setDrawer(false);
    //     getExpenseData(defaultFilter)
    //   }).catch(err => {
    //     console.log(err);
    //   })
  }

  const onRowClick = (val: Expense, idx: number | undefined) => {
    router.push(`/expense/${val._id}`)
  }

  useEffect(() => {
    //api call
    getExpenseData(defaultFilter);

    return () => {
      setExpenseList({
        data: [],
        total: 0
      });
      setDrawer(false);
    }
  }, [])

  const getExpenseData = (filter: Pagination) => {
    getExpenses(filter).then((res) => {
      res.data = res.data.map(item => (
        {
          ...item,
          createdDate: formattedDate(item.createdDate),
          category: DefaultCategory[item.category.toString()]
        }
      )
      );
      setExpenseList(res);
    });
  };

  const columnHelper = createColumnHelper<Expense>();

  //todo: consider changing this 
  //and using better way to define columns
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

  const table = useReactTable({
    data: expenseList.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <AppLayout>
      <h1 className="text-center text-2xl font-bold mb-4 sticky top-24 z-10">Expense</h1>
      <div className="flex justify-end mb-4">
        <Button className="bg-gray-800 text-white hover:bg-crimson" onClick={toggleDrawer}>Add Expense</Button>
      </div>
      <div className="p-2 mt-4">
        <Table className="min-w-full bg-white border border-gray-200">
          <TableHeader className="bg-crimson">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-white">
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
              <TableRow key={row.id} className="hover:bg-gray-50 px-2" onClick={() => onRowClick(row.original, row.index)}>
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

      <AddExpenseDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} onFinish={(e) => onFinish(e)} />
    </AppLayout >
  );
}