import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddits";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subcription.findFirst({
      where: {
        subredditId,
        userId: session?.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response(" You are not member of this subreddit", {
        status: 400,
      });
    }

    // check if user is the creator of this subreddit

    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id,
      },
    });

    if (subreddit) {
      return new Response(" You can't unsubscribe from your own subreddit", {
        status: 400,
      });
    }
    await db.subcription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not unsubscribe, please try again ", {
      status: 500,
    });
  }
}
