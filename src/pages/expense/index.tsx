'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Row, Button, Table } from "antd";
import AppLayout from "@/src/layout/commonLayout";
import { Category, Expense, Paged, Pagination } from "@/src/types";
import type { TableProps } from "antd"
import { DefaultPaginationValue, DefaultCategory } from "@/src/constants/AppConstants";
import AddExpenseDrawer from "@/src/components/Expense/AddDrawer";
import { getExpenses, createExpenses } from "@/src/clientService/expenseService";
import { formattedDate } from "@/src/helper/dateTimeHelper";

export default function Expenses() {
  const router = useRouter();
  const [expenseList, setExpenseList] = useState<Paged<Expense>>({
    data: [],
    total: 0
  });
  const [columnList, setColumns] = useState<TableProps<Expense>["columns"]>();
  const [openDrawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  }

  const defaultFilter: Pagination = {
    page: DefaultPaginationValue.page,
    pageSize: DefaultPaginationValue.pageSize
  }

  const onFinish = (e: Expense) => {
    createExpenses(e)
      .then(res => {
        setDrawer(false);
        getExpenseData(defaultFilter)
      }).catch(err => {
        console.log(err);
      })
  }

  const onRowClick = (val: Expense, idx: number | undefined) => {
    router.push(`/expense/${val._id}`)
  }

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
      key: 'createdDate',
      dataIndex: 'createdDate',
      title: 'created date'
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'amount'
    }]);

    //api call
    getExpenseData(defaultFilter);

    return () => {
      setExpenseList({
        data: [],
        total: 0
      });
      setColumns([]);
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
  }

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
            <Table sticky={true} columns={columnList} dataSource={expenseList.data}
              pagination={{
                total: expenseList.total,
                pageSize: DefaultPaginationValue.pageSize,
                onChange(page, pageSize) {
                  var filter: Pagination = {
                    page,
                    pageSize: DefaultPaginationValue.pageSize
                  }
                  getExpenseData(filter);
                },
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