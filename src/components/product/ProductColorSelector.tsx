
interface ProductColorSelectorProps {
  colors: string[];
  selectedColor: number;
  onColorSelect: (index: number) => void;
}

export const ProductColorSelector = ({
  colors,
  selectedColor,
  onColorSelect,
}: ProductColorSelectorProps) => {
  if (!colors?.length) return null;

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <button
            key={color}
            onClick={() => onColorSelect(index)}
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
  );
};
