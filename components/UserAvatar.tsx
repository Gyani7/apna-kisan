
import { AvatarProps } from "@radix-ui/react-avatar";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";

interface UserAvatarProps extends AvatarProps {}

export function UserAvatar({ ...props }: UserAvatarProps) {
  const { profile } = useAuth();

  return (
    <Avatar {...props}>
      {profile?.avatar_url ? (
        <AvatarImage
          src={profile.avatar_url}
          alt={profile.full_name || ""}
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{profile?.full_name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
