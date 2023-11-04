"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { CategoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { usePathname, useRouter } from "next/navigation";

const CategoryClient: FC<{ data: CategoryColumn[] }> = ({
  data: categories,
}) => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />
        <Button
          type="button"
          title="Add new"
          onClick={() => router.push(`${currentPath}/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title={"API"} description={"API calls for Categories"} />
      <Separator />
      <ApiList entityName={"categories"} entityIdName={"{categoryId}"} />
    </>
  );
};

export default CategoryClient;
