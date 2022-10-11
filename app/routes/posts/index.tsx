import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import { getPosts,  } from "~/models/posts.server";
import { getPostListings } from "~/models/posts.server";
import { useOptionalAdminUser } from "~/utils";

// type Post = {
//   slug: string;
//   title: string;
// };

// type LoaderData = {
//   //   posts: Post[];
//   posts: Awaited<ReturnType<typeof getPosts>>;
// };

type LoaderData = {
  //   posts: Post[];
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  // throw new Error("blah!");
  //   const posts: Post[] = [
  //     { slug: "my-first-post", title: "My First Post!" },
  //     { slug: "my-second-post", title: "My Second Post!" },
  //   ];
  //   const postString = JSON.stringify({ posts });
  //   return new Response(postString, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  return json<LoaderData>({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;
  const adminUser = useOptionalAdminUser();

  // const isAdmin = user?.email === ENV.ADMIN_EMAIL;

  return (
    <main>
      <h1>Posts</h1>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
