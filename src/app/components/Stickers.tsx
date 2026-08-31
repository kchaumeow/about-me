"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const stickers = [
  {
    id: "cat",
    src: "/cat.png",
    label: "Cat sticker",
    width: 340,
    height: 377,
    phrase: "Mreawu!",
    side: "right" as const,
    priority: false,
  },
  {
    id: "spiderman",
    src: "/spiderman.png",
    label: "Spider-Man sticker",
    width: 420,
    height: 418,
    phrase: "With great power comes great responsibility.",
    side: "right" as const,
    priority: false,
  },
  {
    id: "swordsman",
    src: "/swordsman.png",
    label: "Witcher sticker",
    width: 340,
    height: 295,
    phrase:
      "If I'm to choose between one evil and another, I'd rather not choose at all.",
    side: "right" as const,
    priority: false,
  },
  {
    id: "panther",
    src: "/panther.png",
    label: "Panther sticker",
    width: 700,
    height: 1119,
    phrase: "Заняться нечем?",
    side: "left" as const,
    // biggest sticker, and Next flags it as the LCP element
    priority: true,
  },
];

type Speech = {
  id: string;
  phrase: string;
  side: "left" | "right";
  top: number;
  left?: number;
  right?: number;
};

const GAP = 10;

export default function Stickers() {
  const [speech, setSpeech] = useState<Speech | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setSpeech(null), []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    window.addEventListener("pointerdown", onPointerDown);
    // the bubble is placed from a measured rect, so a resize would strand it
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", close);
    };
  }, [close]);

  return (
    <div ref={rootRef}>
      {stickers.map((sticker) => (
        <button
          key={sticker.id}
          type="button"
          aria-label={sticker.label}
          className={`sticker sticker-${sticker.id}`}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setSpeech((current) =>
              current?.id === sticker.id
                ? null
                : {
                    id: sticker.id,
                    phrase: sticker.phrase,
                    side: sticker.side,
                    top: rect.top + rect.height * 0.08,
                    ...(sticker.side === "right"
                      ? { left: rect.right + GAP }
                      : { right: window.innerWidth - rect.left + GAP }),
                  }
            );
          }}
        >
          <Image
            src={sticker.src}
            alt=""
            width={sticker.width}
            height={sticker.height}
            className="sticker-art"
            priority={sticker.priority}
          />
        </button>
      ))}

      {/* Bubbles live outside the stickers: a fixed element always creates a
          stacking context, so a bubble nested inside one could never rise
          above the windows. */}
      {speech && (
        <div className="sticker-bubble-layer">
          <span
            className={`sticker-bubble sticker-bubble-${speech.side}`}
            style={{ top: speech.top, left: speech.left, right: speech.right }}
          >
            {speech.phrase}
          </span>
        </div>
      )}
    </div>
  );
}
