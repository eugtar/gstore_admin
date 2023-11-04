import { auth } from "@clerk/nextjs";
import { FC, ReactNode } from "react";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

const DashboardLayout: FC<{
  children: ReactNode;
  params: { storeId: string };
}> = async ({ children, params }) => {
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
    <>
      <Navbar />
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};

export default DashboardLayout;
