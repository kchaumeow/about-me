import Link from "next/link";

export default function GoToProjects() {
  return (
    <Link href="projects">
      <div className="card go-to">
        <h3>Go to Projects 👉</h3>
      </div>
    </Link>
  );
}
