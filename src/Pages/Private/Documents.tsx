import { PrivateLayout } from "@/components/layouts/PrivateLayout";
import { DataTable } from "@/components/custom-components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  FileText,
  Calendar,
  User,
  FileIcon,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Table2,
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
import { Eye, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  createdBy: string;
}

const columns = [
  {
    key: "name",
    label: "Name",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{value}</span>
      </div>
    ),
    gridTemplate: (value: string) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
    render: (value: string) => (
      <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
        {value}
      </span>
    ),
  },
  {
    key: "size",
    label: "Size",
    align: "right" as const,
    render: (value: string) => (
      <span className="text-muted-foreground text-sm">{value}</span>
    ),
  },
  {
    key: "lastModified",
    label: "Modified",
    render: (value: string) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {new Date(value).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: "createdBy",
    label: "Created By",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <User className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
    gridTemplate: (value: string) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

// Sample data
const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    type: "PDF",
    size: "2.5 MB",
    lastModified: "2024-03-20",
    createdBy: "John Doe",
  },
  {
    id: "2",
    name: "Meeting Notes.docx",
    type: "Word",
    size: "1.2 MB",
    lastModified: "2024-03-19",
    createdBy: "Jane Smith",
  },
  {
    id: "3",
    name: "Financial Report.xlsx",
    type: "Excel",
    size: "3.7 MB",
    lastModified: "2024-03-18",
    createdBy: "Mike Johnson",
  },
  {
    id: "4",
    name: "Presentation.pptx",
    type: "PowerPoint",
    size: "5.1 MB",
    lastModified: "2024-03-17",
    createdBy: "Sarah Wilson",
  },
  {
    id: "5",
    name: "Invoice.pdf",
    type: "PDF",
    size: "1.5 MB",
    lastModified: "2024-03-16",
    createdBy: "Robert Brown",
  },
  {
    id: "6",
    name: "Contract.docx",
    type: "Word",
    size: "2.2 MB",
    lastModified: "2024-03-15",
    createdBy: "Emily Davis",
  },
  {
    id: "7",
    name: "Budget.xlsx",
    type: "Excel",
    size: "4.8 MB",
    lastModified: "2024-03-14",
    createdBy: "Michael Lee",
  },
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "auto">("auto");

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileIcon className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Documents</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
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

              <DataTable
                columns={columns}
                data={currentDocuments}
                viewMode={viewMode}
              />

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredDocuments.length)} of{" "}
                  {filteredDocuments.length} documents
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
