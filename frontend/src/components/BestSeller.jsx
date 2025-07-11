import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(-5));
    }
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Title text1={"BEST"} text2={"SELLERS"} className="text-4xl" />
        <motion.p 
          className="max-w-2xl mx-auto mt-4 text-gray-600 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Discover our most-loved picks! Trendy styles and customer favorites
          designed to elevate your wardrobe.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              className="h-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;