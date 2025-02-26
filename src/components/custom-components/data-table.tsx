import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any) => React.ReactNode;
  gridTemplate?: (value: any) => React.ReactNode; // Optional custom grid template
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  viewMode?: "table" | "grid" | "auto";
}

export function DataTable({
  columns,
  data,
  viewMode = "auto",
}: DataTableProps) {
  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={column.align ? `text-${column.align}` : ""}
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={row.id || i}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                className={column.align ? `text-${column.align}` : ""}
              >
                {column.render
                  ? column.render(row[column.key])
                  : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const GridView = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((row, i) => (
        <Card key={row.id || i} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 space-y-4">
            {/* Header Info */}
            <div className="space-y-1.5">
              {columns[0]?.gridTemplate ? (
                columns[0].gridTemplate(row[columns[0].key])
              ) : (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {row[columns[0].key]}
                  </span>
                </div>
              )}
            </div>

            {/* Status and Amount */}
            <div className="flex items-center justify-between">
              <div>
                {columns
                  .find((col) => col.key === "status")
                  ?.render?.(row["status"])}
              </div>
              <div className="text-lg font-medium">{row["amount"]}</div>
            </div>

            {/* Date */}
            <div className="pt-2 border-t text-sm text-muted-foreground">
              {columns.find((col) => col.key === "date")?.render?.(row["date"])}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (viewMode === "grid") {
    return <GridView />;
  }

  if (viewMode === "table") {
    return <TableView />;
  }

  // Auto mode - Table on desktop, Grid on mobile
  return (
    <>
      <div className="hidden md:block">
        <TableView />
      </div>
      <div className="md:hidden">
        <GridView />
      </div>
    </>
  );
}
