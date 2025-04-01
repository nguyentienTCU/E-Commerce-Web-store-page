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
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        alt="collection"
        width={1500}
        height={1000}
        className="w-full h-[500px] object-cover rounded-xl"
      />
      <p className="heading3-bold text-gray-500">{collectionDetails.title}</p>
      <p className="body-normal text-center max-w-[900px] text-gray-500">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-18 mx-auto">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
