import AppLayout from "@/src/layout/commonLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { getDashboardChartData, getDashboardDetails } from "@/src/service/dashboard.service";
import { ChartData, DashBoard, DashBoardFilter } from "@/src/types";
import { formattedDate } from "@/src/helper/dateTimeHelper";

import { DonutChart } from "@/src/components/dashboard/MonthlyExpenseChart";
import { set } from "lodash";

export default function Dashboard() {

  const [dashBoardDetails, setDashBoardDetails] = useState<DashBoard>();
  const [billingExpense, setBillingExpense] = useState<DashBoard>();

  const [dateRange, setDateRange] = useState<{ startDate: Date, endDate: Date }>();
  const [billingDateRange, setBillingDateRange] = useState<{ billingStartDate: Date, billinEndDate: Date }>();

  const [monthlyChartData, setMonthlyChartData] = useState<ChartData[]>([]);
  const [billlingChartData, setBillingChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1);

    const startOfBillingMonth = new Date(new Date().getFullYear(), (new Date().getMonth() - 1), 12);
    const endOfBillingMonth = new Date(new Date().getFullYear(), (new Date().getMonth()), 12);

    setDateRange({ startDate: startOfMonth, endDate: endOfMonth });
    setBillingDateRange({ billingStartDate: startOfBillingMonth, billinEndDate: endOfBillingMonth });

    var filter: DashBoardFilter = {
      startDate: startOfMonth,
      endDate: endOfMonth
    };

    var filterBillingExpense: DashBoardFilter = {
      startDate: startOfBillingMonth,
      endDate: endOfBillingMonth
    };
    getDashboardDetails(filter)
      .then(data => {
        setDashBoardDetails({ ...data, totalExpense: "N/A" });
      })

    getDashboardDetails(filterBillingExpense)
      .then(data => {
        setBillingExpense({ ...data, totalExpense: "N/A" });
      });

    getDashboardChartData(filter)
      .then(data => {
        setMonthlyChartData(data);
      });

    getDashboardChartData(filterBillingExpense)
      .then(data => {
        setBillingChartData(data);
      });
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-6">
        <Card className="w-11/12 md:w-5/12 max-w-md bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Expense This Month</CardTitle>
            <p className="text-xs">
              {dateRange &&
                `${formattedDate(dateRange.startDate.toString())} - ${formattedDate(dateRange.endDate.toString())}`}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">₹ {dashBoardDetails?.currentMonthExpense}</p>
            <hr className="my-4 border-white/30" />
            <CardContent className="flex justify-center items-center">
              <DonutChart chartData={monthlyChartData} />
            </CardContent>
          </CardContent>
        </Card>
        <Card className="w-11/12 md:w-5/12 max-w-md bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Billing Expense</CardTitle>
            <p className="text-xs">
              {billingDateRange &&
                `${formattedDate(billingDateRange.billingStartDate.toString())} - ${formattedDate(
                  billingDateRange.billinEndDate.toString()
                )}`}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">₹ {billingExpense?.currentMonthExpense}</p>
            <hr className="my-4 border-white/30" />
            <CardContent className="flex justify-center items-center">
              <DonutChart chartData={billlingChartData} />
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

