import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import SizeClient from "./components/size-client";

const SizesPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="sizes" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </section>
  );
};

export default SizesPage;
