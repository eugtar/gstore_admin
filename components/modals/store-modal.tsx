"use client";

import axios from "axios";
import * as zod from "zod";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { useStoreModal } from "@/hooks";
import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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

const StoreModal: FC = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("api/stores", values);
      window.location.assign(`/${response.data.id}`);
      console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-Commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                  <Button
                    disabled={loading}
                    variant={"outline"}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
