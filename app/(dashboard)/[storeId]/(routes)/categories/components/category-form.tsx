"use client";

import * as zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = zod.object({
  name: zod.string().min(4),
  billboardId: zod.string().min(4),
});

type TCategoryFormValues = zod.infer<typeof formSchema>;

const CategoryForm: FC<{
  initData: Category | null;
  billboards: Billboard[];
}> = ({ initData, billboards }) => {
  const router = useRouter();
  const { storeId, categoryId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initData ? "Edit category" : "Create category";
  const description = initData ? "Edit a category" : "Add a new category";
  const toastMessage = initData ? "Category updated." : "Category created.";
  const action = initData ? "Save changes" : "Create";

  const form = useForm<TCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (values: TCategoryFormValues) => {
    try {
      setLoading(true);
      if (initData) {
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, values);
      } else {
        await axios.post(`/api/${storeId}/categories`, values);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/${storeId}/categories`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/categories/${categoryId}`);
      toast.success("Category deleted.");
      router.refresh();
      router.push(`/${storeId}/categories`);
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm;
