import { cn } from "@/lib/utils";
import { selectSidebarIsOpen } from "@/stores/features/sidebar/slice";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export default function RootLayout() {
  const isOpen = useSelector(selectSidebarIsOpen);

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Outlet />
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
