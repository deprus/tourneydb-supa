import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    const tournaments = await supabase.from('Tournaments').select('*');
    return new Response(JSON.stringify(tournaments));
  } catch (error) {
    return new Response('Could not fetch matches', { status: 500 });
  }
}
