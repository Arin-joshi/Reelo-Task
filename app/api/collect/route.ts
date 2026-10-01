import { NextResponse } from "next/server";
import { runCollection } from "@/lib/collector/runCollection";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST() {
  try {
    const admin = createAdminClient();
    const rows = await runCollection();

    const { data: existing, error: existingError } = await admin
      .from("listings")
      .select("airbnb_id");

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 },
      );
    }

    const existingIds = new Set(
      (existing ?? []).map((row) => String(row.airbnb_id)),
    );
    const inserted = rows.filter(
      (row) => !existingIds.has(row.airbnb_id),
    ).length;
    const updated = rows.length - inserted;

    const { error: upsertError } = await admin
      .from("listings")
      .upsert(rows, { onConflict: "airbnb_id" });

    if (upsertError) {
      return NextResponse.json(
        { error: upsertError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ inserted, updated });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Collection failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
