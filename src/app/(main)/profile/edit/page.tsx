import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EditProfileForm } from '@/components/EditProfileForm';
import { UserRole } from '@/lib/types';

export default async function EditProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const handleUpdateProfile = async (formData: FormData) => {
    'use server';

    const username = formData.get('username') as string;
    const fullName = formData.get('fullName') as string;
    const bio = formData.get('bio') as string;
    const avatarFile = formData.get('avatar') as File;

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      let avatarUrl = profile?.avatar_url;
      if (avatarFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}/${Date.now()}_${avatarFile.name}`, avatarFile);

        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          return;
        }
        avatarUrl = uploadData.path;
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          bio,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        redirect('/profile');
      }
    }
  };

  return (
    <EditProfileForm
      profile={profile}
      onSubmit={handleUpdateProfile}
      userRoles={[
        UserRole.Farmer,
        UserRole.Expert,
        UserRole.Buyer
      ]}
    />
  );
}
