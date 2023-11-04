import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/category-client";

const CategoriesPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="categories" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </section>
  );
};

export default CategoriesPage;
