"use client";

import { useState } from "react";

export default function Contact({
  name,
  value,
  href,
}: {
  name: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);
  const label = value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <div className="contact">
      <span className="contact-name">{name}</span>
      <a
        className="contact-value"
        href={href}
        target="_blank"
        rel="noreferrer"
        title={value}
      >
        {label}
      </a>
      <button
        className="ui-button"
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
