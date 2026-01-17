import { createServerClient } from "@supabase/ssr";

export function createClient() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
        {
            cookies: {
                getAll() {
                    return [];
                },
                setAll() {
                    // no-op: in questo progetto non si gestiscono cookies/sessioni
                },
            },
        }
    );
}
