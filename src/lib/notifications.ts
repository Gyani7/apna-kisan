import { createSupabaseServerClient } from '@/lib/supabase/server';
import { UserRole, NotificationType } from './types';

export const sendNotification = async (notification: any) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('notifications').insert(notification);
  if (error) {
    console.error('Error sending notification:', error);
  }
  return data;
};

export const createNewUserNotification = async (userId: string) => {
  const notification = {
    user_id: userId,
    type: NotificationType.NEW_USER,
    metadata: {},
  };
  await sendNotification(notification);
};

export const createWelcomeNotification = async (userId: string) => {
  const notification = {
    user_id: userId,
    type: NotificationType.WELCOME,
    metadata: {},
  };
  await sendNotification(notification);
};

export const createAdminNotification = async (message: string) => {
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
    metadata: { message },
  }));

  await Promise.all(notifications.map(sendNotification));
};
