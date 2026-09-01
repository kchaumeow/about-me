import DesktopIcon from "../components/DesktopIcon";
import OpenSource from "../components/OpenSource";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <div className="home projects-desk">
      <Projects />
      <OpenSource />
      <DesktopIcon href="/" label="Home" icon="home" />
    </div>
  );
}
