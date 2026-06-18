
import { AvatarProps } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";

interface UserAvatarProps extends AvatarProps {}

export function UserAvatar({ ...props }: UserAvatarProps) {
  const { data: session } = useSession();

  return (
    <Avatar {...props}>
      {session?.user?.image ? (
        <AvatarImage
          src={session.user.image}
          alt={session.user.name || ""}
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{session?.user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
