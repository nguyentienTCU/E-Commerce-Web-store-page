"use client";

import { getOrders } from "@/lib/actions/action";
import { useUser } from "@clerk/nextjs";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  productId: {
    title: string;
    price: number;
    media: string[];
  };
  quantity: number;
  color?: string;
  size?: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  products: OrderItem[];
}

const Orders = () => {
  const { user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const fetchedOrders = await getOrders(user.id);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Package className="w-16 h-16 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-800">
          Sign in to view your orders
        </h1>
        <p className="text-gray-600">
          Please sign in to access your order history
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
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-600">No orders yet</p>
          <p className="text-gray-500 mt-2">
            Start shopping to see your orders here
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">${order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center gap-2">
                      {order.status === "pending" && (
                        <>
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500">Pending</span>
                        </>
                      )}
                      {order.status === "processing" && (
                        <>
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-500">Processing</span>
                        </>
                      )}
                      {order.status === "shipped" && (
                        <>
                          <Truck className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-500">Shipped</span>
                        </>
                      )}
                      {order.status === "delivered" && (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-500">Delivered</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <Image
                        src={item.productId.media[0]}
                        alt={item.productId.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.productId.title}</h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          {item.color && <p>Color: {item.color}</p>}
                          {item.size && <p>Size: {item.size}</p>}
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ${item.productId.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
