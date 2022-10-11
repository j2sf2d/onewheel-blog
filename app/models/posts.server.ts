import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";

// type Post = {
//   slug: string;
//   title: string;
// };

export async function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export async function getPosts() {
  //   const posts: Post[] = [
  //     { slug: "my-first-post", title: "My First Post!" },
  //     { slug: "my-second-post", title: "My Second Post!" },
  //   ];
  //   return posts;
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}

export { Post };
