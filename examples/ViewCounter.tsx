"use client";
// React / Next.js. Counts the visit and shows the badge for the current page.
//   <ViewCounter id="YOUR-TRACKER-ID" path={pathname} />
// In Next.js pass usePathname() as `path` so client-side navigation is counted too.
// Leave `path` out to count the visit once and show the whole site's total.
import { useEffect } from "react";

const BASE = "https://b59.link";

export default function ViewCounter({ id, path, label = "views" }: { id: string; path?: string; label?: string }) {
  useEffect(() => {
    const img = new Image();
    img.referrerPolicy = "no-referrer-when-downgrade";
    img.src = `${BASE}/tag?id=${id}&u=${encodeURIComponent(location.href)}&r=${encodeURIComponent(document.referrer)}`;
  }, [id, path]);

  const q = new URLSearchParams({ id });
  if (path) q.set("path", path);
  if (label !== "views") q.set("label", label);
  return <img src={`${BASE}/badge.svg?${q}`} alt={label} height={20} />;
}
