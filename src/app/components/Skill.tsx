import Image from "next/image";

export default function Skill({ name, src }: { name: string; src: string }) {
  return (
    <div className="skill">
      <Image src={src} width={50} height={50} alt={name} />
      <div>{name}</div>
    </div>
  );
}
