"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { ColorColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { usePathname, useRouter } from "next/navigation";

const ColorClient: FC<{ data: ColorColumn[] }> = ({ data: colors }) => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
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
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title={"API"} description={"API calls for Colors"} />
      <Separator />
      <ApiList entityName={"colors"} entityIdName={"{colorId}"} />
    </>
  );
};

export default ColorClient;
