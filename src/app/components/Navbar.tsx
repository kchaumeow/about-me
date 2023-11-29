import CustomLink from "./Link";

export default function Navbar(){
  return (
    <div className="navbar">
      <CustomLink href="/" >
        Home
      </CustomLink>
      <div>Hello, I'm Alyona 👋</div>
      <CustomLink href="/projects">Projects</CustomLink>
    </div>
  )
}