import { FC } from "react";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/settings-form";

const SettingsPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <section aria-label="settings" className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initData={store} />
      </div>
    </section>
  );
};

export default SettingsPage;
