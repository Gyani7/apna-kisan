'use server';

import { createClient } from '@supabase/supabase-js';
import { Notification, NotificationType, UserRole } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('notifications')
        .insert([notification])
        .select();

    if (error) {
        console.error('Error creating notification:', error);
        return null;
    }

    return data ? data[0] : null;
}

export async function notifyAdminsOfNewUser(userId: string) {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('role', UserRole.ADMIN);

    if (error) {
        console.error('Error fetching admins:', error);
        return;
    }

    const adminIds = data.map((admin) => admin.id);

    for (const adminId of adminIds) {
        await createNotification({
            user_id: adminId,
            message: `A new user with ID ${userId} has signed up.`,
            type: NotificationType.NEW_USER,
            metadata: { new_user_id: userId },
            is_read: false,
        });
    }
}

export async function notifyOfNewLike(postId: string, likedByUserId: string) {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single();

    if (postError) {
        console.error('Error fetching post author:', postError);
        return;
    }

    if (post) {
        const postAuthorId = post.user_id;
        // Avoid notifying the user if they liked their own post
        if (postAuthorId !== likedByUserId) {
            await createNotification({
                user_id: postAuthorId,
                message: `Your post was liked by user ${likedByUserId}`,
                type: NotificationType.NEW_LIKE,
                metadata: { post_id: postId, liked_by_user_id: likedByUserId },
                is_read: false,
            });
        }
    }
}
