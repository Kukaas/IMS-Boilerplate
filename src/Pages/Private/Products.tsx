import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { DataTable } from "@/components/custom-components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Package2,
  Calendar,
  Table2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Tags,
  PhilippinePeso,
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

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  status: "Active" | "Draft" | "Archived";
  lastUpdated: string;
}

const columns = [
  {
    key: "name",
    label: "Product Name",
    render: (value: string, item: Product) => (
      <div className="flex items-center gap-2">
        <Package2 className="h-4 w-4 text-muted-foreground" />
        <div>
          <span className="font-medium">{value}</span>
          <div className="text-xs text-muted-foreground">SKU: {item.sku}</div>
        </div>
      </div>
    ),
    gridTemplate: (value: string, item: Product) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <Package2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <span className="font-medium">{value}</span>
          <div className="text-xs text-muted-foreground">SKU: {item.sku}</div>
        </div>
      </div>
    ),
  },
  {
    key: "price",
    label: "Price",
    align: "right" as const,
    render: (value: number) => (
      <span className="font-medium">
        ₱{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
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
    key: "status",
    label: "Status",
    render: (value: string) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Active":
            return "bg-green-100 text-green-800";
          case "Draft":
            return "bg-yellow-100 text-yellow-800";
          case "Archived":
            return "bg-gray-100 text-gray-800";
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
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Mechanical Keyboard",
    sku: "KB-001",
    category: "Electronics",
    status: "Active",
    lastUpdated: "2024-03-20",
    price: 2999.99,
  },
  {
    id: "2",
    name: "Gaming Mouse",
    sku: "MS-002",
    category: "Electronics",
    status: "Draft",
    lastUpdated: "2024-03-19",
    price: 1499.99,
  },
  {
    id: "3",
    name: "Type-C Cable",
    sku: "CB-003",
    category: "Accessories",
    status: "Archived",
    lastUpdated: "2024-03-18",
    price: 299.99,
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "auto">("auto");

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const totalValue = products.reduce((sum, item) => sum + item.price, 0);
  const activeCount = products.filter(
    (item) => item.status === "Active"
  ).length;

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package2 className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <Package2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Products
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeCount}
                  </p>
                </div>
                <Tags className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱
                    {totalValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <PhilippinePeso className="h-8 w-8 text-blue-600" />
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
                      placeholder="Search products..."
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
                columns={columns}
                data={currentItems}
                viewMode={viewMode}
              />

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
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
      </div>
    </PrivateLayout>
  );
}
