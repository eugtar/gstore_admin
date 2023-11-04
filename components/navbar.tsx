import { FC } from "react";
import prismadb from "@/lib/prismadb";
import ToggleTheme from "./theme-toggle";
import { redirect } from "next/navigation";
import MainNav from "@/components/main-nav";
import { UserButton, auth } from "@clerk/nextjs";
import StoreSwitcher from "@/components/store-switcher";

const Navbar: FC = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <section
        aria-label="navigation_panel"
        className="flex h-16 items-center px-4"
      >
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <article
          aria-label="user_info"
          className="ml-auto flex items-center space-x-4"
        >
          <ToggleTheme />
          <UserButton afterSignOutUrl="/" />
        </article>
      </section>
    </header>
  );
};

export default Navbar;
