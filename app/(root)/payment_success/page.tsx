"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import React, { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <p className="heading4-bold red-1">Successful Payment</p>
      <p>Thank you for your purchase!</p>
      <Link
        href="/"
        className="p-4 border base-bold hover:bg-black hover:text-white transition-all duration-300"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
