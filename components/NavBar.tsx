"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NavBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  console.log(pathname);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-8">
            <Image
              src="/logo.png"
              alt="logo"
              width={130}
              height={100}
              className="hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 flex-1">
            <Link
              href="/"
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                pathname === "/" ? "!text-blue-600" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={!user ? "/sign-in" : "/wishlist"}
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                pathname.startsWith("/wishlist") ? "!text-blue-600" : ""
              }`}
            >
              Wishlist
            </Link>
            <Link
              href={!user ? "/sign-in" : "/orders"}
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                pathname.startsWith("/orders") ? "!text-blue-600" : ""
              }`}
            >
              Orders
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  query === ""
                    ? toast.error("Please enter a search query")
                    : router.push(`/search/${query}`);
                }}
                className="absolute left-3 top-2.5"
              >
                <Search className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">
                Cart ({cart.cartItems.length})
              </span>
            </Link>

            <Menu
              className="cursor-pointer md:hidden"
              onClick={() => setDropdownMenu(!dropdownMenu)}
            />

            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            ) : (
              <Link
                href="/sign-in"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <CircleUserRound className="h-5 w-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {dropdownMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  pathname === "/" ? "!text-blue-600" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href={!user ? "/sign-in" : "/wishlist"}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  pathname.startsWith("/wishlist") ? "!text-blue-600" : ""
                }`}
              >
                Wishlist
              </Link>
              <Link
                href={!user ? "/sign-in" : "/orders"}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  pathname.startsWith("/orders") ? "!text-blue-600" : ""
                }`}
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">
                  Cart ({cart.cartItems.length})
                </span>
              </Link>
              {!user && (
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <CircleUserRound className="h-5 w-5" />
                  <span className="font-medium">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
