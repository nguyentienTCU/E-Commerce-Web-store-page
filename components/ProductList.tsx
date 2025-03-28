import { getProducts } from "@/lib/action";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="heading1-bold"></p>
      {!products || products.length === 0 ? (
        <p className="body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap max-auto gap-16">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
