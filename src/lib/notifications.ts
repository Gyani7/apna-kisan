
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { UserRole, NotificationType } from './types';

export const createNotification = async (notification: any) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('notifications').insert(notification);
  if (error) {
    console.error('Error sending notification:', error);
  }
  return data;
};

export const notifyAdminsOfNewUser = async (newUserId: string) => {
    const supabase = await createSupabaseServerClient();
    const { data: admins, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', UserRole.Admin);

    if (error) {
      console.error('Error fetching admins:', error);
      return;
    }

    const notifications = admins.map((admin) => ({
      user_id: admin.id,
      type: 'admin_notification',
      message: `A new user has joined.`,
      metadata: { new_user_id: newUserId },
    }));

    await Promise.all(notifications.map(createNotification));
};

export const notifyOfNewLike = async (postId: string, likerId: string) => {
    const supabase = await createSupabaseServerClient();
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      console.error('Error fetching post author:', postError);
      return;
    }

    const postAuthorId = post.user_id;

    if (postAuthorId === likerId) {
        return;
    }

    const notification = {
        user_id: postAuthorId,
        type: NotificationType.NEW_LIKE,
        message: `Someone liked your post.`,
        metadata: {
            post_id: postId,
            liker_id: likerId,
        },
        is_read: false,
    };
    await createNotification(notification);
};