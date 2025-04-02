"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/types";
import ProductInfo from "@/components/ProductInfo";
import Gallery from "@/components/Gallery";
import { useCart } from "@/lib/hooks/useCart";
import { toast } from "react-hot-toast";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error loading product details");
      } finally {
        setLoading(false);
      }
    };

    const getProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProduct();
    getProducts();
  }, [params.productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/products"
                className="hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Gallery productMedia={product.media} />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ProductInfo productInfo={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
