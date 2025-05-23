// Load environment variables from .env file
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://euaragqhfolvmhgqgeqi.supabase.co";

// In frontend, use VITE_ (Vite), REACT_APP_ (CRA), or NEXT_PUBLIC_ (Next.js) env variable conventions
// Example for Vite:
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// If not using a build tool that exposes env variables, you can hardcode the key for testing:
// const supabaseKey = "your-public-anon-key-here";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
