import {
  faDiscord,
  faGithub,
  faGitlab,
  faInstagram,
  faKeybase,
  faLinkedin,
  faMastodon,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faC,
  faEnvelope,
  faLock,
  faMoneyBillTransfer,
  faRadio,
  faServer,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

function ContactItem({
  url,
  icon,
  username,
  label,
  description,
}: {
  url: string;
  icon: IconDefinition;
  username: string;
  label: string;
  description: string;
}) {
  return (
    <a href={url}>
      <div className="flex flex-col items-center rounded-2xl border-2 border-black p-6">
        <FontAwesomeIcon icon={icon} className="mb-2 text-5xl" title={label} />
        <h2 className="font-mono text-xl">{username}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
}

function ContactCategory({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <section>
      <h2 className="mx-auto mb-4 max-w-2xl text-4xl">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,15rem)] justify-center gap-8">
        {children}
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <Page>
      <SEOHelmet title="brooke's accounts" />
      <div className="mx-auto my-8 flex max-w-4xl flex-col gap-8 px-4 text-center font-display text-lg">
        <h1 className="mx-auto max-w-2xl text-6xl">where i am</h1>

        <ContactCategory title="messaging">
          <ContactItem
            url="https://discord.com/users/386352037723635712"
            icon={faDiscord}
            username="breq#8296"
            label="Discord"
            description="voice or video call"
          />
          <ContactItem
            url="mailto:breq@breq.dev"
            icon={faEnvelope}
            username="breq@breq.dev"
            label="Email"
            description="when in doubt"
          />
          <ContactItem
            url="https://keybase.io/breq"
            icon={faKeybase}
            username="@breq"
            label="Keybase"
            description="encrypted channel"
          />
          <ContactItem
            url="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4576848"
            icon={faRadio}
            username="KC1QYG"
            label="Ham Radio"
            description="radio"
          />
          <ContactItem
            url="/keys/pgp.txt"
            icon={faLock}
            username="EF956A1CEF9CEF5E"
            label="PGP keys"
            description="gpg --import"
          />
        </ContactCategory>

        <ContactCategory title="code">
          <ContactItem
            url="https://github.com/breqdev"
            icon={faGithub}
            username="breqdev"
            label="GitHub"
            description="most things"
          />
          <ContactItem
            url="https://gitlab.com/breq"
            icon={faGitlab}
            username="breq"
            label="GitLab"
            description="rover projects"
          />
        </ContactCategory>

        <ContactCategory title="social">
          <ContactItem
            url="https://tacobelllabs.net/@breq"
            icon={faMastodon}
            username="@breq@tacobelllabs.net"
            label="Mastodon"
            description="fediverse"
          />
          <ContactItem
            url="https://twitter.com/breqdev"
            icon={faTwitter}
            username="@breqdev"
            label="Twitter"
            description="until twitter dies"
          />
          <ContactItem
            url="https://instagram.com/breqdev"
            icon={faInstagram}
            username="@breqdev"
            label="Instagram"
            description="view my photos"
          />
          <ContactItem
            url="https://cohost.org/breq"
            icon={faC}
            username="@breq"
            label="Cohost"
            description="cohost"
          />
          <ContactItem
            url="https://reddit.com/u/breqdev"
            icon={faReddit}
            username="u/breqdev"
            label="Reddit"
            description="i don't use this"
          />
          <ContactItem
            url="https://www.linkedin.com/in/breqdev"
            icon={faLinkedin}
            username="in/breqdev"
            label="Linkedin"
            description="jobs ig"
          />
        </ContactCategory>

        <ContactCategory title="other">
          <ContactItem
            url="https://account.venmo.com/u/breqdev"
            icon={faMoneyBillTransfer}
            username="@breqdev"
            label="Venmo"
            description="venmo"
          />
          <ContactItem
            url="/keys/ssh.txt"
            icon={faServer}
            username="breq@breq.dev"
            label="SSH keys"
            description=".ssh/authorized_keys"
          />
        </ContactCategory>
      </div>
    </Page>
  );
}
