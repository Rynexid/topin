import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090B]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
