import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainContent = ({ children }: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
  );
};
