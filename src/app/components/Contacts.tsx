import { contacts } from "../utils/contacts";
import Contact from "./Contact";

export default function Contacts() {
  return (
    <div className="card">
      <h3 id="Contacts" className="card-header">
        Contacts
      </h3>
      <div className="contacts">
        {contacts.map((contact) => {
          return (
            <Contact
              key={contact.name}
              name={contact.name}
              value={contact.value}
            />
          );
        })}
      </div>
    </div>
  );
}
