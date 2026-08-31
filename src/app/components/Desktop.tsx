"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type WindowMeta = { id: string; title: string };

type DesktopValue = {
  windows: WindowMeta[];
  activeId: string | null;
  closedIds: string[];
  resetToken: number;
  register: (win: WindowMeta) => void;
  unregister: (id: string) => void;
  focus: (id: string) => void;
  close: (id: string) => void;
  open: (id: string) => void;
  cleanUp: () => void;
  zIndexOf: (id: string) => number;
};

const DesktopContext = createContext<DesktopValue | null>(null);

export function useDesktop() {
  const value = useContext(DesktopContext);
  if (!value) {
    throw new Error("useDesktop must be used inside <Desktop>");
  }
  return value;
}

export default function Desktop({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowMeta[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [closedIds, setClosedIds] = useState<string[]>([]);
  const [resetToken, setResetToken] = useState(0);

  const register = useCallback((win: WindowMeta) => {
    setWindows((prev) =>
      prev.some((each) => each.id === win.id) ? prev : [...prev, win]
    );
    setOrder((prev) => (prev.includes(win.id) ? prev : [...prev, win.id]));
    setActiveId((prev) => prev ?? win.id);
  }, []);

  const unregister = useCallback((id: string) => {
    setWindows((prev) => prev.filter((each) => each.id !== id));
    setOrder((prev) => prev.filter((each) => each !== id));
    setClosedIds((prev) => prev.filter((each) => each !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const focus = useCallback((id: string) => {
    setOrder((prev) => [...prev.filter((each) => each !== id), id]);
    setActiveId(id);
  }, []);

  const close = useCallback((id: string) => {
    setClosedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const open = useCallback(
    (id: string) => {
      setClosedIds((prev) => prev.filter((each) => each !== id));
      focus(id);
    },
    [focus]
  );

  // "Clean Up Desktop": reopen everything and send each window home
  const cleanUp = useCallback(() => {
    setClosedIds([]);
    setResetToken((token) => token + 1);
  }, []);

  const value = useMemo<DesktopValue>(
    () => ({
      windows,
      activeId,
      closedIds,
      resetToken,
      register,
      unregister,
      focus,
      close,
      open,
      cleanUp,
      zIndexOf: (id: string) => order.indexOf(id) + 1,
    }),
    [
      windows,
      activeId,
      closedIds,
      resetToken,
      order,
      register,
      unregister,
      focus,
      close,
      open,
      cleanUp,
    ]
  );

  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}
