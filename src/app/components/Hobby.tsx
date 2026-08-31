const icons = {
  globe: (
    <>
      <circle cx="20" cy="20" r="15" fill="#7fb3c8" stroke="#2f5d72" strokeWidth="1.6" />
      <path
        d="M5 20h30M20 5c5 6 5 24 0 30M20 5c-5 6-5 24 0 30M8.5 11c7 3 16 3 23 0M8.5 29c7-3 16-3 23 0"
        fill="none"
        stroke="#2f5d72"
        strokeWidth="1.3"
      />
    </>
  ),
  ukulele: (
    <>
      <rect x="14.5" y="1.5" width="9" height="5" rx="1.5" fill="#8a5a2b" stroke="#4a3418" strokeWidth="1.3" />
      <rect x="16.8" y="5.5" width="4.4" height="12" fill="#b98a4e" stroke="#4a3418" strokeWidth="1.2" />
      <path
        d="M19 16.5c5.2 0 8.6 3 8.6 6.6 0 2.1-1.4 3.3-1.4 4.6 0 1.6 2.6 2.7 2.6 5.6 0 3.9-4 6.7-9.8 6.7s-9.8-2.8-9.8-6.7c0-2.9 2.6-4 2.6-5.6 0-1.3-1.4-2.5-1.4-4.6 0-3.6 3.4-6.6 8.6-6.6Z"
        fill="#d9a463"
        stroke="#4a3418"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="27.5" r="3.1" fill="#4a3418" />
      <path d="M17.6 6v11M19 6v11M20.4 6v11" stroke="#4a3418" strokeWidth="0.6" opacity="0.8" />
      <path d="M14.6 34.5h8.8" stroke="#4a3418" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M4 9c5-2 11-2 16 2v24c-5-4-11-4-16-2Z" fill="#f2ece0" stroke="#4a3a28" strokeWidth="1.5" />
      <path d="M36 9c-5-2-11-2-16 2v24c5-4 11-4 16-2Z" fill="#fdfaf3" stroke="#4a3a28" strokeWidth="1.5" />
      <path d="M20 11v24" stroke="#4a3a28" strokeWidth="1.5" />
      <path d="M8 15c3-1 6-1 9 1M23 16c3-2 6-2 9-1" fill="none" stroke="#b9ac96" strokeWidth="1.2" />
    </>
  ),
  pencil: (
    <g transform="rotate(-38 20 20)">
      <rect x="15" y="3" width="10" height="4" fill="#c2c2cc" stroke="#4a3a12" strokeWidth="1.2" />
      <rect x="15" y="7" width="10" height="20" fill="#f0c33c" stroke="#4a3a12" strokeWidth="1.3" />
      <path d="M15 27h10l-5 8Z" fill="#e8d7b0" stroke="#4a3a12" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M18.4 32.4h3.2L20 35.6Z" fill="#26262c" />
    </g>
  ),
  controller: (
    <>
      <rect x="3" y="12" width="34" height="17" rx="6.5" fill="#8d8fa8" stroke="#39394a" strokeWidth="1.5" />
      <path d="M11 16.5v8M7 20.5h8" stroke="#2b2b38" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="27" cy="18" r="2.6" fill="#d9534f" stroke="#39394a" strokeWidth="1" />
      <circle cx="32" cy="23" r="2.6" fill="#4a8fd9" stroke="#39394a" strokeWidth="1" />
    </>
  ),
};

export default function Hobby({
  name,
  icon,
}: {
  name: string;
  icon: keyof typeof icons;
}) {
  return (
    <div className="hobby">
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        {icons[icon]}
      </svg>
      <span>{name}</span>
    </div>
  );
}
