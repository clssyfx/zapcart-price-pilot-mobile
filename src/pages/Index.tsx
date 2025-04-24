
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zapcart-700 to-zapcart-400">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-2">ZapCart</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Index;
