"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDesktop } from "./Desktop";

const icons = {
  folder: (
    <>
      <path
        d="M2 6c0-1.7 1.3-3 3-3h11.6c1 0 1.9.5 2.5 1.3L21.2 7H39c1.7 0 3 1.3 3 3v19c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3Z"
        fill="#8fa8c4"
        stroke="#41607f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M2 12h40v17c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3Z"
        fill="#c2d5e6"
        stroke="#41607f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </>
  ),
  home: (
    <>
      <path
        d="M22 3 3 18h6v13c0 .6.4 1 1 1h24c.6 0 1-.4 1-1V18h6Z"
        fill="#c2d5e6"
        stroke="#41607f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 3 3 18h38Z"
        fill="#8fa8c4"
        stroke="#41607f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M18 32V23h8v9"
        fill="#8fa8c4"
        stroke="#41607f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </>
  ),
};

const DRAG_SLOP = 4;

export default function DesktopIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: keyof typeof icons;
}) {
  const router = useRouter();
  const { resetToken } = useDesktop();
  const iconRef = useRef<HTMLAnchorElement>(null);
  const [selected, setSelected] = useState(false);

  // clicking anywhere else on the desktop deselects, as in the Finder
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!iconRef.current?.contains(event.target as Node)) setSelected(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{
    pointerX: number;
    pointerY: number;
    fromX: number;
    fromY: number;
  } | null>(null);
  // a ref, not state: the click handler must read this synchronously
  const movedRef = useRef(false);

  // Clean Up Desktop sends icons home too
  const [seenReset, setSeenReset] = useState(resetToken);
  if (seenReset !== resetToken) {
    setSeenReset(resetToken);
    setOffset({ x: 0, y: 0 });
  }

  const startDrag = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(true);
    setDrag({
      pointerX: event.clientX,
      pointerY: event.clientY,
      fromX: offset.x,
      fromY: offset.y,
    });
    movedRef.current = false;
  };

  const onDragMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!drag) return;
    const dx = event.clientX - drag.pointerX;
    const dy = event.clientY - drag.pointerY;
    if (Math.hypot(dx, dy) > DRAG_SLOP) movedRef.current = true;
    setOffset({ x: drag.fromX + dx, y: drag.fromY + dy });
  };

  const endDrag = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!drag) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDrag(null);
  };

  return (
    <Link
      ref={iconRef}
      className={selected ? "desktop-icon is-selected" : "desktop-icon"}
      href={href}
      draggable={false}
      style={{
        transform:
          offset.x || offset.y
            ? `translate(${offset.x}px, ${offset.y}px)`
            : undefined,
      }}
      onPointerDown={startDrag}
      onPointerMove={onDragMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      // one click selects; opening takes two. Keyboard activation reports
      // detail 0 and still follows the link.
      onClick={(event) => {
        if (event.detail === 0) return;
        event.preventDefault();
      }}
      onDoubleClick={() => {
        if (movedRef.current) return;
        router.push(href);
      }}
    >
      <svg viewBox="0 0 44 34" width="44" height="34" aria-hidden="true">
        {icons[icon]}
      </svg>
      <span>{label}</span>
    </Link>
  );
}
