/* Dedicated Video section — pins on scroll, expands to 100% full screen, then scrolls to Projects. */
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import "../../styles/video.css";

gsap.registerPlugin(ScrollTrigger);

export function WhyVideoSection() {
  const trackRef = useRef(null);

  const ref = useGsapScope((scope) => {
    const track = trackRef.current;
    const video = scope.querySelector("[data-video]");
    if (!track || !video) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        video,
        {
          clipPath: "inset(14% 12% 14% 12% round 22px)",
          scale: 0.94,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "sine.inOut",
          duration: 0.65,
        }
      )
      // Hold full screen cleanly for a beat before moving to Our Projects
      .to(video, { scale: 1, duration: 0.35 });
  });

  return (
    <section ref={ref} className="section-video video-section" data-header-theme="dark">
      <div ref={trackRef} className="video-scroll-track">
        <div className="video-pin-frame">
          <video
            data-video=""
            className="video-frame"
            src={VIDEO.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Al-Fatah Builders & Developers — Business Avenue teaser"
          />
        </div>
      </div>
    </section>
  );
}
