
interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const ProductQuantitySelector = ({
  quantity,
  onQuantityChange,
}: ProductQuantitySelectorProps) => {
  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="text-gray-800 w-6 text-center">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-600"
        >
          +
        </button>
      </div>
    </div>
  );
};
