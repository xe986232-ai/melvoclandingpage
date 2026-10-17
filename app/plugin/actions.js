"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { installFreePlugin, orderPlugin, redeemPluginToken } from "@/lib/plugin-access";

async function currentUser() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Buy plugin: pembeli sudah menekan Setuju di dialog. Membuat pesanan; tokennya diserahkan admin.
export async function buyPlugin(pluginId) {
  const user = await currentUser();
  if (!user) return { error: "Masuk dulu untuk membeli plugin.", needLogin: true };
  const res = await orderPlugin(user.id, String(pluginId ?? ""));
  if (res.error) return { error: res.error };
  revalidatePath("/plugin", "layout");
  return { ok: true };
}

// Install Plugin (plugin gratis seperti VocalF): aktif di akun ini dan langsung muncul di DAW.
export async function installPlugin(pluginId) {
  const user = await currentUser();
  if (!user) return { error: "Masuk dulu untuk meng-install plugin.", needLogin: true };
  const res = await installFreePlugin(user.id, String(pluginId ?? ""));
  if (res.error) return { error: res.error };
  revalidatePath("/plugin", "layout");
  revalidatePath("/akun");
  return { ok: true };
}

// Tebus Plugin: memasukkan token plugin yang diberikan admin.
export async function redeemPlugin(token) {
  const user = await currentUser();
  if (!user) return { error: "Masuk dulu untuk menebus token.", needLogin: true };
  const res = await redeemPluginToken(user.id, token);
  if (res.error) {
    await new Promise((r) => setTimeout(r, 600)); // memperlambat tebak-tebakan token
    return { error: res.error };
  }
  revalidatePath("/plugin", "layout");
  revalidatePath("/akun");
  return { ok: true, plugin: res.plugin };
}
