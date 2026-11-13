import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izmlcuhjdxkhtjvvpcs.supabase.co';
const supabaseKey = 'sb_publishable_w4v6l-uox7bQMlK_N1svnQ_4Cl6IADX';

export const supabase = createClient(supabaseUrl, supabaseKey);
