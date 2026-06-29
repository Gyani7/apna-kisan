'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Notification, NotificationType, POST_TYPE_CONFIG, NewLikeNotificationMetadata } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
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

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
      } else if (data) {
        setNotifications(data as Notification[]);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, [supabase, user]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notification.id);

      if (error) {
        console.error('Error marking notification as read:', error);
      } else {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
        );
      }
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all as read:', error);
    } else {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    }
  };

  const renderNotificationContent = (notification: Notification) => {
    const Icon = POST_TYPE_CONFIG.notification.icon;
    let content = <p>{notification.message}</p>;
    let link = '#';

    switch (notification.type) {
        case NotificationType.NEW_LIKE:
            link = `/post/${(notification.metadata as NewLikeNotificationMetadata).post_id}`;
            content = <p>Your post was liked</p>;
            break;
        case NotificationType.WELCOME:
            content = <p>Welcome to Apna Kisan!</p>;
            break;
        case NotificationType.NEW_USER:
            content = <p>A new user has joined!</p>;
            break;
        default:
            break;
    }

    return (
        <Link href={link} className="w-full">
            <div className="flex items-start space-x-4">
                <div className={`${POST_TYPE_CONFIG.notification.bgColor} p-2 rounded-full`}>
                  <Icon className={`${POST_TYPE_CONFIG.notification.color} w-6 h-6`} />
                </div>
                <div>
                    {content}
                    <p className="text-sm text-muted-foreground">
                        {new Date(notification.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </Link>
    )

  }

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button onClick={markAllAsRead} disabled={notifications.every(n => n.is_read)}>
          Mark all as read
        </Button>
      </div>
      {notifications.length === 0 ? (
        <p>You have no notifications.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 mb-2 rounded-lg cursor-pointer ${
                notification.is_read ? 'bg-muted' : 'bg-primary/10'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              {renderNotificationContent(notification)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
