import { createNotification, notifyAdminsOfNewUser, notifyOfNewLike } from '@/lib/notifications';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { NotificationType } from '@/lib/types';

// This is a placeholder for a real secret
const WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const headersList = headers();
  const signature = headersList.get('x-supabase-signature');

  // if (!signature || !WEBHOOK_SECRET) {
  //   return new NextResponse('Signature or secret not found', { status: 401 });
  // }

  const body = await req.json();

  // TODO: Verify signature

  const { type, record, table } = body;

  if (type === 'INSERT') {
    switch (table) {
      case 'users':
        // Welcome notification for the new user
        await createNotification({
          user_id: record.id,
          message: 'Welcome to Apna Kisan! We are happy to have you here.',
          type: NotificationType.WELCOME,
          metadata: {},
          is_read: false,
        });

        // Notify admins
        await notifyAdminsOfNewUser(record.id);
        break;
      case 'likes':
        await notifyOfNewLike(record.post_id, record.user_id);
        break;
      default:
        break;
    }
  }

  return new NextResponse('Webhook processed', { status: 200 });
}
