import { techstack } from "../utils/techstack";
import Skill from "./Skill";

export default function Stack() {
  return (
    <div className="card">
      <h3 id="Stack" className="card-header">
        Stack
      </h3>
      <div className="stack">
        {techstack.map((skill) => {
          return <Skill name={skill.name} src={skill.src} />;
        })}
      </div>
    </div>
  );
}
