import RSS from "rss";
import fs from "fs/promises";
import { PostInfo, getDateObject, getURL, slugComparator } from "./posts";
import { listContentFiles, loadMarkdown } from "./api";
import { getSortedProjects } from "./projects";

export default async function generateRssFeed() {
  const posts = await listContentFiles("posts");

  const postdata = await Promise.all(
    posts.map((post) => loadMarkdown<PostInfo>(post))
  );

  const datedPosts = postdata.map((post) => ({
    ...post,
    date: getDateObject(post.slug),
  }));

  const projects = await getSortedProjects();

  const datedProjects = projects.map((project) => ({
    ...project,
    date: new Date(project.writeup),
  }));

  const sorted = [...datedPosts, ...datedProjects].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const feedOptions = {
    title: "breq.dev - Brooke Chalmers",
    description: "Posts about tinkering with anything and everything!",
    site_url: "https://breq.dev",
    feed_url: "https://breq.dev/rss.xml",
    image_url: "https://breq.dev/opengraph.jpg",
    pubDate: new Date(),
    copyright: `All rights reserved, Brooke Chalmers ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  sorted.slice(0, 20).forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: isFinite(parseFloat(post.slug.split("-")[0]))
        ? getURL(post.slug)
        : "/projects/" + post.slug,
      categories: post.tags,
      date: post.date,
    });
  });

  await fs.writeFile("./public/rss.xml", feed.xml({ indent: true }));
}
