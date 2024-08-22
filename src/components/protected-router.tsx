import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
interface ProtectedProps {
  children: React.ReactNode;
}

function Protected({ children }: ProtectedProps) {
  const isAuth = useSelector((state: RootState) => state.authen.isAuth);
  const location = useLocation();

  return !isAuth ? (
    <Navigate
      to="/auth/login"
      replace
      state={{ path: location.pathname }}
    />
  ) : (
    children
  );
}

export default Protected;
