import Breadcrumbs from "./components/Breadcrumbs";
import PersonalInfo from "./components/PersonalInfo";
import Stack from "./components/Stack";

export default function MainPage() {
  return (
    <div className="home">
      <Breadcrumbs />
      <PersonalInfo />
      <Stack />
    </div>
  );
}
