import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import BillboardClient from "./components/billboard-client";

const BillboardsPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: item.createdAt.toLocaleDateString("en-US", {
      dateStyle: "medium",
    }),
  }));

  return (
    <section aria-label="billboards" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </section>
  );
};

export default BillboardsPage;
