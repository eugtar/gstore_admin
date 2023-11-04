import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
import ProductClient from "./components/product-client";

const ProductsPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: priceFormatter.format(item.price),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.value,
    color: item.color.value,

    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="products" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </section>
  );
};

export default ProductsPage;
