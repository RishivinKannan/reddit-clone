import BackButton from "@/components/BackButton";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subcription.findFirst({
        where: {
          subreddit: {
            name: params.slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await db.subcription.count({
    where: {
      subreddit: {
        name: params.slug,
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl h-full  sm:container">
      <div>
        <BackButton />

        <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* info sidebar */}
          <div className="overflow-hidden order-first rounded-lg border border-gray-200 h-fit md:order-last">
            <div className="px-6 py-4">
              <p className="py-3 font-semibold">About r/{subreddit.name}</p>
            </div>
            <dl className="px-6 py-4 text-sm leading-6 bg-white divide-y divide-gray-100">
              <div className="flex gap-x-4 justify-between py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={subreddit.createdAt.toDateString()}>
                    {format(subreddit.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex gap-x-4 justify-between py-3">
                <dt className="text-gray-500">Memebers</dt>
                <dd className="text-gray-900">{memberCount}</dd>
              </div>

              {subreddit.creatorId === session?.user.id && (
                <div className="flex gap-x-4 justify-between py-3">
                  <p className="text-gray-500">You created this community.</p>
                </div>
              )}

              {subreddit.creatorId !== session?.user.id && (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  subredditId={subreddit.id}
                  subredditName={subreddit.name}
                />
              )}

              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "mb-6 w-full",
                })}
                href={`/r/${params.slug}/submit`}
              >
                Create Post
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
