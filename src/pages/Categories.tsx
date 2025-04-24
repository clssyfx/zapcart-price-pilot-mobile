
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { MobileNavigation } from "@/components/mobile-navigation";

const categories = [
  {
    id: 1,
    name: "Laptops",
    icon: "💻",
    count: 32,
    subcategories: ["Gaming", "Ultrabooks", "2-in-1", "Chromebooks", "MacBooks"]
  },
  {
    id: 2,
    name: "Mobiles",
    icon: "📱",
    count: 67,
    subcategories: ["iPhones", "Android", "Foldable", "Budget", "Premium"]
  },
  {
    id: 3,
    name: "Headphones",
    icon: "🎧",
    count: 45,
    subcategories: ["Over-ear", "In-ear", "Wireless", "Noise-cancelling", "Sports"]
  },
  {
    id: 4,
    name: "Powerbanks",
    icon: "🔋",
    count: 23,
    subcategories: ["High-capacity", "Fast charging", "Wireless", "Compact", "Solar"]
  },
  {
    id: 5,
    name: "Bluetooth Speakers",
    icon: "🔊",
    count: 38,
    subcategories: ["Portable", "Party", "Waterproof", "Smart", "Premium"]
  }
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link to="/home">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold">Categories</h1>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-zapcart-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center animate-fade-in"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-zapcart-50 rounded-lg flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <div>
                  <h2 className="font-medium">{category.name}</h2>
                  <p className="text-xs text-gray-500">
                    {category.count} products
                  </p>
                </div>
              </div>
              <ArrowRight className="text-gray-400" size={18} />
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-zapcart-50">
              <SearchIcon size={32} className="text-zapcart-400" />
            </div>
            <h2 className="text-lg font-semibold mb-2">No categories found</h2>
            <p className="text-gray-500">
              Try adjusting your search query
            </p>
          </div>
        )}
        
        {/* Subcategories display */}
        {filteredCategories.length > 0 && (
          <div className="mt-6 space-y-6">
            {filteredCategories.map((category) => (
              <div key={`sub-${category.id}`} className="animate-fade-in">
                <h3 className="font-medium text-sm text-gray-500 mb-2">
                  {category.name} Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((subcat) => (
                    <Link
                      key={`${category.id}-${subcat}`}
                      to={`/categories/${category.id}?filter=${subcat}`}
                      className="bg-white px-3 py-1.5 rounded-full text-sm shadow-sm border border-gray-100 hover:bg-zapcart-50 hover:border-zapcart-200 transition-colors"
                    >
                      {subcat}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const SearchIcon = ({ size, className }: { size: number; className?: string }) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default Categories;
