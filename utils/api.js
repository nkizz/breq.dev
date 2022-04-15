import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import imageSize from "image-size";
import { join, parse } from "path";

import remarkMath from "remark-math";
import remarkAbcjs from "remark-abcjs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeImgSize from "rehype-img-size";

export async function listContentFiles(path) {
  return (await fs.readdir(path, { withFileTypes: true }))
    .filter((file) => file.isFile())
    .filter((file) => file.name.endsWith(".md") || file.name.endsWith(".mdx"))
    .map((file) => file.name)
    .map((file) => join(path, file));
}

export async function loadImage(src) {
  if (!src) {
    return {};
  }

  const { width, height } = await new Promise((resolve, reject) => {
    imageSize(join("public", src), (err, dimensions) => {
      if (err) reject(err);
      resolve(dimensions);
    });
  });

  return {
    src,
    width,
    height,
  };
}

export async function loadMarkdown(path, { loadBody = false }) {
  const filedata = await fs.readFile(path, "utf8");
  const { data: frontmatter, content: body } = matter(filedata);

  const mdx = loadBody
    ? await serialize(body, {
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkAbcjs, remarkUnwrapImages],
          rehypePlugins: [
            rehypeKatex,
            [rehypeImgSize, { dir: "public" }],
            rehypeSlug,
          ],
        },
      })
    : null;

  return {
    ...frontmatter,
    filename: path,
    slug: parse(path).name,
    body: mdx,
    image: await loadImage(frontmatter.image),
    date: frontmatter.date
      ? new Date(frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
  };
}
