import { getCollections } from "@/lib/actions/action";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <h1 className="heading1-bold">Collections</h1>
      {!collections || collections.length === 0 ? (
        <p className="body-bold">No collections found</p>
      ) : (
        <div className="flex items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
