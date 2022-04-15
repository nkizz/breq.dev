import React from "react";
import Link from "next/link";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { listContentFiles, loadMarkdown } from "../utils/api";

function Card({ title, date, description, slug }) {
  return (
    <Link href={"/writing/" + slug}>
      <a className="block rounded-2xl border-4 border-black bg-white p-4 text-black outline-none focus:border-panpink dark:bg-gray-800 dark:text-white">
        <section className="font-display">
          <h2 className="text-3xl">{title}</h2>
          <p className="italic">{date}</p>
          <hr className="my-2 border-black" />
          <p>{description}</p>
        </section>
      </a>
    </Link>
  );
}

export async function getStaticProps() {
  const posts = await listContentFiles("writing");

  const data = await Promise.all(posts.map(loadMarkdown));

  return {
    props: {
      data,
    },
  };
}

export default function Writing({ data }) {
  const writing = data.map((data) => <Card key={data.filename} {...data} />);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="words i've written, with <3." />
      <div className="mx-auto max-w-7xl text-center font-display">
        <h1 className="my-8 text-6xl">writing</h1>
        <div className="place-stretch m-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {writing}
        </div>
      </div>
    </Page>
  );
}
