import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MobileNavigation } from "@/components/mobile-navigation";
import { useToast } from "@/hooks/use-toast";

const products = {
  1: {
    id: 1,
    name: "MacBook Pro 14",
    category: "Laptops",
    price: 1299,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "The new MacBook Pro delivers groundbreaking performance for pro users. With the M1 Pro or M1 Max chip, the MacBook Pro is incredibly capable. It has a beautiful Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need.",
    specifications: [
      { name: "Display", value: "14-inch Liquid Retina XDR display" },
      { name: "Processor", value: "Apple M1 Pro chip" },
      { name: "Memory", value: "16GB unified memory" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Battery", value: "Up to 17 hours" }
    ],
    comparisons: [
      { store: "Amazon", price: 1399, link: "#" },
      { store: "Flipkart", price: 1349, link: "#" },
      { store: "ZapCart", price: 1299, link: "#", isBest: true },
      { store: "Snapdeal", price: 1379, link: "#" }
    ],
    rating: 4.7,
    reviews: 238,
    colors: ["Space Gray", "Silver"],
    inStock: true
  },
  2: {
    id: 2,
    name: "iPhone 14 Pro",
    category: "Mobiles",
    price: 999,
    originalPrice: 1049,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    description: "The iPhone 14 Pro comes with a 6.1-inch ProMotion OLED display, A16 Bionic chip, triple camera system with 48MP main camera, and all-day battery life.",
    specifications: [
      { name: "Display", value: "6.1-inch Super Retina XDR display" },
      { name: "Processor", value: "A16 Bionic chip" },
      { name: "Memory", value: "6GB RAM" },
      { name: "Storage", value: "128GB" },
      { name: "Battery", value: "Up to 23 hours video playback" }
    ],
    comparisons: [
      { store: "Amazon", price: 1049, link: "#" },
      { store: "Flipkart", price: 1029, link: "#" },
      { store: "ZapCart", price: 999, link: "#", isBest: true },
      { store: "Snapdeal", price: 1039, link: "#" }
    ],
    rating: 4.8,
    reviews: 412,
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    inStock: true
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const productId = parseInt(id || "1");
  const product = products[productId as keyof typeof products] || products[1];
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Processing",
      description: "Redirecting to checkout...",
    });
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <div className="relative h-72 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <Link
            to="/home"
            className="bg-white/80 backdrop-blur rounded-full p-2 shadow-md"
          >
            <ArrowLeft size={20} className="text-gray-800" />
          </Link>
          <div className="bg-white/80 backdrop-blur rounded-full p-2 shadow-md">
            <Share2 size={20} className="text-gray-800" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl -mt-8 px-4 pt-5 pb-6 shadow-lg z-10 relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 text-sm">{product.category}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-zapcart-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(index)}
                  className={`px-3 py-1.5 rounded-full text-xs ${
                    selectedColor === index
                      ? "bg-zapcart-100 text-zapcart-700 border border-zapcart-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-gray-800 w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specs</TabsTrigger>
              <TabsTrigger value="comparisons">Compare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="animate-fade-in">
              <div className="text-sm text-gray-700 mt-3 leading-relaxed">
                {product.description}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="animate-fade-in">
              <div className="mt-3">
                {product.specifications.map((spec, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between py-2 ${
                      index !== product.specifications.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className="text-sm text-gray-600">{spec.name}</span>
                    <span className="text-sm text-gray-900 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="comparisons" className="animate-fade-in">
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-3">Compare prices across top stores</p>
                <div className="bg-gradient-to-r from-zapcart-50 to-white rounded-lg p-3 shadow-sm border border-gray-100">
                  {product.comparisons.map((comp, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center py-2 ${
                        index !== product.comparisons.length - 1 ? "border-b border-gray-100" : ""
                      } ${comp.isBest ? "text-zapcart-600 font-medium" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{comp.store}</span>
                        {comp.isBest && (
                          <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] flex items-center">
                            <Check size={10} className="mr-0.5" /> Best
                          </span>
                        )}
                      </div>
                      <span className="text-sm">${comp.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Prices may vary. Last updated today.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="fixed bottom-16 inset-x-0 px-4 py-3 bg-white border-t border-gray-200 z-40">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-1/4 border-zapcart-200 text-zapcart-600"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </Button>
            <Button 
              onClick={handleBuyNow}
              className="w-3/4 bg-zapcart-500 hover:bg-zapcart-600 text-white"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default ProductDetail;
