import CustomLink from "./Link";

export default function Navbar() {
  return (
    <div className="navbar">
      <CustomLink href="/">
        <h2>Home</h2>
      </CustomLink>
      <h2>Hello, I'm Alyona 👋</h2>
      <CustomLink href="/projects">
        <h2>Projects</h2>
      </CustomLink>
    </div>
  );
}
