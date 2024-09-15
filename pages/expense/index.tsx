'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Row, Button, Table } from "antd";
import AppLayout from "@/layout/commonLayout";
import { ExpenseData } from "@/api/fake-api";
import { Expense } from "@/types";
import type { TableProps } from "antd"
import { DefaultPaginationValue } from "@/constants/AppConstants";
import AddExpenseDrawer from "@/components/Expense/AddDrawer";

export default function Expense() {
  const router = useRouter();
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [columnList, setColumns] = useState<TableProps<Expense>["columns"]>();
  const [openDrawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const onFinish = (e: Expense) => {
    setExpenseList((prevState) => [...prevState, e]);
    setDrawer(false);
  }

  const onRowClick = (val: Expense, idx: number | undefined) => {
    router.push(`/expense/${val.id}`)
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