'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface UserProfile {
  id: string;
  age: number;
  land_holding_acres: number;
  is_loanee_farmer: boolean;
  has_crop_insurance: boolean;
  // Add other relevant profile fields here
}

interface Scheme {
  id: string;
  eligibility_criteria: any;
}

interface MatchResult {
  user_id: string;
  scheme_id: string;
  match_score: number;
  is_eligible: boolean;
}

/**
 * Matches a user against a list of government schemes and upserts the results.
 */
export async function matchUserToSchemes() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // 1. Fetch user profile (assuming a 'profiles' table with these columns)
  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('age, land_holding_acres, is_loanee_farmer, has_crop_insurance')
    .eq('id', user.id)
    .single();

  if (profileError || !userProfile) {
    console.error('Error fetching profile:', profileError);
    return { success: false, message: 'Could not retrieve user profile.' };
  }

  // 2. Fetch all active schemes
  const { data: schemes, error: schemesError } = await supabase
    .from('government_schemes')
    .select('id, eligibility_criteria')
    .eq('is_active', true);

  if (schemesError) {
    return { success: false, message: `Could not retrieve schemes: ${schemesError.message}` };
  }

  // 3. Run the matching algorithm
  const matchResults: MatchResult[] = schemes.map(scheme => {
    const criteria = scheme.eligibility_criteria;
    let metCriteria = 0;
    let totalCriteria = 0;

    if (criteria.land_holding_max_acres) {
      totalCriteria++;
      if (userProfile.land_holding_acres <= criteria.land_holding_max_acres) {
        metCriteria++;
      }
    }
    if (criteria.min_age) {
      totalCriteria++;
      if (userProfile.age >= criteria.min_age) {
        metCriteria++;
      }
    }
    // ... add more criteria checks here as your profile data expands ...

    const match_score = totalCriteria > 0 ? (metCriteria / totalCriteria) : 0;
    const is_eligible = match_score === 1;

    return {
      user_id: user.id,
      scheme_id: scheme.id,
      match_score,
      is_eligible,
    };
  });

  // 4. Upsert match results into the database
  const { error: upsertError } = await supabase
    .from('user_scheme_matches')
    .upsert(matchResults, { onConflict: 'user_id, scheme_id' });

  if (upsertError) {
    return { success: false, message: `Failed to save matches: ${upsertError.message}` };
  }

  revalidatePath('/dashboard/schemes'); // Revalidate the page to show new matches

  // 5. Return the top matches
  const { data: topMatches, error: topMatchesError } = await supabase
    .from('user_scheme_matches')
    .select(`
      match_score,
      is_eligible,
      government_schemes (*)
    `)
    .eq('user_id', user.id)
    .order('match_score', { ascending: false });

  if (topMatchesError) {
    return { success: false, message: `Failed to fetch top matches: ${topMatchesError.message}` };
  }

  return { success: true, matches: topMatches };
}
