import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { DataTable } from "@/components/custom-components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Package,
  Calendar,
  AlertCircle,
  Table2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
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

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
  price: number;
}

const columns = [
  {
    key: "name",
    label: "Product Name",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{value}</span>
      </div>
    ),
    gridTemplate: (value: string) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "sku",
    label: "SKU",
    render: (value: string) => (
      <span className="text-sm text-muted-foreground">{value}</span>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (value: string) => (
      <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
        {value}
      </span>
    ),
  },
  {
    key: "quantity",
    label: "Quantity",
    align: "right" as const,
    render: (value: number) => (
      <span className="font-medium">{value.toLocaleString()}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "In Stock":
            return "bg-green-100 text-green-800";
          case "Low Stock":
            return "bg-yellow-100 text-yellow-800";
          case "Out of Stock":
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
    key: "lastUpdated",
    label: "Last Updated",
    render: (value: string) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: "price",
    label: "Price",
    align: "right" as const,
    render: (value: number) => (
      <span className="font-medium">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    ),
  },
];

// Sample data
const sampleInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Wireless Keyboard",
    sku: "KB-001",
    category: "Electronics",
    quantity: 45,
    status: "In Stock",
    lastUpdated: "2024-03-20",
    price: 59.99,
  },
  {
    id: "2",
    name: "Gaming Mouse",
    sku: "MS-002",
    category: "Electronics",
    quantity: 8,
    status: "Low Stock",
    lastUpdated: "2024-03-19",
    price: 79.99,
  },
  {
    id: "3",
    name: "USB-C Cable",
    sku: "CB-003",
    category: "Accessories",
    quantity: 0,
    status: "Out of Stock",
    lastUpdated: "2024-03-18",
    price: 12.99,
  },
  // Add more sample items as needed
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "auto">("auto");

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInventory.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Inventory</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{inventory.length}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Low Stock Items
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      inventory.filter((item) => item.status === "Low Stock")
                        .length
                    }
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {
                      inventory.filter((item) => item.status === "Out of Stock")
                        .length
                    }
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
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
                      placeholder="Search inventory..."
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
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
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
                columns={columns}
                data={currentItems}
                viewMode={viewMode}
              />

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredInventory.length)} of{" "}
                  {filteredInventory.length} items
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
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
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PrivateLayout>
  );
}
