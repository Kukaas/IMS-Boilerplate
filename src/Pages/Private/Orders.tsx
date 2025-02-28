import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { DataTable } from "@/components/custom-components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Package,
  Calendar,
  Clock,
  Table2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  total: number;
}

interface OrderProduct {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderDetails extends Order {
  products: OrderProduct[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
}

const columns = [
  {
    key: "orderNumber",
    label: "Order Number",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{value}</span>
      </div>
    ),
    gridTemplate: (value: string) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "customerName",
    label: "Customer",
    render: (value: string) => (
      <span className="text-sm font-medium">{value}</span>
    ),
  },
  {
    key: "items",
    label: "Items",
    align: "center" as const,
    render: (value: number) => (
      <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
        {value} items
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Delivered":
            return "bg-green-100 text-green-800";
          case "Processing":
            return "bg-blue-100 text-blue-800";
          case "Pending":
            return "bg-yellow-100 text-yellow-800";
          case "Shipped":
            return "bg-purple-100 text-purple-800";
          case "Cancelled":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
            value
          )}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: "date",
    label: "Order Date",
    render: (value: string) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: "total",
    label: "Total",
    align: "right" as const,
    render: (value: number) => (
      <span className="font-medium">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    ),
  },
];

const sampleOrders: OrderDetails[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "John Smith",
    items: 3,
    status: "Delivered",
    date: "2024-03-20",
    total: 152.97,
    products: [
      {
        id: "1",
        name: "Wireless Keyboard",
        sku: "KB-001",
        quantity: 1,
        price: 59.99,
        subtotal: 59.99,
      },
      {
        id: "2",
        name: "Gaming Mouse",
        sku: "MS-002",
        quantity: 1,
        price: 79.99,
        subtotal: 79.99,
      },
      {
        id: "3",
        name: "USB-C Cable",
        sku: "CB-003",
        quantity: 1,
        price: 12.99,
        subtotal: 12.99,
      },
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    subtotal: 152.97,
    shippingCost: 10.0,
    tax: 12.24,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "Emma Wilson",
    items: 1,
    status: "Processing",
    date: "2024-03-21",
    total: 79.99,
    products: [
      {
        id: "4",
        name: "Wireless Keyboard",
        sku: "KB-001",
        quantity: 1,
        price: 59.99,
        subtotal: 59.99,
      },
    ],
    shippingAddress: {
      street: "456 Elm St",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    subtotal: 79.99,
    shippingCost: 5.0,
    tax: 6.24,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerName: "Michael Brown",
    items: 2,
    status: "Pending",
    date: "2024-03-21",
    total: 25.98,
    products: [
      {
        id: "5",
        name: "USB-C Cable",
        sku: "CB-003",
        quantity: 1,
        price: 12.99,
        subtotal: 12.99,
      },
      {
        id: "6",
        name: "USB-C to HDMI Adapter",
        sku: "CB-004",
        quantity: 1,
        price: 12.99,
        subtotal: 12.99,
      },
    ],
    shippingAddress: {
      street: "789 Oak St",
      city: "Springfield",
      state: "IL",
      zipCode: "62703",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    subtotal: 25.98,
    shippingCost: 3.0,
    tax: 2.24,
  },
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<OrderDetails[]>(sampleOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "auto">("auto");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredOrders.slice(startIndex, endIndex);

  const viewDetailsColumn = {
    key: "actions",
    label: "",
    align: "center" as const,
    render: (_: any, order: OrderDetails) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setSelectedOrder(order);
          setIsDetailsOpen(true);
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
    ),
  };

  const updatedColumns = [...columns, viewDetailsColumn];

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      orders.filter((order) => order.status === "Pending")
                        .length
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      orders.filter((order) => order.status === "Processing")
                        .length
                    }
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {orders
                      .reduce((sum, order) => sum + order.total, 0)
                      .toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Search and Controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 h-9"
                    />
                  </div>
                  <div className="flex items-center gap-1 border rounded-md">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      className="h-8"
                      onClick={() => setViewMode("table")}
                    >
                      <Table2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="h-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(Number(value))}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data Table */}
              <DataTable
                columns={updatedColumns}
                data={currentItems}
                viewMode={viewMode}
              />

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredOrders.length)} of{" "}
                  {filteredOrders.length} orders
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedOrder && (
          <OrderDetailsDialog
            order={selectedOrder}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
        )}
      </div>
    </PrivateLayout>
  );
}

function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: {
  order: OrderDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 p-2">
            {/* Order Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="mt-1">
                  {columns
                    .find((col) => col.key === "status")
                    ?.render(order.status as never)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="mt-1 font-medium">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="mt-1 font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="mt-1 font-medium">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Products Table */}
            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell className="text-right">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
