"use client";

import * as zod from "zod";
import axios from "axios";
import { useOrigin } from "@/hooks";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import AlertModal from "./modals/alert-modal";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApiAlert from "@/components/ui/api-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = zod.object({
  name: zod.string().min(4),
});

type TSettingsFormValues = zod.infer<typeof formSchema>;

const SettingsForm: FC<{ initData: Store }> = ({ initData }) => {
  const router = useRouter();
  const origin = useOrigin();
  const { storeId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<TSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initData,
  });

  const onSubmit = async (values: TSettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);
      // window.location.reload();
      router.refresh();
      router.push("/");
      toast.success("Store update");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${storeId}`);
      // window.location.assign("/");
      router.refresh();
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Make sure you remove all products and categories first.");
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
        <Heading title={"Settings"} description={"Manage store preferences"} />
        <Button
          title="Delete"
          size={"icon"}
          disabled={loading}
          variant={"destructive"}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                      placeholder="Store name"
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
            title="Save change"
          >
            Save change
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title={"NEXT_PUBLIC_API_URL"}
        variant={"public"}
        description={`${origin}/api/${storeId}`}
      />
    </>
  );
};

export default SettingsForm;
