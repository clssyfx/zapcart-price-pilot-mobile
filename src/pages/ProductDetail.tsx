import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductColorSelector } from "@/components/product/ProductColorSelector";
import { ProductQuantitySelector } from "@/components/product/ProductQuantitySelector";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductActions } from "@/components/product/ProductActions";

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
      <ProductImage image={product.image} name={product.name} />

      <div className="bg-white rounded-t-3xl -mt-8 px-4 pt-5 pb-6 shadow-lg z-10 relative">
        <ProductInfo
          name={product.name}
          category={product.category}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
          reviews={product.reviews}
        />

        <ProductColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        <ProductQuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        <ProductDetails
          description={product.description}
          specifications={product.specifications}
          comparisons={product.comparisons}
        />
      </div>

      <ProductActions
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
      
      <MobileNavigation />
    </div>
  );
};

export default ProductDetail;
