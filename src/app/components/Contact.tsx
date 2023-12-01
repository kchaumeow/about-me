"use client";

import { useState } from "react";
import { DEFAULT_MAX_VERSION } from "tls";

export default function Contact({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="contact">
      <div>{name}</div>
      <input type="url" id={name} value={value} readOnly />
      <button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
