"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { BillboardColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { usePathname, useRouter } from "next/navigation";

const BillboardClient: FC<{ data: BillboardColumn[] }> = ({
  data: billboards,
}) => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
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
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title={"API"} description={"API calls for Billboards"} />
      <Separator />
      <ApiList entityName={"billboards"} entityIdName={"{billboardId}"} />
    </>
  );
};

export default BillboardClient;
