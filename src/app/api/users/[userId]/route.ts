import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const session = await getSession();
    if (!session?.user || userId !== session.user.id) {
      return new Response(null, { status: 403 });
    }

    const body = await req.json();
    const payload = z.object({ name: z.string().min(3) }).parse(body);

    const { error } = await db
      .from('users')
      .update({ name: payload.name })
      .eq('id', session.user.id);

    if (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
