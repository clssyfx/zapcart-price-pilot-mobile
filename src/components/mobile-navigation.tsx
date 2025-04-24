
import { Home, Search, Package, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileNavigation() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
    },
    {
      icon: Search,
      label: "Search",
      href: "/search",
    },
    {
      icon: Package,
      label: "Categories",
      href: "/categories",
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-16 px-4">
      <div className="flex justify-between h-full items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full tap-highlight-none",
                isActive
                  ? "text-zapcart-600"
                  : "text-gray-500 hover:text-zapcart-400"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "mb-1",
                  isActive && "fill-zapcart-100 stroke-zapcart-600"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
