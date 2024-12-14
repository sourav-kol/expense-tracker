import AppLayout from "@/layout/commonLayout";
import CardSection from "@/components/Dashboard/CardSection";
import { Flex } from "antd";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <Flex className="dashboard-flex">
        <CardSection Title="Total Expenses" Data={3000} />
        <CardSection Title="Expense This Month" Data={1000} />
      </Flex>
    </AppLayout>
  );
}