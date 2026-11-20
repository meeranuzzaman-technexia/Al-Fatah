/* Dedicated Video section with scroll-driven clip-path expansion. */
import gsap from "gsap";
import { VIDEO } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { Container } from "../ported/ui.jsx";
import "../../styles/video.css";

export function WhyVideoSection() {
  const ref = useGsapScope((scope) => {
    const lines = scope.querySelectorAll("[data-line]");
    if (lines.length) {
      gsap.from(lines, {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: scope, start: "top 70%" },
      });
    }

    const fades = scope.querySelectorAll("[data-fade]");
    if (fades.length) {
      gsap.from(fades, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: scope, start: "top 65%" },
      });
    }

    const video = scope.querySelector("[data-video]");
    if (video) {
      gsap.fromTo(
        video,
        { clipPath: "inset(14% 14% 14% 14% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: video, start: "top 95%", end: "top 35%", scrub: true },
        }
      );
    }
  });

  return (
    <section ref={ref} className="section-video video-section" data-header-theme="light">
      <Container>
        <video
          data-video=""
          className="video-frame"
          src={VIDEO.src}
          poster={VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Al-Fatah Builders & Developers — project film"
        />
      </Container>
    </section>
  );
}
