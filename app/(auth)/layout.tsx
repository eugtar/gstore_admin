import { FC, ReactNode } from "react";

const layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="flex h-full w-full items-center justify-center">
      {children}
    </section>
  );
};

export default layout;
