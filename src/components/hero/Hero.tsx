"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import videoWebm from "@/assets/videos/video.webm";
import videoMp4 from "@/assets/videos/video.mp4";
import poster from "@/assets/images/slider-1.png";
import Button from "@/components/ui/Button";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePlayback = () => {
      if (mq.matches) {
        video.pause();
        setIsPlaying(false);
        return;
      }

      if (isPlaying) {
        video.play().catch(() => {});
        return;
      }

      video.pause();
    };

    updatePlayback();
    mq.addEventListener("change", updatePlayback);

    return () => {
      mq.removeEventListener("change", updatePlayback);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPlaying(false);
      video.pause();
      return;
    }

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-foreground">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        poster={poster.src}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-end justify-start px-6 pb-10 md:px-12 md:pb-16">
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/20 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <Button
            type="button"
            size="sm"
            variant="primary"
            className="rounded-full bg-primary/90 px-5 py-2 text-xs font-medium tracking-[0.12em] text-white uppercase hover:bg-primary"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? "Pausar" : "Reproducir"}
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full border border-white/25 bg-white/5 px-5 py-2 text-xs font-medium tracking-[0.12em] text-white uppercase hover:bg-white/10 hover:text-white"
            onClick={() => router.push("/products")}
          >
            Productos
          </Button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
