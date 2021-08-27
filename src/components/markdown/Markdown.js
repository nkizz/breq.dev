import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { Link } from "gatsby"

import YouTube from "../YouTube"
import Desmos from "../Desmos"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"


function Caption(props) {
    return (
        <p className="text-center font-body">
            {props.children}
        </p>
    )
}


function Paragraph(props) {
    // Detect if we're wrapping a Gatsby image
    if (props.children?.props?.className?.startsWith?.("gatsby-resp-image")) {
        return (
            <p className="my-4">
                {props.children}
            </p>
        )
    }

    return (
        <p className="my-4 text-lg font-body max-w-4xl mx-auto">
            {props.children}
        </p>
    )
}


function List(props) {
    return (
        <ul className="list-disc max-w-3xl mx-auto">
            {props.children}
        </ul>
    )
}

function A(props) {
    const ExtLinkRegex = new RegExp("^(?:[a-z]+:)?//", "i")

    if (ExtLinkRegex.test(props.href)) {
        return (
            <a href={props.href} className="text-panblue-dark hover:underline outline-none focus:bg-panyellow" target="_blank" rel="noopener noreferrer">
                {props.children}
            </a>
        )
    } else {
        return (
            <Link to={props.href} className="text-panblue-dark hover:underline outline-none focus:bg-panyellow">
                {props.children}
            </Link>
        )
    }
}


function HoverLink(props) {
    return (
        <span className="relative">
            <span className="absolute left-0 top-0 bottom-0 -ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href={`#${props.id}`} className="text-xl outline-none">
                    <FontAwesomeIcon icon={faLink} />
                    <span className="sr-only">Link to this section </span>
                </a>
            </span>
            <span>{props.children}</span>
        </span>
    )
}


function Heading(props) {
    return (
        <h2 className="max-w-4xl mx-auto text-4xl font-display text-center mt-8 mb-4 group focus-within:text-panblue-dark" id={props.id}>
            <HoverLink id={props.id}>{props.children}</HoverLink>
        </h2>
    )
}


function SubHeading(props) {
    return (
        <h3 className="text-3xl font-display text-center mt-8 mb-4 italic group focus-within:text-panblue-dark" id={props.id}>
            <HoverLink id={props.id}>{props.children}</HoverLink>
        </h3>
    )
}


function SubSubHeading(props) {
    return (
        <h4 className="text-2xl font-display text-center mt-8 -mb-2 underline group focus-within:text-panblue-dark" id={props.id}>
            <HoverLink id={props.id}>{props.children}</HoverLink>
        </h4>
    )
}


function Table(props) {
    return (
        <table className="mx-auto border-black border-2 rounded-xl border-separate border-spacing-0 overflow-hidden">
            {props.children}
        </table>
    )
}

function Th(props) {
    return (
        <th className="border-black border p-2">
            {props.children}
        </th>
    )
}


function Td(props) {
    return (
        <td className="border-gray-500 border p-2">
            {props.children}
        </td>
    )
}


function BlockQuote(props) {
    return (
        <blockquote className="italic max-w-3xl mx-auto">
            {props.children}
        </blockquote>
    )
}


function Kbd(props) {
    return (
        <kbd className="bg-gray-200 border-black border-2 rounded p-1">
            {props.children}
        </kbd>
    )
}


const shortcodes = {
    p: Paragraph,
    ul: List,
    a: A,
    h1: Heading,
    h2: SubHeading,
    h3: SubSubHeading,
    table: Table,
    th: Th,
    td: Td,
    blockquote: BlockQuote,
    kbd: Kbd,


    YouTube,
    Desmos,
    Caption,
}



export default function Markdown(props) {
    return (
        <MDXProvider components={shortcodes}>
            <div className="font-body">
                <MDXRenderer>
                    {props.children}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}
