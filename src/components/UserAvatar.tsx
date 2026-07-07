
import { AvatarProps } from "@radix-ui/react-avatar";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserIcon } from "./icons";

interface UserAvatarProps extends AvatarProps {}

export function UserAvatar({ ...props }: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar {...props}>
      {user?.photoURL ? (
        <AvatarImage
          src={user.photoURL}
          alt={user.displayName || ""}
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.displayName}</span>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
