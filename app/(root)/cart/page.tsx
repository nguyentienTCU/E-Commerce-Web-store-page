"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (
    itemId: string,
    action: "increase" | "decrease",
    color?: string,
    size?: string
  ) => {
    if (action === "increase") {
      cart.increaseQuantity(itemId, color, size);
    } else {
      cart.decreaseQuantity(itemId, color, size);
    }
  };

  const handleRemoveItem = (itemId: string, color?: string, size?: string) => {
    cart.removeItem(itemId, color, size);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-sm">
            {cart.cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-600">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mt-2">
                  Add some items to your cart
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y">
                {cart.cartItems.map((cartItem) => (
                  <div
                    className="flex items-center p-6 hover:bg-gray-50 transition-colors"
                    key={cartItem.item._id}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={cartItem.item.media[0]}
                        alt={cartItem.item.title}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-6 flex-grow">
                      <h3 className="text-lg font-semibold">
                        {cartItem.item.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {cartItem.color && (
                          <p className="text-sm text-gray-600">
                            Color: {cartItem.color}
                          </p>
                        )}
                        {cartItem.size && (
                          <p className="text-sm text-gray-600">
                            Size: {cartItem.size}
                          </p>
                        )}
                        <p className="text-lg font-semibold text-gray-900">
                          ${cartItem.item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              cartItem.item._id,
                              "decrease",
                              cartItem.color,
                              cartItem.size
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MinusCircle className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="w-8 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              cartItem.item._id,
                              "increase",
                              cartItem.color,
                              cartItem.size
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <PlusCircle className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveItem(
                            cartItem.item._id,
                            cartItem.color,
                            cartItem.size
                          )
                        }
                        className="p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
              <span className="text-gray-500 text-base font-normal ml-2">
                ({cart.cartItems.length}{" "}
                {cart.cartItems.length === 1 ? "item" : "items"})
              </span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${roundedTotalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${roundedTotalPrice}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.cartItems.length === 0 || isLoading}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
