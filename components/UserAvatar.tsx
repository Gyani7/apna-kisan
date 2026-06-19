
import { AvatarProps } from "@radix-ui/react-avatar";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";

interface UserAvatarProps extends AvatarProps {}

export function UserAvatar({ ...props }: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar {...props}>
      {user?.avatar_url ? (
        <AvatarImage
          src={user.avatar_url}
          alt={user.full_name || ""}
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.full_name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
