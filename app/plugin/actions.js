"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { grantPlugin } from "@/lib/plugin-access";

// Klik "Get plugin": plugin langsung masuk ke akun yang sedang masuk.
export async function getPlugin(pluginId) {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Layanan belum dikonfigurasi. Hubungi admin." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Masuk dulu untuk mengambil plugin.", needLogin: true };

  const res = await grantPlugin(user.id, String(pluginId ?? ""));
  if (res.error) return { error: res.error };

  revalidatePath("/plugin");
  revalidatePath("/akun");
  return { ok: true };
}
