import { PropsWithChildren } from "react";
import { CardTitle } from "../ui/card";

export default function ProductTitle({ 
  children, 
  ...props 
} : PropsWithChildren | React.HTMLAttributes<HTMLDivElement>) {

  return (
    <CardTitle {...props}>{children}</CardTitle>
  );
}