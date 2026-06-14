"use client";
import { useEffect } from "react";

export default function RevealAnimator() {
  useEffect(() => {
    // Mark body as JS-ready so .reveal elements can start hidden for animation
    document.body.classList.add("js-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.body.classList.remove("js-reveal-ready");
    };
  }, []);

  return null;
}
