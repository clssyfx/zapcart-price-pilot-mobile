
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-24 h-24 bg-zapcart-50 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">Page Not Found</h1>
      <p className="text-gray-600 mb-6 text-center">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Button asChild className="bg-zapcart-500 hover:bg-zapcart-600">
        <Link to="/home">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
