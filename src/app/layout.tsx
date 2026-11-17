import type { Metadata } from "next";
import "./globals.css";
import Desktop from "./components/Desktop";
import MenuBar from "./components/MenuBar";
import Stickers from "./components/Stickers";
import { siteUrl } from "./utils/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alyona Knyshova — Full-Stack Software Developer",
    template: "%s — Alyona Knyshova",
  },
  description:
    "Alyona Knyshova (kchaumeow) is a full-stack software developer at EXP Software GmbH in Munich working with React, TypeScript, Java, Quarkus and Node.js. Contacts, personal projects and open source contributions.",
  applicationName: "Alyona Knyshova",
  authors: [{ name: "Alyona Knyshova", url: siteUrl }],
  creator: "Alyona Knyshova",
  publisher: "Alyona Knyshova",
  keywords: [
    "Alyona Knyshova",
    "Alena Knyshova",
    "kchaumeow",
    "full-stack developer",
    "software developer",
    "frontend developer",
    "React developer",
    "Java developer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Java",
    "Quarkus",
    "Munich",
    "portfolio",
    "EXP Software GmbH",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Alyona",
    lastName: "Knyshova",
    username: "kchaumeow",
    url: siteUrl,
    siteName: "Alyona Knyshova",
    title: "Alyona Knyshova — Full-Stack Software Developer",
    description:
      "Full-stack software developer at EXP Software GmbH. React, TypeScript, Java and Node.js. Contacts, personal projects and open source.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alyona Knyshova — Full-Stack Software Developer",
    description:
      "Full-stack software developer at EXP Software GmbH. React, TypeScript, Java and Node.js.",
  },
  verification: {
    google: "aDdwidEaeH4k04XHDxm0rd78q0SZWfUN2-d4RKCPut8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Tells search engines that the person behind the site, the GitHub account and
// the LinkedIn profile are all the same human
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Alyona Knyshova",
  alternateName: ["Alena Knyshova", "kchaumeow"],
  url: siteUrl,
  image: `${siteUrl}/profile-photo.jpg`,
  jobTitle: "Full-Stack Software Developer",
  email: "mailto:atrofimova516@gmail.com",
  worksFor: { "@type": "Organization", name: "EXP Software GmbH" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Munich",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Full-stack development",
    "Frontend development",
    "React",
    "Angular",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Node.js",
    "Express.js",
    "Java",
    "Quarkus",
    "PostgreSQL",
    "WebAssembly",
    "Model Context Protocol",
    "Docker",
    "CI/CD",
  ],
  sameAs: [
    "https://github.com/kchaumeow",
    "https://www.linkedin.com/in/alyona-knyshova-1829b3299/",
    "https://t.me/kchaumeow",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Desktop>
          <Stickers />
          <MenuBar />
          <main>{children}</main>
        </Desktop>
      </body>
    </html>
  );
}
