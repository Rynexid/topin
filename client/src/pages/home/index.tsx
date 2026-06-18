import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wallet, Building2, Smartphone } from "lucide-react";
import { ArtworkCard } from "@/shared/components/ui/artwork-card";
import { CampaignCarousel } from "@/shared/components/campaign-carousel";
import { getGames } from "@/shared/constants/games";
import { campaigns } from "@/shared/constants/campaigns";
import { voucherItems } from "@/shared/constants/vouchers";
import { homeFaqs } from "@/shared/constants/home-faq";
import { blogPosts, type BlogItem } from "@/shared/constants/blogs";

const FEATURED_GAME_SLUGS = [
  "mobile-legends",
  "free-fire",
  "pubg-mobile",
  "valorant",
  "genshin-impact",
  "honkai-star-rail",
  "roblox",
  "fc-mobile",
];

const MORE_GAME_SLUGS = [
  "cod-mobile",
  "arena-breakout",
  "blood-strike",
  "delta-force",
  "wild-rift",
  "point-blank",
];

const paymentMethods = [
  { name: "GoPay", type: "E-Wallet", icon: Wallet },
  { name: "OVO", type: "E-Wallet", icon: Wallet },
  { name: "DANA", type: "E-Wallet", icon: Wallet },
  { name: "BCA Virtual Account", type: "Bank Transfer", icon: Building2 },
  { name: "Mandiri Virtual Account", type: "Bank Transfer", icon: Building2 },
  { name: "Telkomsel", type: "Pulsa", icon: Smartphone },
];

function motionProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: "easeOut", delay },
  };
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-textPrimary md:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-textSecondary">{description}</p>
    </div>
  );
}

function GameGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-6">
      {children}
    </div>
  );
}

function BlogCard({ post, index }: { post: BlogItem; index: number }) {
  return (
    <motion.div {...motionProps(0.05 * index)}>
      <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
        <div className={`relative aspect-[16/9] bg-gradient-to-br ${post.cover}`}>
          <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold leading-snug text-textPrimary line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-textSecondary line-clamp-2">
            {post.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-textSecondary">
            <span>{post.author}</span>
            <span className="text-border">•</span>
            <span>{post.publish}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeCard({
  name,
  type,
  icon: Icon,
}: {
  name: string;
  type: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex w-[180px] shrink-0 items-center gap-3 rounded-[16px] border border-border bg-surface px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-textPrimary">{name}</p>
        <p className="text-xs text-textSecondary">{type}</p>
      </div>
    </div>
  );
}

export function HomePage() {
  const allGames = getGames();
  const featuredGames = allGames.filter((g) => FEATURED_GAME_SLUGS.includes(g.slug));
  const moreGames = allGames.filter((g) => MORE_GAME_SLUGS.includes(g.slug));
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div>
      <CampaignCarousel campaigns={campaigns} />

      {/* Featured Games */}
      {featuredGames.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              title="Featured Games"
              description="Popular games trusted by millions of players."
            />
            <GameGrid>
              {featuredGames.map((game, i) => (
                <motion.div key={game.id} {...motionProps(0.05 * i)}>
                  <ArtworkCard
                    slug={game.slug}
                    name={game.name}
                    gradient={game.gradient}
                  />
                </motion.div>
              ))}
            </GameGrid>
          </div>
        </section>
      )}

      {/* More Games */}
      {moreGames.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              title="More Games"
              description="Discover more supported games."
            />
            <GameGrid>
              {moreGames.map((game, i) => (
                <motion.div key={game.id} {...motionProps(0.05 * i)}>
                  <ArtworkCard
                    slug={game.slug}
                    name={game.name}
                    gradient={game.gradient}
                  />
                </motion.div>
              ))}
            </GameGrid>
          </div>
        </section>
      )}

      {/* Voucher & Digital */}
      {voucherItems.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              title="Voucher & Digital"
              description="Digital vouchers and gaming subscriptions."
            />
            <GameGrid>
              {voucherItems.map((item, i) => (
                <motion.div key={item.slug} {...motionProps(0.05 * i)}>
                  <ArtworkCard
                    slug={item.slug}
                    name={item.name}
                    gradient={item.gradient}
                    href={item.href}
                  />
                </motion.div>
              ))}
            </GameGrid>
          </div>
        </section>
      )}

      {/* Payment Methods */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="Payment Methods"
            description="Choose from various secure payment options."
          />
          <div className="overflow-hidden">
            <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
              {[...paymentMethods, ...paymentMethods].map((method, i) => (
                <MarqueeCard key={`${method.name}-${i}`} {...method} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              title="Blog & Tips"
              description="Tips, tutorial, dan info terbaru seputar gaming."
            />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
              {blogPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Everything you need to know about TOPIN."
          />
          <div className="space-y-2">
            {homeFaqs.map((faq, i) => (
              <motion.div key={faq.q} {...motionProps(0.05 * i)}>
                <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-textPrimary transition-colors hover:bg-white/[0.02] md:px-6"
                    aria-expanded={openFaq === faq.q}
                    aria-controls={`home-faq-answer-${i}`}
                  >
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === faq.q ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 shrink-0 text-textSecondary" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === faq.q && (
                      <motion.div
                        id={`home-faq-answer-${i}`}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-relaxed text-textSecondary md:px-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
