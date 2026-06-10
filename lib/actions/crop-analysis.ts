'use server';

import { z } from 'zod';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// --- ZOD SCHEMA FOR INPUT VALIDATION ---
const ImageAnalysisSchema = z.object({
  image: z.instanceof(File).refine(file => file.size > 0, 'An image file is required.')
    .refine(file => file.size < 4 * 1024 * 1024, `Image must be less than 4MB.`)
    .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 'Only .jpg, .png, and .webp formats are supported.'),
});

// --- SIMULATED AI ANALYSIS SERVICE ---
// In a real application, this would be a call to an external service like OpenAI or Gemini.
async function getMockAIAnalysis(imageUrl: string): Promise<any> {
  console.log(`Simulating AI analysis for image: ${imageUrl}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock responses based on some deterministic factor from the URL
  if (imageUrl.includes('healthy')) {
    return {
      detected_disease: 'No Disease Detected',
      confidence_score: 0.98,
      recommendations: ['Maintain current watering schedule', 'Monitor for pests'],
    };
  }
  
  return {
    detected_disease: 'Late Blight',
    confidence_score: 0.92,
    recommendations: [
      'Apply a certified fungicide immediately.',
      'Remove and destroy infected plant parts.',
      'Improve air circulation around plants.',
      'Rotate crops in the next planting season.'
    ],
  };
}

// --- SERVER ACTION ---

interface AnalysisFormState {
  success: boolean;
  message: string;
  analysisResult?: any;
  errors?: Record<string, string[] | undefined>;
}

export async function analyzeCropImage(prevState: AnalysisFormState, formData: FormData): Promise<AnalysisFormState> {
  const supabase = createServerActionClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Authentication Error: Please log in to use this feature.' };
  }

  const validation = ImageAnalysisSchema.safeParse({ image: formData.get('image') });

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid input.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { image } = validation.data;
  const filePath = `${user.id}/${Date.now()}-${image.name}`;

  // 1. Upload the image to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('crop_images')
    .upload(filePath, image);

  if (uploadError) {
    return { success: false, message: `Storage Error: ${uploadError.message}` };
  }

  // 2. Get the public URL of the uploaded image
  const { data: { publicUrl } } = supabase.storage.from('crop_images').getPublicUrl(filePath);

  // 3. Create an initial analysis record
  const { data: analysisRecord, error: insertError } = await supabase
    .from('crop_health_analysis')
    .insert({ user_id: user.id, image_url: publicUrl, status: 'pending' })
    .select().single();

  if (insertError) {
    return { success: false, message: `Database Error: ${insertError.message}` };
  }

  try {
    // 4. Call the AI analysis service
    const analysisResult = await getMockAIAnalysis(publicUrl);

    // 5. Update the analysis record with the results
    const { data: updatedRecord, error: updateError } = await supabase
      .from('crop_health_analysis')
      .update({
        status: 'completed',
        analysis_provider: 'openai_mock',
        analysis_payload: analysisResult,
        detected_disease: analysisResult.detected_disease,
        confidence_score: analysisResult.confidence_score,
        recommendations: analysisResult.recommendations,
      })
      .eq('id', analysisRecord.id)
      .select().single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    revalidatePath('/dashboard/crop-analysis'); // Assuming this is the page where results are displayed
    return {
      success: true,
      message: 'Analysis complete.',
      analysisResult: updatedRecord,
    };

  } catch (e: any) {
    // If AI analysis fails, update the status to 'failed'
    await supabase.from('crop_health_analysis').update({ status: 'failed' }).eq('id', analysisRecord.id);
    return { success: false, message: `Analysis failed: ${e.message}` };
  }
}
