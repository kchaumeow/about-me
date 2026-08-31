import DesktopIcon from "../components/DesktopIcon";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <div className="home">
      <Projects />
      <DesktopIcon href="/" label="Home" icon="home" />
    </div>
  );
}
