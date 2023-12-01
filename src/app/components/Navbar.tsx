import CustomLink from "./Link";

export default function Navbar() {
  return (
    <div className="navbar">
      <CustomLink href="/">
        <h3>Home</h3>
      </CustomLink>
      <h3 className="greeting">Hello, dear visitor 👋</h3>
      <CustomLink href="/projects">
        <h3>Projects</h3>
      </CustomLink>
    </div>
  );
}
