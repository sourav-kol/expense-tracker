'use client'
import { useState, useEffect } from "react";
import { Col, Row, Button, Table, Drawer, Form, Input, Select } from "antd";
import AppLayout from "@/layout/commonLayout";
import { ExpenseData } from "@/api/fake-api";
import { Expense } from "@/types";
import type { TableProps } from "antd"
import { DefaultPaginationValue } from "@/constants/AppConstants";

export default function Expense() {
  const [expenseList, setExpense] = useState<Expense[]>([]);
  const [columnList, setColumns] = useState<TableProps<Expense>["columns"]>();
  const [openDrawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const onFinish = (e: Expense) => {
    setExpense((prevState) => [...prevState, {
      id: Math.random() * 1000,
      title: e.title,
      category: e.category ?? 1,
      amount: e.amount,
      date: new Date().toDateString()
    }]);

    setDrawer(false);
  }

  useEffect(() => {
    setExpense(expenseList as Expense[]);
  }, [expenseList]);

  useEffect(() => {
    setColumns([{
      key: 'title',
      dataIndex: 'title',
      title: 'title',
      width: 40
    },
    {
      width: 40,
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
    setExpense(ExpenseData.expenseList as Expense[]);

  }, [])

  return (
    <AppLayout>
      <h1>Expense</h1>
      <Col>
        <Row>
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

      {/* todo: make as component */}
      <Drawer
        maskClosable={false}
        closable
        destroyOnClose
        title={<p>Add Expense</p>}
        placement="right"
        open={openDrawer}
        onClose={() => setDrawer(false)}
        size={"large"}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<string>
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<number> label="Category" name="category" initialValue={1}>
            <Select
              key={"category"}
              style={{ width: 120 }}
              //onChange={() => { }}
              options={[
                { value: 1, label: 'Food', },
                { value: 2, label: 'Shopping' },
                { value: 3, label: 'Bills' },
                { value: 4, label: 'Entertainment' },
              ]}
            />
          </Form.Item>
          <Form.Item<number>
            label="Amount"
            name="amount"
            rules={[{ required: false }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </AppLayout >
  );
}