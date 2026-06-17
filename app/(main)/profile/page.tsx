'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { getUser } from '@/lib/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { withAuthorization } from '@/components/withAuthorization';

function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      if (currentUser) {
         const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
        setUser(data);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [supabase]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="text-4xl">{user.username?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{user.username}</CardTitle>
        <p className="text-muted-foreground">{user.role}</p>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-6">{user.bio || 'This user has not set a bio yet.'}</p>
        <Link href="/profile/edit">
            <Button>Edit Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(ProfilePage, ['farmer', 'expert', 'buyer']);
