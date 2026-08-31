"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktop } from "./Desktop";

export default function Window({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  const windowId = id ?? title;
  const {
    register,
    unregister,
    focus,
    close,
    activeId,
    closedIds,
    zIndexOf,
    resetToken,
  } = useDesktop();

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [collapsed, setCollapsed] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [dragging, setDragging] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const grab = useRef<{ pointerX: number; pointerY: number } | null>(null);
  const at = useRef({ x: 0, y: 0 });

  useEffect(() => {
    register({ id: windowId, title });
    return () => unregister(windowId);
  }, [windowId, title, register, unregister]);

  // "Clean Up Desktop" bumps resetToken; adjust state during render rather
  // than in an effect so the window never paints in its stale position
  const [seenReset, setSeenReset] = useState(resetToken);
  if (seenReset !== resetToken) {
    setSeenReset(resetToken);
    setOffset({ x: 0, y: 0 });
    setCollapsed(false);
    setZoomed(false);
  }

  // pointer capture keeps the drag on the title bar itself, so a window that
  // unmounts mid-drag can't leave listeners behind on window
  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".title-box")) return;
    focus(windowId);
    event.currentTarget.setPointerCapture(event.pointerId);
    grab.current = { pointerX: event.clientX, pointerY: event.clientY };
    at.current = { ...offset };
    setDragging(true);
  };

  // Pointer events outpace the display, so a setState per move would render
  // frames nobody sees. Write the transform straight to the node instead —
  // the browser still only paints once per frame. State catches up on release.
  const onDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const from = grab.current;
    if (!from) return;
    at.current = {
      x: offset.x + (event.clientX - from.pointerX),
      y: offset.y + (event.clientY - from.pointerY),
    };
    const node = frameRef.current;
    if (node) {
      node.style.transform = `translate3d(${at.current.x}px, ${at.current.y}px, 0)`;
    }
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!grab.current) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    grab.current = null;
    setOffset(at.current);
    setDragging(false);
  };

  if (closedIds.includes(windowId)) return null;

  const classes = ["window"];
  if (activeId === windowId) classes.push("is-active");
  if (collapsed) classes.push("is-collapsed");
  if (zoomed) classes.push("is-zoomed");
  if (dragging) classes.push("is-dragging");

  return (
    <div
      ref={frameRef}
      className={classes.join(" ")}
      style={{
        // no transform until actually moved, so undragged windows don't each
        // get their own compositing layer
        transform:
          offset.x || offset.y
            ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
            : undefined,
        zIndex: zIndexOf(windowId),
      }}
      onPointerDown={() => focus(windowId)}
    >
      <div
        className="title-bar"
        onPointerDown={startDrag}
        onPointerMove={onDragMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => setCollapsed((wasCollapsed) => !wasCollapsed)}
      >
        <button
          type="button"
          className="title-box title-box-close"
          aria-label={`Close ${title}`}
          onClick={() => close(windowId)}
        />
        <h3 id={id} className="title-bar-text">
          {title}
        </h3>
        <div className="title-bar-buttons">
          <button
            type="button"
            className="title-box title-box-collapse"
            aria-label={`Collapse ${title}`}
            onClick={() => setCollapsed((wasCollapsed) => !wasCollapsed)}
          />
          <button
            type="button"
            className="title-box title-box-zoom"
            aria-label={`Zoom ${title}`}
            onClick={() => setZoomed((wasZoomed) => !wasZoomed)}
          />
        </div>
      </div>
      <div className="window-shade">
        <div className="window-shade-inner">
          <div className="window-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
