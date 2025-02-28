import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Users,
  DollarSign,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";
import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom-components/data-table";
import { AreaChart } from "@tremor/react";

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
      render: (value: string) => value,
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

  const chartdata = [
    {
      date: "Jan",
      Revenue: 2890,
      Profit: 2400,
    },
    {
      date: "Feb",
      Revenue: 1890,
      Profit: 1398,
    },
    {
      date: "Mar",
      Revenue: 3890,
      Profit: 2980,
    },
    {
      date: "Apr",
      Revenue: 2890,
      Profit: 2198,
    },
    {
      date: "May",
      Revenue: 4890,
      Profit: 3570,
    },
    {
      date: "Jun",
      Revenue: 3890,
      Profit: 2800,
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
              <AreaChart
                className="h-[300px] mt-4"
                data={chartdata}
                index="date"
                categories={["Revenue", "Profit"]}
                colors={["indigo", "cyan"]}
                yAxisWidth={0}
                showAnimation={true}
                showLegend={false}
                showGridLines={false}
                showYAxis={false}
                showXAxis={false}
                valueFormatter={(number) => `₱${number.toLocaleString()}`}
                curveType="natural"
                allowDecimals={false}
                customTooltip={({ payload, active }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {payload.map((category, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground">
                              {category.name}
                            </span>
                            <span className="font-medium tabular-nums">
                              ₱{category.value?.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
              <div className="flex items-center gap-8 px-3 py-2 mt-4 rounded-md border">
                {["Revenue", "Profit"].map((category, index) => (
                  <div key={category} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: index === 0 ? "#818cf8" : "#22d3ee",
                      }}
                    />
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                ))}
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
