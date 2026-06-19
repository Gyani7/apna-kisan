
'use server';

import { createServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFeed(page = 1, limit = 10) {
    const supabase = createServerClient();

    try {
        // 1. Fetch a page of item IDs from the RPC function
        const rpcResult = await supabase.rpc('get_feed_item_ids', {
            page_number: page,
            page_size: limit
        });

        if (rpcResult.error) {
            throw new Error(`Error calling get_feed_item_ids: ${rpcResult.error.message}`);
        }

        const itemIds = rpcResult.data;
        if (!itemIds || itemIds.length === 0) {
            return { data: [], error: null };
        }

        // 2. Separate IDs by type
        const itemIdsByType = itemIds.reduce((acc, item) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
            acc[item.type].push(item.id);
            return acc;
        }, {} as Record<string, string[]>);

        // 3. Fetch full data for each type in parallel
        const dataPromises = Object.entries(itemIdsByType).map(async ([type, ids]) => {
            let query;
            switch (type) {
                case 'post':
                    query = supabase
                        .from('posts')
                        .select(`id, title, content, created_at, slug, vote_count, post_type, is_featured, author:profiles(id, username, avatar_url, full_name)`)
                        .in('id', ids as string[]);
                    break;
                case 'story':
                    query = supabase
                        .from('stories')
                        .select(`id, media_url, media_type, created_at, author:profiles(id, username, avatar_url, full_name)`)
                        .in('id', ids as string[]);
                    break;
                case 'reel':
                    query = supabase
                        .from('reels')
                        .select(`id, caption, video_url, created_at, likes_count, comments_count, thumbnail_url, author:profiles(id, username, avatar_url, full_name)`)
                        .in('id', ids as string[]);
                    break;
                case 'product':
                    query = supabase
                        .from('products')
                        .select('id, title, price, image_urls, created_at, author:profiles!seller_id(id, username, avatar_url, full_name)')
                        .in('id', ids as string[]);
                    break;
                case 'mandi_rate':
                    query = supabase
                        .from('mandi_rates')
                        .select('id, commodity, mandi, state, price, change_percent, updated_at')
                        .in('id', ids as string[]);
                    break;
                default:
                    // This case should ideally not be reached if DB and code are in sync
                    console.warn(`Unknown feed item type: ${type}`);
                    return [];
            }
            
            const { data, error } = await query;

            if (error) {
                console.error(`Error fetching data for type ${type}:`, error.message);
                // Throwing an error will cause this promise to be rejected
                throw new Error(`Data fetch failed for ${type}`);
            }

            // Add type and handle any data transformation
            if (type === 'mandi_rate') {
                return data.map(r => ({ ...r, type: 'mandi_rate', created_at: r.updated_at }));
            }
            return data.map(item => ({ ...item, type }));
        });

        // Use Promise.allSettled to prevent one failing source from breaking the entire feed
        const results = await Promise.allSettled(dataPromises);
        
        const feedItems = results
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => (result as PromiseFulfilledResult<any[]>).value);
        
        // 4. Re-sort the final list based on the order from the RPC call
        const sortedFeedItems = itemIds
            .map(item => feedItems.find(feedItem => feedItem && feedItem.id === item.id && feedItem.type === item.type))
            .filter(Boolean); // .filter(Boolean) removes undefined entries if an item failed to fetch

        return { data: sortedFeedItems, error: null };

    } catch (error: any) {
        console.error("Error fetching feed:", error);
        return { data: null, error: `Failed to fetch feed: ${error.message}` };
    }
}

export async function createPost({ content }: { content: string }) {
  const supabase = createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a post.");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([{ content, author_id: user.id }])
    .select();

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }

  // Revalidate the community page to show the new post
  revalidatePath("/community");

  return data;
}
