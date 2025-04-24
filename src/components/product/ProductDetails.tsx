
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check } from "lucide-react";

interface Specification {
  name: string;
  value: string;
}

interface Comparison {
  store: string;
  price: number;
  link: string;
  isBest?: boolean;
}

interface ProductDetailsProps {
  description: string;
  specifications: Specification[];
  comparisons: Comparison[];
}

export const ProductDetails = ({
  description,
  specifications,
  comparisons,
}: ProductDetailsProps) => {
  return (
    <div className="mt-6">
      <Tabs defaultValue="description">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Details</TabsTrigger>
          <TabsTrigger value="specifications">Specs</TabsTrigger>
          <TabsTrigger value="comparisons">Compare</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="animate-fade-in">
          <div className="text-sm text-gray-700 mt-3 leading-relaxed">
            {description}
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="animate-fade-in">
          <div className="mt-3">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className={`flex justify-between py-2 ${
                  index !== specifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <span className="text-sm text-gray-600">{spec.name}</span>
                <span className="text-sm text-gray-900 font-medium">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="animate-fade-in">
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-3">
              Compare prices across top stores
            </p>
            <div className="bg-gradient-to-r from-zapcart-50 to-white rounded-lg p-3 shadow-sm border border-gray-100">
              {comparisons.map((comp, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 ${
                    index !== comparisons.length - 1 ? "border-b border-gray-100" : ""
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
  );
};
