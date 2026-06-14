import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "",
      centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
      markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

function PageHeader({ className, as: Comp = "section", ...props }: PageHeaderProps) {
  return <Comp className={cn(shellVariants({ className }), className)} {...props} />;
}

const headingVariants = cva(
  "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]"
);

interface PageHeaderHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function PageHeaderHeading({ className, as: Comp = "h1", ...props }: PageHeaderHeadingProps) {
  return <Comp className={cn(headingVariants({ className }), className)} {...props} />;
}

const descriptionVariants = cva("max-w-[750px] text-lg text-muted-foreground sm:text-xl", {
  variants: {
    variant: {
      default: "",
      sidebar: "",
      centered: "mx-auto",
      markdown: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PageHeaderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {}

function PageHeaderDescription({
  className,
  ...props
}: PageHeaderDescriptionProps) {
  return <p className={cn(descriptionVariants({ className }), className)} {...props} />;
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription };