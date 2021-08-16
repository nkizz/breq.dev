import { graphql } from "gatsby"
import React from "react"

import Page from "../components/Page"
import ProjectCard from "../components/ProjectCard"



export default function Projects({ data }) {

    const projects = data.allMdx.edges.map(({ node }) => <ProjectCard key={node.id} {...node} />)

    return (
        <Page className="bg-black text-white">
            <div className="text-center max-w-7xl mx-auto font-display">
                <h1 className="my-8 text-6xl">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-stretch m-8">
                    {projects}
                </div>
            </div>
        </Page>
    )
}

export const query = graphql`
    query {
        allMdx(filter: { fileAbsolutePath: { regex: "\\/projects/" } }) {
            edges {
                node {
                    id
                    slug
                    frontmatter {
                        title
                        subtitle
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 1000
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                }
            }
        }
    }
`
