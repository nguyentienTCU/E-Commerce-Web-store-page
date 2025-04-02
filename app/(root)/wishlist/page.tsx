"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/action";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);
    if (!signedInUser) {
      return;
    }
    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );
    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Heart className="w-16 h-16 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-800">
          Sign in to view your wishlist
        </h1>
        <p className="text-gray-600">
          Please sign in to access your saved items
        </p>
        <button
          onClick={() => router.push("/sign-in")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
          <Heart className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-600">
            Your wishlist is empty
          </p>
          <p className="text-gray-500 mt-2">Add some items to your wishlist</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              updateSignedInUser={updateSignedInUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
