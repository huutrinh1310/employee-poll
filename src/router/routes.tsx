import RootLayout from "@/components/layout/RootLayout";
import NotFoundPage from "@/components/not-found-page";
import Protected from "@/components/protected-router";
import HomePage from "@/pages/home";
import LeaderBoardPage from "@/pages/leaderboard";
import LoginPage from "@/pages/login";
import NewPage from "@/pages/new";
import PollPage from "@/pages/poll";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
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
      {
        path: "/*",
        element: <Navigate to={"/not-found"} />,
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
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "/*",
    element: <LoginPage />,
  },
]);
