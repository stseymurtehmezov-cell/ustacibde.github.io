import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://bpqxidtrunforkvulapt.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcXhpZHRydW5mb3JrdnVsYXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTg4MTIsImV4cCI6MjA5Nzg5NDgxMn0.wdL42jeXP2Hm4yN2BOpbeMwh3huRbeazJ6-I6fDhLDU";

export const supabase = createClient(supabaseUrl, supabaseKey);
