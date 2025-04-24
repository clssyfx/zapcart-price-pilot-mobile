
import { ArrowLeft, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductImageProps {
  image: string;
  name: string;
}

export const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <div className="relative h-72 bg-gray-200">
      <img src={image} alt={name} className="w-full h-full object-cover" />
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
  );
};
