"use client";

import { useEffect, useState } from "react";
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
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(
    null
  );

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
    setDragOrigin({ x: event.clientX - offset.x, y: event.clientY - offset.y });
  };

  const onDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOrigin) return;
    setOffset({
      x: event.clientX - dragOrigin.x,
      y: event.clientY - dragOrigin.y,
    });
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOrigin) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragOrigin(null);
  };

  if (closedIds.includes(windowId)) return null;

  const classes = ["window"];
  if (activeId === windowId) classes.push("is-active");
  if (collapsed) classes.push("is-collapsed");
  if (zoomed) classes.push("is-zoomed");
  if (dragOrigin) classes.push("is-dragging");

  return (
    <div
      className={classes.join(" ")}
      style={{
        // no transform until actually moved, so undragged windows don't each
        // get their own compositing layer
        transform:
          offset.x || offset.y
            ? `translate(${offset.x}px, ${offset.y}px)`
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
