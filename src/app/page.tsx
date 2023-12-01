import Contacts from "./components/Contacts";
import GoToProjects from "./components/GoToProjects";
import PersonalInfo from "./components/PersonalInfo";
import Stack from "./components/Stack";

export default function MainPage() {
  return (
    <div className="home">
      <PersonalInfo />
      <Stack />
      <div className="bottom-content">
        <Contacts />
        <GoToProjects />
      </div>
    </div>
  );
}
