"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeartFavoriteProps {
  productInfo: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({
  productInfo,
  updateSignedInUser,
}: HeartFavoriteProps) => {
  const router = useRouter();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();
      //setSignedInUser(data);
      setIsLiked(data.wishlist.includes(productInfo._id));
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user.isSignedIn) {
      getUser();
    }
  }, [user.isSignedIn]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!user.isSignedIn) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const response = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: productInfo._id }),
        });
        const updatedUser = await response.json();
        setIsLiked(updatedUser.wishlist.includes(productInfo._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
        setLoading(false);
      }
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };
  return (
    <button onClick={handleLike} className="cursor-pointer">
      <Heart fill={isLiked ? "red" : "white"} />
    </button>
  );
};

export default HeartFavorite;
