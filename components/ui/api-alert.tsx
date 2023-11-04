"use client";

import { FC } from "react";
import { Button } from "./button";
import toast from "react-hot-toast";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IApiAlert {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<IApiAlert["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<IApiAlert["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: FC<IApiAlert> = ({ description, title, variant }) => {
  const onCopy = () => {
    navigator.clipboard
      .writeText(description)
      .then(() => toast.success("API Route copied to the clipboard."))
      .catch(() => toast.error("Fail."));
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
