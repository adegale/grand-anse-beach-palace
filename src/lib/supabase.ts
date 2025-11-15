// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for an image
export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from('hotel-images')
    .getPublicUrl(path);
  
  return data.publicUrl;
}

// Helper function to get room image URL
// Usage: getRoomImageUrl(6, '1.jpg') or getRoomImageUrl(6, 'Room 6 Ocean View.jpg')
export function getRoomImageUrl(roomNumber: number, filename: string): string {
  return getImageUrl(`rooms/${roomNumber}/${filename}`);
}

// Helper function to get hero image URL
export function getHeroImageUrl(): string {
  return getImageUrl('hero.jpg');
}