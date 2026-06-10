'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// --- TYPE DEFINITIONS ---
export type ActionResult = {
  success: boolean;
  message: string;
};

export type LikeActionResult = ActionResult & {
  is_liked?: boolean;
  likes_count?: number;
};

// --- ZOD SCHEMAS FOR VALIDATION ---
const ReelIdSchema = z.string().uuid('Invalid Reel ID provided.');

const AddCommentSchema = z.object({
  comment: z.string().min(1, 'Comment cannot be empty.').max(500, 'Comment cannot exceed 500 characters.'),
  reel_id: ReelIdSchema,
});

const CreateReelSchema = z.object({
  caption: z.string().max(2000, 'Caption cannot exceed 2000 characters.').optional(),
  video_url: z.string().url('A valid video URL must be provided.'),
});

// --- HELPER TO GET SUPABASE SERVER CLIENT ---
function getSupabaseServerClient() {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!,
        {
            cookies: {
                get: (name) => cookieStore.get(name)?.value,
                set: (name, value, options) => cookieStore.set({ name, value, ...options }),
                remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
            },
        }
    );
}

// --- SERVER ACTIONS ---

/**
 * Toggles a user's like on a reel by calling a PostgreSQL RPC function.
 * This provides atomicity and prevents race conditions.
 */
export async function toggleLike(reelId: string): Promise<LikeActionResult> {
    const supabase = getSupabaseServerClient();

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { success: false, message: 'Unauthorized action.' };
        }

        // Validate the incoming reelId
        const validation = ReelIdSchema.safeParse(reelId);
        if (!validation.success) {
            return { success: false, message: 'Invalid Reel ID.' };
        }

        // Call the atomic RPC function
        const { data, error: rpcError } = await supabase.rpc('toggle_reel_like', {
            p_reel_id: validation.data,
            p_user_id: user.id,
        });

        if (rpcError) {
            // Data Masking: Log internal error, return generic message
            console.error('RPC toggle_reel_like Error: [ID Masked]', { message: rpcError.message });
            return { success: false, message: 'Could not update like status.' };
        }

        revalidatePath('/reels');

        return { 
            success: true, 
            message: 'Like status updated.', 
            is_liked: data.is_liked,
            likes_count: data.likes_count
        };

    } catch (e) {
        console.error('Unexpected Like Toggle Error: [ID Masked]');
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

/**
 * Adds a comment to a reel using an atomic RPC function.
 */
export async function addComment(formData: FormData): Promise<ActionResult> {
    const supabase = getSupabaseServerClient();
    
    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { success: false, message: 'You must be logged in to comment.' };
        }

        const validation = AddCommentSchema.safeParse(Object.fromEntries(formData.entries()));
        if (!validation.success) {
            return { success: false, message: validation.error.flatten().fieldErrors.comment?.[0] || 'Invalid comment.' };
        }

        const { error: rpcError } = await supabase.rpc('add_reel_comment', {
            p_reel_id: validation.data.reel_id,
            p_user_id: user.id,
            p_content: validation.data.comment,
        });

        if (rpcError) {
            console.error('RPC add_reel_comment Error: [ID Masked]', { message: rpcError.message });
            return { success: false, message: 'Failed to post comment.' };
        }

        revalidatePath('/reels');
        return { success: true, message: 'Comment posted successfully!' };

    } catch (e) {
        console.error('Unexpected Commenting Error: [Data Masked]');
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

/**
 * Creates the database record for a new reel.
 */
export async function createReelRecord(formData: FormData): Promise<ActionResult> {
  const supabase = getSupabaseServerClient();

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, message: 'Unauthorized. You must be logged in to upload a reel.' };
    }

    const validation = CreateReelSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validation.success) {
      return { success: false, message: validation.error.flatten().fieldErrors.video_url?.[0] || 'Invalid input.' };
    }

    const { error: insertError } = await supabase.from('reels').insert({
      user_id: user.id,
      video_url: validation.data.video_url,
      caption: validation.data.caption,
    });

    if (insertError) {
      console.error('Reel Insert Error: [User ID Masked]', { message: insertError.message });
      return { success: false, message: 'Could not save reel to database.' };
    }

    revalidatePath('/reels');

    return { success: true, message: 'Your reel has been published!' };

  } catch (e) {
    console.error('Unexpected Reel Creation Error: [Input Data Masked]');
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
