import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { DataTable } from "@/components/custom-components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Building2,
  Calendar,
  Table2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Package2,
  Mail,
  Phone,
  MapPin,
  Globe,
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

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  productsCount: number;
  status: "Active" | "Inactive" | "Pending";
  lastOrder: string;
  website: string;
}

const columns = [
  {
    key: "name",
    label: "Supplier",
    render: (value: string, item: Supplier) => (
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <div>
          <span className="font-medium">{value}</span>
          <div className="text-xs text-muted-foreground">
            {item.contactPerson}
          </div>
        </div>
      </div>
    ),
    gridTemplate: (value: string, item: Supplier) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <span className="font-medium">{value}</span>
          <div className="text-xs text-muted-foreground">
            {item.contactPerson}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    label: "Contact",
    render: (value: string, item: Supplier) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span>{value}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span>{item.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "location",
    label: "Location",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "productsCount",
    label: "Products",
    align: "center" as const,
    render: (value: number) => (
      <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
        {value} products
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: string, item: Supplier) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Active":
            return "bg-green-100 text-green-800";
          case "Inactive":
            return "bg-red-100 text-red-800";
          case "Pending":
            return "bg-yellow-100 text-yellow-800";
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
    key: "lastOrder",
    label: "Last Order",
    render: (value: string) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
];

const sampleSuppliers: Supplier[] = [
  {
    id: "1",
    name: "PCWorx Philippines",
    contactPerson: "Antonio Reyes",
    email: "antonio@pcworx.com.ph",
    phone: "+63 (2) 8123-4567",
    location: "Makati City, Metro Manila",
    productsCount: 45,
    status: "Active",
    lastOrder: "2024-03-15",
    website: "www.pcworx.com.ph",
  },
  {
    id: "2",
    name: "DataBlitz",
    contactPerson: "Sarah Garcia",
    email: "sarah@datablitz.com.ph",
    phone: "+63 (2) 8234-5678",
    location: "Taguig City, Metro Manila",
    productsCount: 32,
    status: "Active",
    lastOrder: "2024-03-18",
    website: "www.datablitz.com.ph",
  },
  {
    id: "3",
    name: "Silicon Valley PH",
    contactPerson: "Miguel Santos",
    email: "miguel@siliconvalley.ph",
    phone: "+63 (2) 8345-6789",
    location: "Pasig City, Metro Manila",
    productsCount: 28,
    status: "Inactive",
    lastOrder: "2024-02-28",
    website: "www.siliconvalley.ph",
  },
];

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "auto">("auto");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const viewDetailsColumn = {
    key: "actions",
    label: "",
    align: "center" as const,
    render: (_: any, supplier: Supplier) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setSelectedSupplier(supplier);
          setIsDetailsOpen(true);
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
    ),
  };

  const updatedColumns = [...columns, viewDetailsColumn];

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredSuppliers.slice(startIndex, endIndex);

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Active"
  ).length;
  const totalProducts = suppliers.reduce(
    (sum, supplier) => sum + supplier.productsCount,
    0
  );

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Suppliers</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Suppliers
                  </p>
                  <p className="text-2xl font-bold">{suppliers.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Suppliers
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeSuppliers}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalProducts}
                  </p>
                </div>
                <Package2 className="h-8 w-8 text-blue-600" />
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
                      placeholder="Search suppliers..."
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
                  {Math.min(endIndex, filteredSuppliers.length)} of{" "}
                  {filteredSuppliers.length} suppliers
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

        {selectedSupplier && (
          <SupplierDetailsDialog
            supplier={selectedSupplier}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
        )}
      </div>
    </PrivateLayout>
  );
}

function SupplierDetailsDialog({
  supplier,
  open,
  onOpenChange,
}: {
  supplier: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Supplier Details - {supplier.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 p-2">
            {/* Company Information */}
            <div>
              <h3 className="font-semibold mb-4">Company Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium">{supplier.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">
                    {columns
                      .find((col) => col.key === "status")
                      ?.render(supplier.status as never, supplier)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a
                    href={`https://${supplier.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {supplier.website}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Person
                  </p>
                  <p className="font-medium">{supplier.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${supplier.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {supplier.email}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Information */}
            <div>
              <h3 className="font-semibold mb-4">Supply Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Products Supplied
                  </p>
                  <div className="mt-1">
                    <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                      {supplier.productsCount} products
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Order</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(supplier.lastOrder).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button>Edit Supplier</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
