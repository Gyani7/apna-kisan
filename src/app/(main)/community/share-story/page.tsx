import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ShareStoryForm } from '@/components/community/ShareStoryForm';
import { UserRole } from '@/lib/types';

export default async function ShareStoryPage() {
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

  const canShareStory = [
    UserRole.Farmer,
    UserRole.Expert,
    UserRole.Buyer
  ].includes(profile.role);

  if (!canShareStory) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Permission Denied</h1>
        <p>You do not have permission to share stories.</p>
      </div>
    );
  }

  const handleShareStory = async (formData: FormData) => {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File;

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      let imageUrl = null;
      if (imageFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('stories')
          .upload(`${user.id}/${Date.now()}_${imageFile.name}`, imageFile);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          return;
        }
        imageUrl = uploadData.path;
      }

      const { data, error } = await supabase.from('posts').insert([
        {
          title,
          content,
          image_url: imageUrl,
          user_id: user.id,
          post_type: 'story',
        },
      ]);

      if (error) {
        console.error('Error inserting story:', error);
      } else {
        redirect('/community');
      }
    }
  };

  return <ShareStoryForm onSubmit={handleShareStory} />;
}
