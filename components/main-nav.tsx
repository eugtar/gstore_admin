"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import { useParams, usePathname } from "next/navigation";

const MainNav: FC<{ className: string }> = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const { storeId } = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/${storeId}`,
      label: "Overview",
      active: pathname === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathname.includes("billboards"),
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathname.includes("categories"),
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      active: pathname.includes("sizes"),
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      active: pathname.includes("colors"),
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathname.includes("products"),
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathname.includes("orders"),
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathname.includes("settings"),
    },
  ];

  return (
    <nav
      aria-label="main_navigation"
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map(({ active, href, label }) => (
        <Link
          key={href}
          href={href}
          title={label}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
