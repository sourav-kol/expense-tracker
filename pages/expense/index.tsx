'use client'
import { useState, useEffect } from "react";
import { Col, Row, Button, Table } from "antd";
import AppLayout from "@/layout/commonLayout";
import { ExpenseData } from "@/api/fake-api";
import { Expense } from "@/types";
import type { TableProps } from "antd"
import { DefaultPaginationValue } from "@/constants/AppConstants";
import AddExpenseDrawer from "@/components/Expense/AddDrawer";

export default function Expense() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [columnList, setColumns] = useState<TableProps<Expense>["columns"]>();
  const [openDrawer, setDrawer] = useState<boolean>(false);
  //const [expense, setExpense] = useState<Expense>();

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const onFinish = (e: Expense) => {
    setExpenseList((prevState) => [...prevState, {
      id: Math.random() * 1000,
      title: e.title,
      category: e.category ?? 1,
      amount: e.amount,
      date: new Date().toDateString()
    }]);

    setDrawer(false);
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

    //api call
    setExpenseList(ExpenseData.expenseList as Expense[]);

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
            <Table columns={columnList} dataSource={expenseList} pagination={{
              pageSize: DefaultPaginationValue.pageSize
            }} />
          </section>
        </Row>
      </Col>

      <AddExpenseDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} onFinish={(e)=>onFinish(e)} />
    </AppLayout >
  );
}