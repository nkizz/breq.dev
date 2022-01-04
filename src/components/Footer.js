import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faKeybase,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const contactLinks = [
    [faEnvelope, "breq@breq.dev", "mailto:breq@breq.dev"],
    [faTwitter, "breqdev", "https://twitter.com/breqdev"],
    [faKeybase, "breq", "https://keybase.io/breq"],
  ];

  const linkStyles =
    "hover:underline outline-none focus:underline focus:bg-panyellow";

  const dateQuery = useStaticQuery(graphql`
    query {
      site {
        buildTime(formatString: "YYYY")
      }
    }
  `);

  return (
    <footer className="bg-panblue text-lg font-display z-10">
      <div className="max-w-7xl mx-auto px-4 py-16 md:pb-32 flex flex-col gap-8">
        <p>
          made with <FontAwesomeIcon icon={faHeart} />
          <span className="sr-only">love</span> by breq,{" "}
          <FontAwesomeIcon icon={faCopyright} />
          <span className="sr-only">copyright</span>&nbsp;
          {dateQuery.site.buildTime}, <FontAwesomeIcon icon={faGithub} />
          &nbsp;
          <span className="sr-only">github</span>
          <a
            href="https://github.com/Breq16/breq.dev"
            className={linkStyles}
            target="_blank"
            rel="noreferrer"
          >
            Breq16/breq.dev
          </a>
        </p>
        <p>
          {contactLinks.map(([icon, text, href]) => (
            <React.Fragment key={text}>
              <FontAwesomeIcon icon={icon} />
              &nbsp;
              {href ? (
                <a
                  href={href}
                  className={linkStyles}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text}
                </a>
              ) : (
                text
              )}
              {" • "}
            </React.Fragment>
          ))}
          <Link to="/contact" className={linkStyles}>
            more <span className="sr-only">ways to contact me </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </p>
      </div>
    </footer>
  );
}
