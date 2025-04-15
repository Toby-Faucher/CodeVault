import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, code, language, forked_from } = body;

  // Get access token from Authorization header
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '');
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    }
  );
  // Optionally associate with user if logged in (not required for public fork)
  let userId = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id || null;
  } catch {}

  // Require login
  if (!userId) {
    return NextResponse.json({ error: "You must be logged in to fork a snippet." }, { status: 401 });
  }

  const { data, error } = await supabase.from("snippets").insert([
    {
      title,
      code,
      language,
      is_public: false, // Forked snippets are private by default
      user_id: userId, // Always set user_id
      forked_from,
    },
  ]).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ id: data.id });
}
