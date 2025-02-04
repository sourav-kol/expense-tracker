import AppLayout from "@/src/layout/commonLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-1/3 bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">₹3000</p>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/3 bg-crimson text-white">
          <CardHeader>
            <CardTitle className="font-bold">Expense This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">₹1000</p>
          </CardContent>
        </Card>
      </div>
      {/* charts here... */}
    </AppLayout>
  );
}

