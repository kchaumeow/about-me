import type { Metadata } from "next";
import DesktopIcon from "../components/DesktopIcon";
import OpenSource from "../components/OpenSource";
import Projects from "../components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Personal projects and open source contributions by Alyona Knyshova (kchaumeow) — React, TypeScript, Next.js, Node.js, Java and Python.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: "Alyona Knyshova",
    title: "Projects — Alyona Knyshova",
    description:
      "Personal projects and open source contributions by Alyona Knyshova (kchaumeow).",
    locale: "en_US",
  },
};

export default function ProjectsPage() {
  return (
    <div className="home projects-desk">
      <h1 className="sr-only">Projects by Alyona Knyshova</h1>
      <Projects />
      <OpenSource />
      <DesktopIcon href="/" label="Home" icon="home" />
    </div>
  );
}
