"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Cart = () => {
  const { user } = useUser();
  const router = useRouter();

  const cart = useCart();

  const totalPrice = cart.cartItems.reduce((total, item) => {
    return total + item.item.price * item.quantity;
  }, 0);
  const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            method: "POST",
            body: JSON.stringify({
              cartItems: cart.cartItems,
              customer,
            }),
          }
        );
        const data = await response.json();
        window.location.href = data.url;
      }
    } catch (error) {
      console.log("[checkout_POST]", error);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-gray-100 px-6 py-5 items-center max-sm:items-start justify-between"
                key={cartItem.item._id}
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    alt="product"
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                  />

                  <div className="flex flex-col gap-3 ml-4">
                    <p className="body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="small-medium">{cartItem.size}</p>
                    )}
                    <p className="small-medium">${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MinusCircle
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  {cartItem.quantity}
                  <PlusCircle
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5">
        <p className="heading4-bold">
          Order Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between body-semibold">
          <span>Total Amount</span>
          <span>${roundedTotalPrice}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="cursor-pointer border rounded-lg body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
