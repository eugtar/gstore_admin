"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import { Edit, MoreHorizontal, Trash, Copy } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const CellAction: FC<{ data: CategoryColumn }> = ({ data }) => {
  const router = useRouter();
  const path = usePathname();
  const { storeId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /* COPY ACTION FC */
  const onCopy = () => {
    navigator.clipboard
      .writeText(data.id)
      .then(() => toast.success("Category ID copied to the clipboard."))
      .catch(() => toast.error("Fail."));
  };
  /* UPDATE ACTION FC */
  const onUpdate = () => {
    router.push(`${path}/${data.id}`);
  };
  /* DELETE ACTION FC */
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/categories/${data.id}`);
      toast.success("Category deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you remove all products using this category first.",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="h-8 w-8 p-0"
            title="Actions"
            type="button"
          >
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            title="Copy ID"
            onClick={onCopy}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            title="Update"
            onClick={onUpdate}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            title="Delete"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
