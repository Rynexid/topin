import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cardImages } from "@/shared/constants/games";

interface ArtworkCardProps {
  slug: string;
  name: string;
  gradient: string;
  href?: string;
  image?: string;
}

export function ArtworkCard({ slug, name, gradient, href, image }: ArtworkCardProps) {
  const imgSrc = image ?? cardImages[slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link
        to={href ?? `/games/${slug}`}
        className="group relative mx-auto block w-full max-w-[220px] rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={name}
      >
        <motion.div
          className={`relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${gradient} shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}
          style={{ aspectRatio: "3/4" }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {imgSrc && (
            <img
              src={imgSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
              loading="lazy"
            />
          )}
          {/* Desktop hover overlay */}
          <div className="absolute inset-0 hidden items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex">
            <span className="text-sm font-semibold text-white">{name}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
