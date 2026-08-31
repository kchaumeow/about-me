import { hobbies } from "../utils/hobbies";
import Hobby from "./Hobby";
import Window from "./Window";

export default function Hobbies() {
  return (
    <Window title="Hobbies" id="Hobbies">
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <Hobby key={hobby.name} name={hobby.name} icon={hobby.icon} />
        ))}
      </div>
    </Window>
  );
}
