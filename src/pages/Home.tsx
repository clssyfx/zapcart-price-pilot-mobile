
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SearchIcon, ShoppingCart } from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const categories = [
    { id: 1, name: "Laptops", icon: "💻" },
    { id: 2, name: "Mobiles", icon: "📱" },
    { id: 3, name: "Headphones", icon: "🎧" },
    { id: 4, name: "Powerbanks", icon: "🔋" },
    { id: 5, name: "Bluetooth Speakers", icon: "🔊" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 14",
      category: "Laptops",
      price: 1299,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      discount: "10%",
      comparisons: [
        { store: "Amazon", price: 1399 },
        { store: "Flipkart", price: 1349 },
        { store: "ZapCart", price: 1299 }
      ]
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      category: "Mobiles",
      price: 999,
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
      discount: "5%",
      comparisons: [
        { store: "Amazon", price: 1049 },
        { store: "Flipkart", price: 1029 },
        { store: "ZapCart", price: 999 }
      ]
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      category: "Headphones",
      price: 349,
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b",
      discount: "15%",
      comparisons: [
        { store: "Amazon", price: 399 },
        { store: "Flipkart", price: 379 },
        { store: "ZapCart", price: 349 }
      ]
    },
    {
      id: 4,
      name: "Anker PowerCore",
      category: "Powerbanks",
      price: 49,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
      discount: "20%",
      comparisons: [
        { store: "Amazon", price: 59 },
        { store: "Flipkart", price: 55 },
        { store: "ZapCart", price: 49 }
      ]
    },
    {
      id: 5,
      name: "JBL Flip 6",
      category: "Bluetooth Speakers",
      price: 129,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      discount: "8%",
      comparisons: [
        { store: "Amazon", price: 139 },
        { store: "Flipkart", price: 134 },
        { store: "ZapCart", price: 129 }
      ]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="bg-zapcart-50 rounded-full p-1">
              <img 
                src="/public/lovable-uploads/7c84c392-dc5d-4ffb-bbe5-efd7151ddaa1.png" 
                alt="ZapCart Logo" 
                className="h-8 w-8"
              />
            </div>
            <span className="text-xl font-bold text-zapcart-600">ZapCart</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-600" size={22} />
              <span className="absolute -top-1 -right-1 bg-zapcart-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-zapcart-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </header>

      {/* Welcome message */}
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-gray-800">
          Hey, {user?.name || "there"} 👋
        </h1>
        <p className="text-gray-500">Let's find amazing deals for you!</p>
      </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Categories</h2>
          <Link to="/categories" className="text-sm text-zapcart-600">
            View All
          </Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="flex flex-col items-center justify-center min-w-[80px] p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium text-gray-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured deals */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Featured Deals</h2>
          <Link to="/deals" className="text-sm text-zapcart-600">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="animate-fade-in"
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-zapcart-600 text-white text-xs px-1.5 py-0.5 rounded-md">
                      Save {product.discount}
                    </div>
                  )}
                </div>
                <CardContent className="p-2 flex flex-col">
                  <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-zapcart-700">${product.price}</span>
                    <div className="bg-green-50 rounded px-1.5 py-0.5 flex items-center">
                      <span className="text-[10px] text-green-700">Best Price</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Comparison section */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Price Comparison</h2>
        <Card className="overflow-hidden shadow-md bg-gradient-to-r from-zapcart-50 to-white">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Price Match Guarantee</h3>
            <p className="text-sm text-gray-600 mb-3">
              ZapCart automatically compares prices across major retailers to get you the best deal.
            </p>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium">MacBook Pro 14</span>
                <span className="text-xs text-green-600 font-medium">Save up to $100</span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Amazon</span>
                  <span>$1,399</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Flipkart</span>
                  <span>$1,349</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-zapcart-600">ZapCart</span>
                  <span className="text-zapcart-600">$1,299</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Arrivals */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">New Arrivals</h2>
          <Link to="/new-arrivals" className="text-sm text-zapcart-600">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto flex space-x-4 pb-2 no-scrollbar">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="min-w-[150px] max-w-[150px] animate-fade-in"
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-full object-cover"
                  />
                </div>
                <CardContent className="p-2 flex flex-col">
                  <h3 className="text-xs font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] text-gray-500">{product.category}</p>
                  <div className="mt-1">
                    <span className="font-bold text-xs text-zapcart-700">${product.price}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Home;
