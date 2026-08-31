"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CustomLink from "./Link";
import { useDesktop } from "./Desktop";

function PantherMark() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M2.6 6.2 2 1.6l4 2.3a7.6 7.6 0 0 1 4 0l4-2.3-.6 4.6a6.4 6.4 0 0 1 1.2 3.4c0 3.4-2.9 5.6-6.6 5.6S1.4 13 1.4 9.6a6.4 6.4 0 0 1 1.2-3.4Z"
        fill="#15151b"
      />
      <ellipse cx="5.6" cy="9" rx="1.3" ry="1.6" fill="#c8e04a" />
      <ellipse cx="10.4" cy="9" rx="1.3" ry="1.6" fill="#c8e04a" />
      <path
        d="M5.6 7.8v2.4M10.4 7.8v2.4"
        stroke="#14140f"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function MenuBar() {
  const [open, setOpen] = useState(false);
  const time = useClock();
  const { windows, closedIds, open: openWindow, cleanUp } = useDesktop();
  const pathname = usePathname();
  // one entry for the page you are not on, so nothing is listed twice
  const otherPage =
    pathname === "/projects"
      ? { href: "/", label: "Home" }
      : { href: "/projects", label: "Projects" };

  return (
    <>
      {open && (
        <>
          <div className="menu-backdrop" onClick={() => setOpen(false)} />
          <div className="menu-dropdown">
            {windows.map((each) => (
              <div
                key={each.id}
                className="menu-item"
                onClick={() => {
                  openWindow(each.id);
                  setOpen(false);
                }}
              >
                <span className="menu-check">
                  {closedIds.includes(each.id) ? "" : "\u2713"}
                </span>
                {each.title}
              </div>
            ))}
            {windows.length > 0 && <div className="menu-separator" />}
            <CustomLink href={otherPage.href}>
              <div className="menu-item" onClick={() => setOpen(false)}>
                <span className="menu-check" />
                {otherPage.label}
              </div>
            </CustomLink>
            <div className="menu-separator" />
            <div
              className="menu-item"
              onClick={() => {
                cleanUp();
                setOpen(false);
              }}
            >
              <span className="menu-check" />
              Clean Up Desktop
            </div>
            <div className="menu-separator" />
            <div className="menu-item">
              <span className="menu-check" />
              Hello, dear visitor
            </div>
          </div>
        </>
      )}
      <div className="menu-bar">
        <button
          className="menu-title"
          aria-label="Main menu"
          aria-expanded={open}
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <PantherMark />
        </button>
        <CustomLink href="/" className="menu-title">
          <span>Home</span>
        </CustomLink>
        <CustomLink href="/projects" className="menu-title">
          <span>Projects</span>
        </CustomLink>
        <div className="menu-spacer" />
        {/* filled in after mount: the time is client-only data */}
        <div className="menu-clock" suppressHydrationWarning>
          {time}
        </div>
      </div>
    </>
  );
}
