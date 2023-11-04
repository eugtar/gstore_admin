import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import OrderClient from "./components/order-client";
import { priceFormatter } from "@/lib/utils";

const OrdersPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(","),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),
    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="orders" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </section>
  );
};

export default OrdersPage;
