"use client";

import * as zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = zod.object({
  name: zod.string().min(3),
  value: zod.string().min(1),
});

type TSizeFormValues = zod.infer<typeof formSchema>;

const SizeForm: FC<{ initData: Size | null }> = ({ initData }) => {
  const router = useRouter();
  const { storeId, sizeId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initData ? "Edit size" : "Create size";
  const description = initData ? "Edit a size" : "Add a new size";
  const toastMessage = initData ? "Size updated." : "Size created.";
  const action = initData ? "Save changes" : "Create";

  const form = useForm<TSizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: TSizeFormValues) => {
    try {
      setLoading(true);
      if (initData) {
        await axios.patch(`/api/${storeId}/sizes/${sizeId}`, values);
      } else {
        await axios.post(`/api/${storeId}/sizes`, values);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/${storeId}/sizes`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
      toast.success("Size deleted.");
      router.refresh();
      router.push(`/${storeId}/sizes`);
    } catch (error) {
      toast.error("Make sure you remove all products using this size first.");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initData && (
          <Button
            title="Delete"
            size={"icon"}
            disabled={loading}
            variant={"destructive"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            title={action}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
