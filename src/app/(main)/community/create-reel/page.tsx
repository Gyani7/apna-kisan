import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { CreateReelForm } from '@/components/community/CreateReelForm';
import { UserRole } from '@/lib/types';

export default async function CreateReelPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return redirect('/login');
  }

  const canCreateReel = [
    UserRole.Farmer,
    UserRole.Expert,
    UserRole.Buyer
  ].includes(profile.role);

  if (!canCreateReel) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Permission Denied</h1>
        <p>You do not have permission to create reels.</p>
      </div>
    );
  }

  const handleCreateReel = async (formData: FormData) => {
    'use server';

    const caption = formData.get('caption') as string;
    const videoFile = formData.get('video') as File;

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('reels')
        .upload(`${user.id}/${Date.now()}_${videoFile.name}`, videoFile);

      if (uploadError) {
        console.error('Error uploading video:', uploadError);
        return;
      }

      const { data, error } = await supabase.from('posts').insert([
        {
          caption,
          video_url: uploadData.path,
          user_id: user.id,
          post_type: 'reel',
        },
      ]);

      if (error) {
        console.error('Error inserting reel:', error);
      } else {
        redirect('/community');
      }
    }
  };

  return <CreateReelForm onSubmit={handleCreateReel} />;
}
