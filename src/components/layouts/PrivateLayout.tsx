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
        <Header />
        <div className="flex pt-14">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <SheetContent side="left" className="w-[240px] p-0">
            <Sidebar />
          </SheetContent>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </Sheet>
    </div>
  );
} 