import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lpyuvuvsjryzjjtivkdm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweXV2dXZzanJ5empqdGl2a2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDIzOTUsImV4cCI6MjAwNjQ3ODM5NX0.3-U5mzFqTJyYoZoElpF9K1xq2_BLUGFiNKqxqgI94FM'
);

export async function GET() {
  try {
    const tournaments = await supabase.from('Tournaments').select('*');
    console.log('getting');
    return new Response(JSON.stringify(tournaments));
  } catch (error) {
    return new Response('Could not fetch matches', { status: 500 });
  }
}
