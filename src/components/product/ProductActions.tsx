
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductActions = ({ onAddToCart, onBuyNow }: ProductActionsProps) => {
  return (
    <div className="fixed bottom-16 inset-x-0 px-4 py-3 bg-white border-t border-gray-200 z-40">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="w-1/4 border-zapcart-200 text-zapcart-600"
          onClick={onAddToCart}
        >
          <ShoppingCart size={18} />
        </Button>
        <Button
          onClick={onBuyNow}
          className="w-3/4 bg-zapcart-500 hover:bg-zapcart-600 text-white"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};
