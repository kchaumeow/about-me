import { projects } from "../utils/projects";
import Project from "./Project";
import Window from "./Window";

export default function Projects() {
  return (
    <Window title="Projects" id="Projects">
      <p className="project-note">
        Some of these go back to when I was just starting out. I keep them here
        on purpose — they are my history.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </Window>
  );
}
