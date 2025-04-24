
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Login = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  
  const [signupName, setSignupName] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  
  const { login, signup, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginEmail, loginPassword);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(signupEmail, signupPassword, signupName);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-r from-zapcart-700 to-zapcart-400">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 animate-fade-in">
          <div className="bg-white p-4 rounded-full shadow-lg mb-2">
            <img 
              src="/public/lovable-uploads/7c84c392-dc5d-4ffb-bbe5-efd7151ddaa1.png" 
              alt="ZapCart Logo" 
              className="h-20 w-20 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white text-center">ZapCart</h1>
          <p className="text-white/80 text-center">Easy shopping. Best prices.</p>
        </div>

        <Card className="p-6 shadow-xl rounded-xl bg-white/95 backdrop-blur">
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-fade-in">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="border-zapcart-200 focus:border-zapcart-400"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="border-zapcart-200 focus:border-zapcart-400"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 text-zapcart-400 rounded focus:ring-zapcart-400"
                    />
                    <label htmlFor="remember" className="text-gray-600">Remember me</label>
                  </div>
                  <Link to="/forgot-password" className="text-zapcart-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-zapcart-500 hover:bg-zapcart-600"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
              
              <div className="mt-4 text-sm text-center text-gray-600">
                <p>Demo credentials: user@example.com / password</p>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Full Name"
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="border-zapcart-200 focus:border-zapcart-400"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Email"
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="border-zapcart-200 focus:border-zapcart-400"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="border-zapcart-200 focus:border-zapcart-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-zapcart-500 hover:bg-zapcart-600"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing up...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
