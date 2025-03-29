import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails } from "@/lib/action";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const product = await getProductDetails(productId);
  return (
    <div className="min-h-screen flex justify-center items-center gap-16 py-10 px-10 max-md:flex-col max-md:items-center mx-auto">
      <Gallery productMedia={product.media} />
      <ProductInfo productInfo={product} />
    </div>
  );
};

export default ProductDetails;
