"use client";

import * as zod from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
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
  value: zod.string().min(4).regex(/^#/, {
    message: "String must be a value hex code",
  }),
});

type TColorFormValues = zod.infer<typeof formSchema>;

const ColorForm: FC<{ initData: Color | null }> = ({ initData }) => {
  const router = useRouter();
  const { storeId, colorId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initData ? "Edit color" : "Create color";
  const description = initData ? "Edit a color" : "Add a new color";
  const toastMessage = initData ? "Color updated." : "Color created.";
  const action = initData ? "Save changes" : "Create";

  const form = useForm<TColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: TColorFormValues) => {
    try {
      setLoading(true);
      if (initData) {
        await axios.patch(`/api/${storeId}/colors/${colorId}`, values);
      } else {
        await axios.post(`/api/${storeId}/colors`, values);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/${storeId}/colors`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/colors/${colorId}`);
      toast.success("Color deleted.");
      router.refresh();
      router.push(`/${storeId}/colors`);
    } catch (error) {
      toast.error("Make sure you remove all products using this color first.");
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
                      placeholder="Color name"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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

export default ColorForm;
