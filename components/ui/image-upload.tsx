"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlusIcon, Trash } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";

interface IImageUpload {
  value: string[];
  disable?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: FC<IImageUpload> = ({
  onChange,
  onRemove,
  value,
  disable,
}) => {
  const [isMounted, setIsMounred] = useState<boolean>(false);

  useEffect(() => {
    setIsMounred(true);
  }, []);

  const onUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  if (!isMounted) return null;

  return (
    <section aria-label="image_upload_widget">
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                size={"icon"}
                variant={"destructive"}
                onClick={() => onRemove(url)}
                title="Remove image"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="o0emetg5">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              title="Add new image"
              type="button"
              disabled={disable}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlusIcon className="mr-2 h-4 w-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </section>
  );
};

export default ImageUpload;
