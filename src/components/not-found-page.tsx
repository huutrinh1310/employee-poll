import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 p-6">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h5 className="text-lg text-gray-700 mb-6">
        Sorry, we couldn't find the page you're looking for.
      </h5>
      <Button
        onClick={handleGoHome}
        className="px-6 py-3"
      >
        Go Back to Home
      </Button>
    </div>
  );
}
