import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/db";

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) {
    return [];
  }
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post: { slug: string }) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Error fetching blog posts for static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!process.env.DATABASE_URL) {
    notFound();
  }

  let post;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug, published: true },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      {post.image && (
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          {formatDate(post.publishedAt?.toString() || post.createdAt.toString())}
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

