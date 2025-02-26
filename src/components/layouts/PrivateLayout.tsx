import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sheet>
        <Header className="fixed top-0 z-50 w-full" />
        <div className="flex pt-14 h-[calc(100vh-3.5rem)]">
          {/* Desktop Sidebar */}
          <div className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)]">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <SheetContent side="left" className="w-[240px] p-0">
            <Sidebar />
          </SheetContent>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </Sheet>
    </div>
  );
} 