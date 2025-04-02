"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import HeartFavorite from "./Heart";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem({
      item: productInfo,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-[500px] p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold text-gray-800">
          {productInfo.title}
        </h1>
        <HeartFavorite productInfo={productInfo} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Category:</span>
        <span className="text-sm font-medium text-gray-800">
          {productInfo.category}
        </span>
      </div>

      <p className="text-3xl font-bold text-blue-600">${productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-500">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {productInfo.description}
        </p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-500">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {productInfo.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-500">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {productInfo.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedSize === size
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MinusCircle className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          </button>
          <span className="text-lg font-medium text-gray-800 w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <PlusCircle className="h-6 w-6 text-gray-600 hover:text-blue-600" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
