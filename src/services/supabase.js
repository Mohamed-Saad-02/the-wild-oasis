import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://feibjwlthogyxtyxziwg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJqd2x0aG9neXh0eXh6aXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MDExNzcsImV4cCI6MjAyNzA3NzE3N30.gQhn3gJ58tdk5Wwvfoj18umcIlyC18aXuMjI5-NANEo";
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});

export default supabase;
