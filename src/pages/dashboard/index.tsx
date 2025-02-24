import AppLayout from "@/src/layout/commonLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "@/src/clientService/dashboardService";
import { DashBoard, DashBoardFilter } from "@/src/types";

export default function Dashboard() {

  const [dashBoardDetails, setDashBoardDetails] = useState<DashBoard>();

  useEffect(() => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1);

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

