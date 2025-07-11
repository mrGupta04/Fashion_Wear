import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Step into the season's freshest trends! Explore our handpicked styles
          crafted to elevate your look.
        </p>
      </div>

      {/* Rendering Products with uniform card sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
        {latestProducts.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col h-full" // Ensure all cards take full height
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              className="h-full" // Pass className to ProductItem
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;