"use client";

import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof Popover>;

interface IStoreSwitcher extends PopoverTriggerProps {
  items: Store[];
  className?: string;
}

const StoreSwitcher: FC<IStoreSwitcher> = ({ className = "", items = [] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <article aria-label="store_info">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            aria-expanded={open}
            aria-label="Select a store"
            className={cn("w-[200px] justify-between", className)}
            title="Select Store"
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="Search store..."
                className="cursor-text"
              />
              <CommandEmpty className="cursor-default">
                No store found.
              </CommandEmpty>
              <CommandGroup heading={"Stores"} className="cursor-default">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="cursor-pointer text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                  className="cursor-pointer"
                  title="Create Store"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </article>
  );
};

export default StoreSwitcher;
