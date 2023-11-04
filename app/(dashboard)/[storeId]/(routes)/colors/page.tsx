import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import ColorClient from "./components/color-client";

const ColorsPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="colors" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </section>
  );
};

export default ColorsPage;
