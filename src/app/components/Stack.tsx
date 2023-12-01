import { techstack } from "../utils/techstack";
import Skill from "./Skill";

export default function Stack() {
  return (
    <div className="card">
      <h3 id="Skills" className="card-header">
        Skills
      </h3>
      <div className="stack">
        {techstack.map((skill) => {
          return <Skill name={skill.name} src={skill.src} />;
        })}
      </div>
    </div>
  );
}
