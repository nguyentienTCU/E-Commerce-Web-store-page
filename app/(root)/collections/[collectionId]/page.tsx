import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/action";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const { collectionId } = await params;
  const collectionDetails = await getCollectionDetails(collectionId);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/9] mb-8">
          <Image
            src={collectionDetails.image}
            alt={collectionDetails.title}
            fill
            priority
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {collectionDetails.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {collectionDetails.description}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-content-center">
          {collectionDetails.products.map((product: ProductType) => (
            <div key={product._id} className="w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
