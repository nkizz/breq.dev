import React from "react";
import Page from "../../components/Page";
import SEOHelmet from "../../components/SEOHelmet";
import { getPostsByTag, getTags } from "../../utils/tags";
import Link from "next/link";

export async function getStaticPaths() {
  const tags = await getTags();

  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { tag } = params;

  const posts = await getPostsByTag(tag);

  return {
    props: {
      tag,
      posts,
    },
  };
}

const href = (data) => {
  if (data.source == "posts") {
    return `/${data.slug.replaceAll("-", "/")}`;
  } else {
    return `/projects/${data.slug}`;
  }
};

export default function Tag({ tag, posts }) {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title={`${tag} - the archives of breq`} />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">{tag} - entries</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((data) => (
            <Link key={data.filename} href={href(data)}>
              <a className="flex flex-col gap-2 rounded-3xl border-2 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white">
                <h2 className="text-2xl">{data.title}</h2>
                <p>{data.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}
