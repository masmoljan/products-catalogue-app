import { PropsWithChildren } from "react";
import { CardDescription } from "../ui/card";

export default function ProductDescription ({ 
  children, 
  ...props 
} : PropsWithChildren | React.HTMLAttributes<HTMLDivElement>) {
  return (
    <CardDescription {...props}>{children}</CardDescription>
  );
}