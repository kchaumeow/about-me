import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt =
  "Alyona Knyshova — Frontend Developer. React, TypeScript, Next.js, Node.js.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = readFileSync(join(process.cwd(), "public/profile-photo.jpg"));

// The desktop palette from globals.css — the preview should look like the site
const FACE = "#dedede";
const WHITE = "#ffffff";
const SHADOW = "#808080";
const SHADOW_DEEP = "#5a5a5a";
const INK = "#000000";
const DESKTOP = "#9292b4";
const DESKTOP_ALT = "#9595b6";

function TitleBox({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        background: FACE,
        border: `2px solid ${SHADOW_DEEP}`,
        boxShadow: `inset 2px 2px 0 ${WHITE}, inset -2px -2px 0 ${SHADOW}`,
      }}
    >
      {children}
    </div>
  );
}

// drawn rather than typed: a glyph would send satori off to fetch a font
function CloseCross() {
  return (
    <div style={{ display: "flex", position: "relative", width: 14, height: 14 }}>
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 0,
          width: 14,
          height: 2,
          background: SHADOW_DEEP,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 0,
          width: 14,
          height: 2,
          background: SHADOW_DEEP,
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Verdana, sans-serif",
          color: INK,
          backgroundColor: DESKTOP,
          backgroundImage: `repeating-linear-gradient(45deg, ${DESKTOP} 0 20px, ${DESKTOP_ALT} 20px 40px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1060,
            background: FACE,
            border: `2px solid ${INK}`,
            boxShadow: `inset 2px 2px 0 ${WHITE}, inset -2px -2px 0 ${SHADOW}, 10px 10px 0 rgba(40, 40, 70, 0.35)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 46,
              padding: "0 10px",
              borderBottom: `2px solid ${INK}`,
              backgroundImage: `repeating-linear-gradient(180deg, ${WHITE} 0 2px, ${FACE} 2px 4px)`,
            }}
          >
            <TitleBox>
              <CloseCross />
            </TitleBox>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                margin: "0 12px",
                padding: "0 14px",
                background: FACE,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Common info
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <TitleBox />
              <TitleBox />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
              padding: "48px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 8,
                background: WHITE,
                border: `2px solid ${SHADOW}`,
                boxShadow: `inset 2px 2px 0 ${SHADOW_DEEP}`,
              }}
            >
              <img
                src={`data:image/jpeg;base64,${photo.toString("base64")}`}
                alt=""
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 18,
              }}
            >
              <div style={{ display: "flex", fontSize: 58, fontWeight: 700 }}>
                Alyona Knyshova
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  color: "#2f2f3f",
                }}
              >
                Frontend Developer
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "20px 22px",
                  background: WHITE,
                  border: `2px solid ${SHADOW}`,
                  boxShadow: `inset 2px 2px 0 ${FACE}`,
                  fontSize: 25,
                }}
              >
                <div style={{ display: "flex" }}>
                  React · TypeScript · Next.js · Node.js
                </div>
                <div style={{ display: "flex", color: SHADOW_DEEP }}>
                  github.com/kchaumeow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
