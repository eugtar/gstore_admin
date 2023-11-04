import { auth } from "@clerk/nextjs";
import { FC, ReactNode } from "react";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const SetupLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default SetupLayout;