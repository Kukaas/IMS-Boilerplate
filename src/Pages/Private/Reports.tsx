import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  LineChart,
  Search,
  Download,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { AreaChart } from "@tremor/react";
import { DataTable } from "@/components/custom-components/data-table";

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 4000, orders: 240, revenue: 8400 },
  { month: "Feb", sales: 3000, orders: 198, revenue: 6700 },
  { month: "Mar", sales: 5000, orders: 280, revenue: 9800 },
  { month: "Apr", sales: 2780, orders: 190, revenue: 5400 },
  { month: "May", sales: 4890, orders: 290, revenue: 9200 },
  { month: "Jun", sales: 3390, orders: 210, revenue: 7100 },
];

const topProducts = [
  { name: "Wireless Keyboard", sales: 145, revenue: 8700 },
  { name: "Gaming Mouse", sales: 132, revenue: 10560 },
  { name: "USB-C Cable", sales: 97, revenue: 1261 },
  { name: "Monitor Stand", sales: 85, revenue: 4250 },
  { name: "Laptop Sleeve", sales: 72, revenue: 2160 },
];

const columns = [
  {
    key: "name",
    label: "Product Name",
    render: (value: string) => <span className="font-medium">{value}</span>,
  },
  {
    key: "sales",
    label: "Units Sold",
    align: "center" as const,
    render: (value: number) => (
      <span className="text-muted-foreground">{value}</span>
    ),
  },
  {
    key: "revenue",
    label: "Revenue",
    align: "right" as const,
    render: (value: number) => (
      <span className="font-medium">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    ),
  },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("last30");
  const [reportType, setReportType] = useState("sales");

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="products">Product Analysis</SelectItem>
                  <SelectItem value="customers">Customer Insights</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">$45,231.89</p>
                <p className="text-sm text-green-600">
                  +12.5% from last period
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-sm text-green-600">+8.2% from last period</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Average Order Value
                </p>
                <p className="text-2xl font-bold">$36.33</p>
                <p className="text-sm text-red-600">-2.1% from last period</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Revenue Overview</h3>
              <AreaChart
                className="h-[300px] mt-4"
                data={salesData}
                index="month"
                categories={["revenue"]}
                colors={["indigo"]}
                yAxisWidth={0}
                showAnimation={true}
                showLegend={false}
                showGridLines={false}
                showYAxis={false}
                showXAxis={false}
                valueFormatter={(number) => `$${number.toLocaleString()}`}
                curveType="natural"
                allowDecimals={false}
                customTooltip={({ payload, active }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {payload[0]?.payload.month}
                        </span>
                        <span className="font-medium tabular-nums">
                          ${payload[0]?.value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Sales vs Orders</h3>
              <AreaChart
                className="h-[300px] mt-4"
                data={salesData}
                index="month"
                categories={["sales", "orders"]}
                colors={["indigo", "cyan"]}
                yAxisWidth={0}
                showAnimation={true}
                showLegend={false}
                showGridLines={false}
                showYAxis={false}
                showXAxis={false}
                valueFormatter={(number) => number.toLocaleString()}
                curveType="natural"
                allowDecimals={false}
                customTooltip={({ payload, active }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {payload.map((category, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground capitalize">
                              {category.name}
                            </span>
                            <span className="font-medium tabular-nums">
                              {category.name === "revenue" ? "$" : ""}
                              {category.value?.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
              <div className="flex items-center gap-8 px-3 py-2 mt-4 rounded-md border">
                {["sales", "orders"].map((category, index) => (
                  <div key={category} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: index === 0 ? "#818cf8" : "#22d3ee",
                      }}
                    />
                    <span className="text-sm font-medium capitalize">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Table */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Top Performing Products</h3>
            <DataTable columns={columns} data={topProducts} viewMode="table" />
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  );
}
