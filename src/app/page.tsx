import Contacts from "./components/Contacts";
import DesktopIcon from "./components/DesktopIcon";
import Hobbies from "./components/Hobbies";
import PersonalInfo from "./components/PersonalInfo";

export default function MainPage() {
  return (
    <div className="home scattered">
      <PersonalInfo />
      <Hobbies />
      <div className="bottom-content">
        <Contacts />
        <DesktopIcon href="/projects" label="Projects" icon="folder" />
      </div>
    </div>
  );
}
