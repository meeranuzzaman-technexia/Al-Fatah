/* Tiny path router — clean URLs (/about-us/) with a single-file build.
 * Served by any static host; add the rewrite rule in public/_redirects
 * (Netlify/Cloudflare) or vercel.json so deep links resolve to index.html. */
import { useEffect, useState } from "react";

const normalise = (path) => {
  let p = (path || "/").split("?")[0].split("#")[0];
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
};

export function useRoute() {
  const [route, setRoute] = useState(() => normalise(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(normalise(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return route;
}

export function navigate(href) {
  const target = normalise(href);
  if (normalise(window.location.pathname) === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", target === "/" ? "/" : target + "/");
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "auto" });
}
