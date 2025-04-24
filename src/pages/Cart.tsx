
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/mobile-navigation";
import { useToast } from "@/components/ui/use-toast";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "MacBook Pro 14",
    price: 1299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    price: 999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 349,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Calculate shipping (free over $100, otherwise $10)
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Calculate total
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pb-28 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link to="/home">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
          </div>
          <div className="text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </header>

      <div className="p-4">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {/* Cart items */}
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg p-3 shadow-sm flex space-x-3 animate-fade-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 text-xs"
                      >
                        -
                      </button>
                      <span className="text-gray-800 w-5 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 text-xs"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-zapcart-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Order summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-zapcart-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-sm">Apply Promo Code</h3>
                <p className="text-xs text-gray-500">Get discounts with promo code</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            
            {/* Checkout button */}
            <div className="fixed bottom-16 inset-x-0 px-4 py-3 bg-white border-t border-gray-200 z-40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total:</span>
                <span className="text-lg font-bold text-zapcart-600">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-zapcart-500 hover:bg-zapcart-600"
                asChild
              >
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-zapcart-50">
              <ShoppingCart size={32} className="text-zapcart-400" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add products to your cart</p>
            <Button asChild className="bg-zapcart-500 hover:bg-zapcart-600">
              <Link to="/home">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

const ShoppingCart = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export default Cart;
