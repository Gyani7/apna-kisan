
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const PageHeaderVariants = cva(
  "grid gap-2",
  {
    variants: {
      size: {
        default: "",
        sm: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof PageHeaderVariants> {}

function PageHeader({ className, size, ...props }: PageHeaderProps) {
  return (
    <section className={cn(PageHeaderVariants({ size, className }))} {...props} />
  );
}

const PageHeaderHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-4xl",
        className
      )}
      {...props}
    />
  );
});

PageHeaderHeading.displayName = "PageHeaderHeading";

const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "max-w-[750px] text-lg text-muted-foreground sm:text-xl",
        className
      )}
      {...props}
    />
  );
});

PageHeaderDescription.displayName = "PageHeaderDescription";

export { PageHeader, PageHeaderHeading, PageHeaderDescription };
