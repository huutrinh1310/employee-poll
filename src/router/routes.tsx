import RootLayout from "@/components/layout/RootLayout";
import NotFoundPage from "@/components/not-found-page";
import HomePage from "@/pages/home";
import LeaderBoardPage from "@/pages/leaderboard";
import LoginPage from "@/pages/login";
import NewPage from "@/pages/new";
import PollPage from "@/pages/poll";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
        path: "leaderboard",
        element: <LeaderBoardPage />,
      },
      {
        path: "add",
        element: <NewPage />,
      },
      {
        path: "questions/:question_id",
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
    element: <NotFoundPage />,
  },
]);
