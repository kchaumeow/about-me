import type { Metadata } from "next";
import "./globals.css";
import Desktop from "./components/Desktop";
import MenuBar from "./components/MenuBar";
import Stickers from "./components/Stickers";

export const metadata: Metadata = {
  title: "About Alyona",
  description: "This is a personal page of Alyona Knyshova",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Desktop>
          <Stickers />
          <MenuBar />
          <main>{children}</main>
        </Desktop>
      </body>
    </html>
  );
}
