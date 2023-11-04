"use client";

import * as zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/image-upload";
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
  label: zod.string().min(4),
  imageUrl: zod.string().min(1),
});

type TBillboardFormValues = zod.infer<typeof formSchema>;

const BillboardForm: FC<{ initData: Billboard | null }> = ({ initData }) => {
  const router = useRouter();
  const { storeId, billboardId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initData ? "Edit billboard" : "Create billboard";
  const description = initData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initData ? "Billboard updated." : "Billboard created.";
  const action = initData ? "Save changes" : "Create";

  const form = useForm<TBillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: TBillboardFormValues) => {
    try {
      setLoading(true);
      if (initData) {
        await axios.patch(`/api/${storeId}/billboards/${billboardId}`, values);
      } else {
        await axios.post(`/api/${storeId}/billboards`, values);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/${storeId}/billboards`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`);
      toast.success("Billboard deleted.");
      router.refresh();
      router.push(`/${storeId}/billboards`);
    } catch (error) {
      toast.error(
        "Make sure you remove all categories using this billboard first.",
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disable={loading}
                    onRemove={() => field.onChange("")}
                    onChange={(url) => field.onChange(url)}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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

export default BillboardForm;
