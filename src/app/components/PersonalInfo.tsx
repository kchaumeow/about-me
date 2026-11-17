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
            alt="Alyona Knyshova"
            width={576}
            height={576}
          />
        </div>
        <div className="common-content-info">
          <h1>My name is Alyona Knyshova</h1>
          <div className="desc">
            <p>I am a Full-Stack Software Developer based in Munich!</p>
            <p>
              3 years of building React/TypeScript frontends and Java and
              Node.js backends
            </p>
            <p>
              These days I work at EXP Software GmbH on internal tools with
              Java, Quarkus, React and MCP.
            </p>
            <p>Before that: MTS Web Services, Yandex and WebTeamStorm.</p>
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
