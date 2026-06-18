
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)}>
      <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
      {children}
    </div>
  );
}
