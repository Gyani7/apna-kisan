
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getSession();
    if (!session?.user || params.userId !== session?.user.id) {
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
