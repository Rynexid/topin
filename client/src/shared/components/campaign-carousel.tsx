import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Campaign } from "@/shared/constants/campaigns";

interface CampaignCarouselProps {
  campaigns: Campaign[];
}

const AUTO_PLAY_DURATION = 5000;
const TRANSITION_DURATION = 0.5;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function CampaignCarousel({ campaigns: items }: CampaignCarouselProps) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = items.filter((c) => c);

  const goTo = useCallback(
    (next: number, dir: number) => {
      const clamped = ((next % active.length) + active.length) % active.length;
      setIndex([clamped, dir]);
    },
    [active.length],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (isPaused || active.length <= 1) return;
    intervalRef.current = setInterval(next, AUTO_PLAY_DURATION);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, next, active.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (active.length === 0) return null;

  const campaign = active[index];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6 md:pt-8" aria-label="Promotions">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl outline-none"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Campaign carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
          }
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={campaign.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          >
            <Link to={campaign.href} className="block" aria-label={campaign.title}>
              <div className="aspect-[2/1] overflow-hidden rounded-3xl md:aspect-[3/1]">
                <img
                  src={campaign.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {active.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 md:bottom-4">
            {active.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  const dir = i > index ? 1 : -1;
                  goTo(i, dir);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
