
import { User } from '@supabase/supabase-js';
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.user_metadata?.avatar_url ? (
        <AvatarImage alt="Picture" src={user.user_metadata.avatar_url} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.user_metadata?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
