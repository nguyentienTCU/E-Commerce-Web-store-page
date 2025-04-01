import ProductCard from "@/components/ProductCard";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const { query } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
  const searchedProducts = await res.json();

  const decodedQuery = decodeURIComponent(query);

  return (
    <div className="px-10 py-5">
      <p className="heading3-bold my-10">Search results for {decodedQuery}</p>
      {!searchedProducts || searchedProducts.length === 0 ? (
        <p className="body-bold my-5">No results found</p>
      ) : (
        <div className="flex flex-wrap gap-16">
          {searchedProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
