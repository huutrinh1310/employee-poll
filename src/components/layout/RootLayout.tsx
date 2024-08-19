import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "@/stores/features/sidebar/slice";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "@/stores/store";
import { useEffect } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const isOpen = useSelector(selectSidebarIsOpen);
  const isAuth = useSelector((state: RootState) => state.authen.isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    }
  }, [isAuth]);

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
