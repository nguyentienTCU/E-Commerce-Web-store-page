import { getOrders } from "@/lib/actions/action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Orders = async () => {
  const { userId } = await auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="heading3-bold my-10">Your Orders</p>
      {!orders || orders.length === 0 ? (
        <p className="body-bold my-5">You have no orders yet</p>
      ) : (
        <div className="flex flex-col gap-10">
          {orders.map((order: OrderType) => (
            <div className="flex flex-col gap-8 p-4 hover:bg-gray-100">
              <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                <p className="base-bold">Order ID: {order._id}</p>
                <p className="base-bold">Total Amount: ${order.totalAmount}</p>
              </div>

              <div className="flex flex-col gap-5">
                {order.products.map((orderItem: OrderItemType) => (
                  <div className="flex gap-4">
                    <Image
                      src={orderItem.productId.media[0]}
                      alt={orderItem.productId.title}
                      className="w-32 h-32 object-cover rounded-lg"
                      width={100}
                      height={100}
                    />

                    <div className="flex flex-col justify-between">
                      <p className="small-medium">
                        Title:{" "}
                        <span className="small-bold">
                          {orderItem.productId.title}
                        </span>
                      </p>

                      {orderItem.color && (
                        <p className="small-medium">
                          Color:{" "}
                          <span className="small-bold">{orderItem.color}</span>
                        </p>
                      )}

                      {orderItem.size && (
                        <p className="small-medium">
                          Size:{" "}
                          <span className="small-bold">{orderItem.size}</span>
                        </p>
                      )}

                      <p className="small-medium">
                        Unit Price:{" "}
                        <span className="small-bold">
                          {orderItem.productId.price}
                        </span>
                      </p>

                      <p className="small-medium">
                        Quantity:{" "}
                        <span className="small-bold">{orderItem.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
