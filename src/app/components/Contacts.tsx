import { contacts } from "../utils/contacts";
import Contact from "./Contact";
import Window from "./Window";

export default function Contacts() {
  return (
    <Window title="Contacts" id="Contacts">
      <div className="contacts">
        {contacts.map((contact) => (
          <Contact key={contact.name} {...contact} />
        ))}
      </div>
    </Window>
  );
}
