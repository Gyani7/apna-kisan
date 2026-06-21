
import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)}>{children}</div>
  );
}
