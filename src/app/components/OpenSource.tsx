import { contributions } from "../utils/openSource";
import Project from "./Project";
import Window from "./Window";

export default function OpenSource() {
  return (
    <Window title="Open Source" id="OpenSource">
      <p className="project-note">I also commit to open source!</p>
      <div className="project-grid">
        {contributions.map((contribution) => (
          <Project key={contribution.name} {...contribution} />
        ))}
      </div>
    </Window>
  );
}
