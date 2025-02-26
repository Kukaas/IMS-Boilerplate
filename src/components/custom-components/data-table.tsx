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
  gridTemplate?: (value: any) => React.ReactNode;
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
    <div className="w-full overflow-auto">
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
    </div>
  );

  const GridView = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((row, i) => (
        <Card key={row.id || i}>
          <CardContent className="p-4 space-y-2">
            {/* Main Info (First Column) */}
            {columns[0] && (
              <div className="space-y-1">
                {columns[0].gridTemplate ? (
                  columns[0].gridTemplate(row[columns[0].key])
                ) : columns[0].render ? (
                  columns[0].render(row[columns[0].key])
                ) : (
                  <div className="text-lg font-semibold">
                    {row[columns[0].key]}
                  </div>
                )}
              </div>
            )}

            {/* Secondary Info (Other Columns) */}
            <div className="grid gap-2 pt-2 border-t text-sm">
              {columns.slice(1).map((column) => (
                <div
                  key={column.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{column.label}</span>
                  <span className={column.align ? `text-${column.align}` : ""}>
                    {column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Responsive view handling
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
