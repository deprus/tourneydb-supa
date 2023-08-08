import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createServerComponentClient({ cookies });

export async function GET() {
  try {
    const tournaments = await supabase.from('Tournaments').select('*');
    console.log('getting');
    return new Response(JSON.stringify(tournaments));
  } catch (error) {
    return new Response('Could not fetch matches', { status: 500 });
  }
}
