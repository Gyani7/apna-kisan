'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseClient } from '@/lib/supabase/client';
import withAuthorization from '@/components/withAuthorization';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/lib/types';
import { User } from '@supabase/supabase-js';

function EditProfilePage() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        console.error('Error fetching profile:', error);
        toast({ title: 'Profile not found', variant: 'destructive' });
        router.push('/profile');
        return;
      }

      setUsername(data.username || '');
      setBio(data.bio || '');
      setAvatarUrl(data.avatar_url || '');
      setIsLoading(false);
    };

    fetchProfile();
  }, [user, router, supabase, toast]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    let newAvatarUrl = avatarUrl;
    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}/${Date.now()}_${avatarFile.name}`, avatarFile, { upsert: true });

      if (error) {
        console.error('Error uploading avatar:', error);
        toast({ title: 'Error uploading avatar', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
      newAvatarUrl = publicUrlData.publicUrl;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        username,
        bio,
        avatar_url: newAvatarUrl,
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      toast({ title: 'Error updating profile', variant: 'destructive' });
    } else {
      toast({ title: 'Profile updated successfully!' });
      router.push('/profile');
    }

    setIsSubmitting(false);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
             <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-4xl">{username?.[0].toUpperCase()}</AvatarFallback>
             </Avatar>
            <Input id="avatar" type="file" onChange={handleAvatarChange} accept="image/*" />
          </div>
          <div className="space-y-2">
            <label htmlFor="username">Username</label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="bio">Bio</label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(EditProfilePage, [UserRole.FARMER, UserRole.EXPERT, UserRole.BUYER]);
