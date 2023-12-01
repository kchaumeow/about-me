import CustomLink from "./Link";

export default function Breadcrumbs() {
  return (
    <div className="bread-crumbs">
      <CustomLink href="/#Common-info">Common info </CustomLink>/
      <CustomLink href="/#Stack"> Stack </CustomLink>/
      <CustomLink href="/#Contacts"> Contacts</CustomLink>
    </div>
  );
}
