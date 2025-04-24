
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/mobile-navigation";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "credit_card" | "paypal" | "cod";
type DeliveryMethod = "standard" | "express";

const Checkout = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<"address" | "payment" | "review" | "confirmation">("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  
  // Mock checkout data
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    // Simple validation for address step
    if (activeStep === "address") {
      // Check if required fields are filled
      const { fullName, address, city, state, zipCode } = formData;
      if (!fullName || !address || !city || !state || !zipCode) {
        toast({
          title: "Please fill all required fields",
          description: "All fields are required to continue",
          variant: "destructive",
        });
        return;
      }
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    } else if (activeStep === "review") {
      // Process order
      setActiveStep("confirmation");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "payment") {
      setActiveStep("address");
    } else if (activeStep === "review") {
      setActiveStep("payment");
    }
  };

  // Mock order details
  const orderSummary = {
    items: 3,
    subtotal: 2647.00,
    shipping: 0.00,
    tax: 211.76,
    total: 2858.76,
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            {activeStep !== "confirmation" ? (
              <button onClick={handlePreviousStep} disabled={activeStep === "address"}>
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            ) : (
              <Link to="/home">
                <ArrowLeft size={20} className="text-gray-600" />
              </Link>
            )}
            <h1 className="text-lg font-semibold">
              {activeStep === "address" && "Delivery Address"}
              {activeStep === "payment" && "Payment Method"}
              {activeStep === "review" && "Order Review"}
              {activeStep === "confirmation" && "Order Confirmed"}
            </h1>
          </div>
          {activeStep !== "confirmation" && (
            <div className="text-sm text-gray-500">
              Step {
                activeStep === "address" ? "1/3" :
                activeStep === "payment" ? "2/3" : "3/3"
              }
            </div>
          )}
        </div>
      </header>

      <div className="p-4">
        {activeStep === "address" && (
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="123 Main St"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="NY"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="10001"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Delivery Method</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeliveryMethod("standard")}
                  className={`flex-1 py-3 px-4 border text-sm rounded-lg ${
                    deliveryMethod === "standard"
                      ? "border-zapcart-400 bg-zapcart-50 text-zapcart-700"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <div className="font-medium mb-1">Standard</div>
                  <div className="text-xs text-gray-500">3-5 business days</div>
                  <div className="text-xs font-medium mt-1">FREE</div>
                </button>
                <button
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex-1 py-3 px-4 border text-sm rounded-lg ${
                    deliveryMethod === "express"
                      ? "border-zapcart-400 bg-zapcart-50 text-zapcart-700"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <div className="font-medium mb-1">Express</div>
                  <div className="text-xs text-gray-500">1-2 business days</div>
                  <div className="text-xs font-medium mt-1">$9.99</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === "payment" && (
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">Select Payment Method</p>
              
              <button
                onClick={() => setPaymentMethod("credit_card")}
                className={`w-full flex items-center justify-between p-3 border rounded-lg ${
                  paymentMethod === "credit_card"
                    ? "border-zapcart-400 bg-zapcart-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Credit Card</div>
                </div>
                {paymentMethod === "credit_card" && (
                  <Check size={18} className="text-zapcart-600" />
                )}
              </button>
              
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`w-full flex items-center justify-between p-3 border rounded-lg ${
                  paymentMethod === "paypal"
                    ? "border-zapcart-400 bg-zapcart-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800">
                      <path d="M7 11l5-7" />
                      <path d="M21 11V8a2 2 0 0 0-2-2h-4l-5 7H4a2 2 0 0 0-2 2v2.5" />
                      <path d="M4 15v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5" />
                      <path d="M18 8h-2" />
                      <path d="M18 12h-8" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">PayPal</div>
                </div>
                {paymentMethod === "paypal" && (
                  <Check size={18} className="text-zapcart-600" />
                )}
              </button>
              
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full flex items-center justify-between p-3 border rounded-lg ${
                  paymentMethod === "cod"
                    ? "border-zapcart-400 bg-zapcart-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Cash on Delivery</div>
                </div>
                {paymentMethod === "cod" && (
                  <Check size={18} className="text-zapcart-600" />
                )}
              </button>
            </div>

            {paymentMethod === "credit_card" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeStep === "review" && (
          <div className="space-y-4">
            {/* Order summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({orderSummary.items})</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-zapcart-600">${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">Shipping Information</h3>
                <button className="text-xs text-zapcart-600 font-medium" onClick={() => setActiveStep("address")}>
                  Edit
                </button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-medium">{formData.fullName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                <p>{formData.phone}</p>
                <div className="mt-2 text-xs inline-block bg-gray-100 px-2 py-1 rounded">
                  {deliveryMethod === "standard" ? "Standard Delivery (3-5 days)" : "Express Delivery (1-2 days)"}
                </div>
              </div>
            </div>
            
            {/* Payment info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">Payment Method</h3>
                <button className="text-xs text-zapcart-600 font-medium" onClick={() => setActiveStep("payment")}>
                  Edit
                </button>
              </div>
              <div className="flex items-center">
                <div className={`p-2 rounded-md mr-3 ${
                  paymentMethod === "credit_card" ? "bg-blue-100" : 
                  paymentMethod === "paypal" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  {paymentMethod === "credit_card" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  )}
                  {paymentMethod === "paypal" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800">
                      <path d="M7 11l5-7" />
                      <path d="M21 11V8a2 2 0 0 0-2-2h-4l-5 7H4a2 2 0 0 0-2 2v2.5" />
                      <path d="M4 15v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5" />
                      <path d="M18 8h-2" />
                      <path d="M18 12h-8" />
                    </svg>
                  )}
                  {paymentMethod === "cod" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                  )}
                </div>
                <div className="text-sm font-medium">
                  {paymentMethod === "credit_card" && "Credit Card"}
                  {paymentMethod === "paypal" && "PayPal"}
                  {paymentMethod === "cod" && "Cash on Delivery"}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === "confirmation" && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check size={36} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-1">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your order has been placed successfully</p>
            
            <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-lg font-bold">#ZAP{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            
            <div className="space-y-4 w-full">
              <Button
                className="w-full bg-zapcart-500 hover:bg-zapcart-600"
                asChild
              >
                <Link to="/home">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom button */}
      {activeStep !== "confirmation" && (
        <div className="fixed bottom-16 inset-x-0 px-4 py-3 bg-white border-t border-gray-200 z-40">
          <Button
            onClick={handleNextStep}
            className="w-full bg-zapcart-500 hover:bg-zapcart-600"
          >
            {activeStep === "review" ? "Place Order" : "Continue"}
          </Button>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Checkout;
