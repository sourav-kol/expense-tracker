import AppLayout from "@/src/layout/commonLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "@/src/clientService/dashboardService";
import { DashBoard, DashBoardFilter } from "@/src/types";
import { formattedDate } from "@/src/helper/dateTimeHelper";

export default function Dashboard() {

  const [dashBoardDetails, setDashBoardDetails] = useState<DashBoard>();
  const [dateRange, setDateRange] = useState<{ startDate: Date, endDate: Date }>(); 
  useEffect(() => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1);

    setDateRange({ startDate: startOfMonth, endDate: endOfMonth });

    var filter: DashBoardFilter = {
      startDate: startOfMonth,
      endDate: endOfMonth
    }
    getDashboardDetails(filter)
      .then(data => {
        setDashBoardDetails({...data, totalExpense: "N/A"});
      })
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-1/3 bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{dashBoardDetails?.totalExpense}</p>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Expense This Month</CardTitle>
            <p className="text-xs">{dateRange && `${formattedDate(dateRange.startDate.toString())} - ${formattedDate(dateRange.endDate.toString())}`}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">₹ {dashBoardDetails?.currentMonthExpense}</p>
          </CardContent>
        </Card>
      </div>
      {/* charts here... */}
    </AppLayout>
  );
}

