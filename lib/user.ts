'use client';

import { createBrowserClient } from '@/lib/supabase/client';

export async function getUser() {
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getUserProfile() {
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*, role:roles(name)')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data;
}

export async function getUserRole() {
    const profile = await getUserProfile();

    if (!profile || !profile.role) {
        return null;
    }

    const role = profile.role;

    if (Array.isArray(role)) {
        return role[0]?.name || null;
    } else {
        return role.name || null;
    }
}
