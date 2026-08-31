import Image from "next/image";
import CustomLink from "./Link";
import Window from "./Window";

export default function PersonalInfo() {
  return (
    <Window title="Common info" id="Common-info">
      <div className="common-content">
        <div className="profile-frame">
          <Image
            priority={true}
            className="profile-image"
            src="/profile-photo.jpg"
            alt="My photo"
            width={576}
            height={576}
          />
        </div>
        <div className="common-content-info">
          <h2>My name is Alyona Knyshova</h2>
          <div className="desc">
            <p>I am Frontend developer!</p>
            <p>Also can do backend on Node.js</p>
            <p>These days I work at EXP Software GmbH.</p>
            <p>Currently finding my way around Java, CI/CD and Docker.</p>
            <p>
              On this webpage you can find my contacts, hobbies and personal
              projects
            </p>
            <hr />
            <CustomLink href="#Contacts">
              If you want to connect with me, go to <code>Contacts</code>
            </CustomLink>
          </div>
        </div>
      </div>
    </Window>
  );
}
