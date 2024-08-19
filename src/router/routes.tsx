import RootLayout from "@/components/layout/RootLayout";
import HomePage from "@/pages/home";
import LeaderBoardPage from "@/pages/leaderboard";
import LoginPage from "@/pages/login";
import NewPage from "@/pages/new";
import PollPage from "@/pages/poll";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "leader-board",
        element: <LeaderBoardPage />,
      },
      {
        path: "new",
        element: <NewPage />,
      },
      {
        path: "poll/:id",
        element: <PollPage />,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to={"/auth/login"} />,
  },
]);
