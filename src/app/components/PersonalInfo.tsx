import Image from "next/image";
import CustomLink from "./Link";

export default function PersonalInfo() {
  return (
    <div className="card">
      <h3 id="Common-info" className="card-header">
        Common info
      </h3>
      <div className="common-content">
        <div className="profile-image">
          <Image
            priority={true}
            className="profile-image"
            src="/profile-photo.png"
            alt="My photo"
            width={200}
            height={200}
          />
        </div>
        <div className="common-content-info">
          <h2>My name is Alyona Trofimova</h2>
          <div className="desc">
            <p>I am Frontend developer!</p>
            <p>Also can do backend on Node.js</p>
            <p>
              On this webpage you can find my contacts, tech-stack and personal
              projects
            </p>
            <hr />
            <p>My hobbies: ukulele, drawing and computer games</p>
            <CustomLink href="#Contacts">
              <p>
                If you want to connect with me, go to <code>Contacts</code>
              </p>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}
