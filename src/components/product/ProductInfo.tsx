
interface ProductInfoProps {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

export const ProductInfo = ({
  name,
  category,
  price,
  originalPrice,
  rating,
  reviews,
}: ProductInfoProps) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-500 text-sm">{category}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl font-bold text-zapcart-600">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center mt-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-1">
          {rating} ({reviews} reviews)
        </span>
      </div>
    </>
  );
};
