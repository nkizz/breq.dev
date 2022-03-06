const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.txt$/,
          type: "asset/source",
        },
      ],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    if (/posts/.test(node.fileAbsolutePath)) {
      createNodeField({
        node,
        name: "type",
        value: "post",
      });

      // Blog posts have URLs of the form
      // https://breq.dev/2021/02/10/dokku

      const slug =
        "/" + path.parse(node.fileAbsolutePath).name.replace(/-/g, "/");

      createNodeField({
        node,
        name: "slug",
        value: slug,
      });
    } else if (/projects/.test(node.fileAbsolutePath)) {
      createNodeField({
        node,
        name: "type",
        value: "project",
      });

      // Projects have URLs of the form
      // https://breq.dev/projects/botbuilder

      const slug = "/projects/" + path.parse(node.fileAbsolutePath).name;

      createNodeField({
        node,
        name: "slug",
        value: slug,
      });
    } else if (/writing/.test(node.fileAbsolutePath)) {
      createNodeField({
        node,
        name: "type",
        value: "writing",
      });

      // Writing has URLs of the form
      // https://breq.dev/writing/liminal

      const slug = "/writing/" + path.parse(node.fileAbsolutePath).name;

      createNodeField({
        node,
        name: "slug",
        value: slug,
      });
    }
  }
};

// exports.createSchemaCustomization = ({ actions }) => {
//     actions.createTypes(`
//         type Mdx implements Node {
//             frontmatter: Frontmatter
//         }

//         type Frontmatter {
//             created: String
//             title: String
//             description: String
//             repo: String
//             demo: String
//             image: File
//             video: File
//         }
//     `)
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  templates = {
    post: path.resolve("./src/templates/post.js"),
    project: path.resolve("./src/templates/project.js"),
    writing: path.resolve("./src/templates/writing.js"),
  };

  const pages = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `);

  pages.data.allMdx.edges.forEach(({ node }) => {
    if (node.fields?.slug) {
      createPage({
        path: node.fields.slug,
        component: templates[node.fields.type],
        context: { id: node.id },
      });
    }
  });

  const tags = await graphql(`
    {
      allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  tags.data.allMdx.group.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}`,
      component: path.resolve("./src/templates/tag.js"),
      context: { tag: tag.fieldValue },
    });
  });
};
