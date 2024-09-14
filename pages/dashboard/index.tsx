import { DashboardData } from "@/api/fake-api";
import AppLayout from "@/layout/commonLayout";
import CardSection from "@/components/Dashboard/CardSection";
import { Flex } from "antd";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <Flex className="dashboard-flex" gap={"middle"} justify={"space-between"}>
        <CardSection Title="Total Expenses" Data={DashboardData.totalSpend} />
        <CardSection Title="Expense This Month" Data={DashboardData.spendThisMonth} />
      </Flex>
    </AppLayout>
  );
}