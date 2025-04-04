import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/action";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const product = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  console.log(relatedProducts);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center gap-16 py-10 px-10 max-md:flex-col max-md:items-center mx-auto">
        <Gallery productMedia={product.media} />
        <ProductInfo productInfo={product} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto my-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
