import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Users,
  DollarSign,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";
import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom-components/data-table";

const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default function Dashboard() {
  const columns = [
    {
      key: "description",
      label: "Transaction",
      render: (value: string) => <span className="font-medium">{value}</span>,
      gridTemplate: (value: string) => (
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10">
          {value}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (value: Date) =>
        value.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    },
    {
      key: "amount",
      label: "Amount",
      align: "right" as const,
    },
  ];

  const transactions = [
    {
      id: 1,
      description: "Payment to Molly Sanders",
      status: "Complete",
      date: new Date(),
      amount: "₱250.00",
    },
    {
      id: 2,
      description: "Payment to Molly Sanders",
      status: "Complete",
      date: new Date(),
      amount: "₱250.00",
    },
    {
      id: 3,
      description: "Payment to Molly Sanders",
      status: "Complete",
      date: new Date(),
      amount: "₱250.00",
    },
    {
      id: 4,
      description: "Payment to Molly Sanders",
      status: "Complete",
      date: new Date(),
      amount: "₱250.00",
    },
    {
      id: 5,
      description: "Payment to Molly Sanders",
      status: "Complete",
      date: new Date(),
      amount: "₱250.00",
    },
  ];

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <Button variant="outline">Download Report</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                Chart Component Here
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">₱1,999.00</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Activities</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={transactions} viewMode="auto" />
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  );
}
