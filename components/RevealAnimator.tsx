"use client";
import { useEffect } from "react";

export default function RevealAnimator() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal, .reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
