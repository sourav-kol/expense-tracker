'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Row, Button, Table } from "antd";
import AppLayout from "@/layout/commonLayout";
import { Expense } from "@/types";
import type { TableProps } from "antd"
import { DefaultPaginationValue } from "@/constants/AppConstants";
import AddExpenseDrawer from "@/components/Expense/AddDrawer";
import { getExpenses, createExpenses } from "@/clientService/expenseService"

export default function Expenses() {
  const router = useRouter();
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [columnList, setColumns] = useState<TableProps<Expense>["columns"]>();
  const [openDrawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const onFinish = (e: Expense) => {
    createExpenses(e)
      .then(res => {
        setDrawer(false);
      }).catch(err => {
        console.log(err);
      })
  }

  const onRowClick = (val: Expense, idx: number | undefined) => {
    router.push(`/expense/${val._id}`)
  }

  useEffect(() => {
    setExpenseList(expenseList as Expense[]);
  }, [expenseList]);

  useEffect(() => {
    setColumns([{
      key: 'title',
      dataIndex: 'title',
      title: 'title',
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'category'
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'date'
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'amount'
    }]);

    //setExpenseList(ExpenseData.expenseList as Expense[]);

    //api call
    getExpenses().then((res) => {
      setExpenseList(res as Expense[]);
    });

    return () => {
      setExpenseList([]);
      setColumns([]);
      setDrawer(false);
    }
  }, [])

  return (
    <AppLayout>
      <h1>Expense</h1>
      <Col className="expense-section">
        <Row justify={"end"}>
          <Button type="primary" onClick={toggleDrawer}>Add Expense</Button>
        </Row>
        <Row>
          <section>
            {/* make as component */}
            <Table sticky={true} columns={columnList} dataSource={expenseList} pagination={{
              pageSize: DefaultPaginationValue.pageSize
            }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => { onRowClick(record, rowIndex) },
                };
              }} />
          </section>
        </Row>
      </Col>

      <AddExpenseDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} onFinish={(e) => onFinish(e)} />
    </AppLayout >
  );
}