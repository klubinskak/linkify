
  import React from "react";

  interface CategorySectionProps {
    category: string;
    items: string[];
  }
  
  const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
    return (
        <div className="w-full rounded-lg shadow-md mt-12">
          {/* Header Category */}
          <div className="text-xl font-bold pb-2 mb-4">
            {category}
          </div>
    
          {/* Items
          <div className="flex flex-wrap gap-4">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-700"
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items available</p>
            )}
          </div> */}
        </div>
    )
  };
  
  export default CategorySection;
  