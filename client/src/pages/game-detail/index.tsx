import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Coins, Gem, Award, Wallet, ChevronDown, Gamepad2, Star, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Rating } from "@/shared/components/ui/rating";
import { formatPrice } from "@/shared/lib/utils";
import { getGameBySlug, cardImages, heroImages } from "@/shared/constants/games";
import { Footer } from "@/shared/components/footer";

const productsByGame: Record<string, { id: string; name: string; bonus?: string; price: number; originalPrice?: number; isPopular: boolean }[]> = {
  "mobile-legends": [
    { id: "ml-1", name: "86 Diamonds", price: 10000, isPopular: false },
    { id: "ml-2", name: "172 Diamonds", bonus: "161+11 Bonus", price: 20000, originalPrice: 22000, isPopular: true },
    { id: "ml-3", name: "344 Diamonds", bonus: "320+24 Bonus", price: 40000, originalPrice: 45000, isPopular: true },
    { id: "ml-4", name: "514 Diamonds", bonus: "478+36 Bonus", price: 55000, isPopular: false },
    { id: "ml-5", name: "706 Diamonds", bonus: "656+50 Bonus", price: 75000, isPopular: true },
    { id: "ml-6", name: "1050 Diamonds", bonus: "974+76 Bonus", price: 100000, isPopular: true },
    { id: "ml-7", name: "Twilight Pass", price: 150000, isPopular: true },
    { id: "ml-8", name: "Starlight Member", price: 50000, originalPrice: 60000, isPopular: false },
  ],
  "free-fire": [
    { id: "ff-1", name: "70 Diamonds", price: 7000, isPopular: false },
    { id: "ff-2", name: "140 Diamonds", bonus: "135+5 Bonus", price: 14000, isPopular: true },
    { id: "ff-3", name: "355 Diamonds", bonus: "343+12 Bonus", price: 35000, isPopular: true },
    { id: "ff-4", name: "720 Diamonds", bonus: "695+25 Bonus", price: 70000, isPopular: false },
    { id: "ff-5", name: "1450 Diamonds", bonus: "1395+55 Bonus", price: 140000, originalPrice: 155000, isPopular: true },
    { id: "ff-6", name: "Member Mingguan", price: 30000, isPopular: true },
  ],
};

const paymentGroups = [
  {
    name: "E-Wallet",
    methods: [
      { id: "gopay", name: "GoPay", desc: "Instant" },
      { id: "ovo", name: "OVO", desc: "Instant" },
      { id: "dana", name: "DANA", desc: "Instant" },
    ],
  },
  {
    name: "Bank Transfer",
    methods: [
      { id: "bca", name: "BCA Virtual Account", desc: "1-5 menit" },
      { id: "mandiri", name: "Mandiri Virtual Account", desc: "1-5 menit" },
      { id: "bni", name: "BNI Virtual Account", desc: "1-5 menit" },
    ],
  },
  {
    name: "Convenience Store",
    methods: [
      { id: "alfamart", name: "Alfamart", desc: "Instant" },
      { id: "indomaret", name: "Indomaret", desc: "Instant" },
    ],
  },
];

const paymentMethods = paymentGroups.flatMap((g) => g.methods);

const faqs = [
  { q: "How long does top-up take?", a: "Top-up is processed within 1-5 minutes after payment confirmation. Some items may take up to 15 minutes depending on the game server." },
  { q: "What if I enter the wrong ID?", a: "Contact our support team immediately with your order number. We will help verify and correct the information before processing." },
  { q: "Is it safe to top-up here?", a: "Absolutely. We use encrypted connections and trusted payment gateways. Your data and transactions are fully secure." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled before payment is confirmed. After payment, please contact support for assistance." },
];

function motionProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: "easeOut", delay },
  };
}

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const game = getGameBySlug(slug || "");
  const defaultFields = game?.topUpFields ?? [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }];
  const [accountFields, setAccountFields] = useState<Record<string, string>>(() =>
    Object.fromEntries(defaultFields.map((f) => [f.key, ""]))
  );
  const [fieldsVersion, setFieldsVersion] = useState(0);
  const fieldsRef = useRef(accountFields);
  fieldsRef.current = accountFields;
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [descOpen, setDescOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const products = slug ? productsByGame[slug] || [] : [];
  const cardImage = slug ? cardImages[slug] : undefined;
  const heroImage = slug ? heroImages[slug] : undefined;
  const handleFieldChange = (key: string, value: string) => {
    setAccountFields((prev) => ({ ...prev, [key]: value }));
    setFieldsVersion((v) => v + 1);
    setVerified(false);
    setSelectedProduct(null);
    setSelectedPayment(null);
    setToast(null);
  };

  useEffect(() => {
    setAccountFields(Object.fromEntries(defaultFields.map((f) => [f.key, ""])));
    setFieldsVersion(0);
    setVerified(false);
    setVerifying(false);
    setSelectedProduct(null);
    setSelectedPayment(null);
    setExpandedGroups({});
    setToast(null);
  }, [slug]);

  useEffect(() => {
    const allFilled = defaultFields.every((f) => (fieldsRef.current[f.key] ?? "").trim().length > 0);
    if (allFilled) {
      setVerifying(true);
      const timer = setTimeout(() => {
        setVerifying(false);
        const firstVal = fieldsRef.current[defaultFields[0]?.key] ?? "";
        if (firstVal === "123") {
          setVerified(true);
        } else {
          setToast("Akun yang anda masukan salah");
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
    setVerifying(false);
  }, [fieldsVersion]);

  const genreToCategory: Record<string, string> = {
    MOBA: "Multiplayer Online Battle Arena",
    "Battle Royale": "Battle Royale",
    FPS: "First-Person Shooter",
    RPG: "Role-Playing Game",
    Platform: "Online Platform",
    "Digital Wallet": "Digital Wallet",
    Sports: "Sports Simulation",
  };

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-textPrimary">Game not found</h1>
        <Button variant="ghost" className="mt-4" onClick={() => navigate("/games")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to games
        </Button>
      </div>
    );
  }

  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const total = selectedProductData?.price || 0;

  const handleCheckout = () => {
    const allFieldsFilled = defaultFields.every((f) => (accountFields[f.key] ?? "").trim().length > 0);
    if (!selectedProduct || !allFieldsFilled || !selectedPayment) return;
    const accountFieldsDisplay: Record<string, string> = {};
    defaultFields.forEach((f) => { accountFieldsDisplay[f.label] = accountFields[f.key] ?? ""; });
    navigate("/checkout", {
      state: {
        game: { id: game.id, name: game.name, slug: game.slug },
        product: selectedProductData,
        accountFields: accountFieldsDisplay,
        gradient: game.gradient,
        paymentMethodId: selectedPayment,
        paymentMethodName: paymentMethods.find((p) => p.id === selectedPayment)?.name,
      },
    });
  };

  return (
    <div>
      {/* Hero + Floating Card wrapper */}
      <section className="relative" aria-label="Game artwork">
        {/* Hero background */}
        <div className="relative h-[260px] overflow-hidden md:h-[380px]">
          {heroImage ? (
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        </div>

        <button
          onClick={() => navigate("/games")}
          className="absolute left-4 top-6 z-20 flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white md:left-8"
          aria-label="Back to games"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Desktop: card + info */}
        <div className="relative z-10 mx-auto hidden max-w-7xl px-4 md:block" style={{ marginTop: "-200px" }}>
          <div className="grid grid-cols-[320px_1fr] gap-8">
            <div className="flex justify-center">
              <motion.div
                className="h-[390px] w-[260px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {cardImage ? (
                  <img
                    src={cardImage}
                    alt={`${game.name} cover`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className={`flex h-full items-center justify-center bg-gradient-to-br ${game.gradient}`}>
                    <span className="select-none text-7xl font-bold tracking-tight text-white/15">
                      {game.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="pt-8">
              <MotionGameInfo
                game={game}
                genreToCategory={genreToCategory}
                descOpen={descOpen}
                onToggleDesc={() => setDescOpen((p) => !p)}
              />
            </div>
          </div>
        </div>

        {/* Mobile: card + info */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:hidden" style={{ marginTop: "-80px" }}>
          <div className="flex items-start gap-4">
            <motion.div
              className="relative h-[180px] w-[120px] shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {cardImage ? (
                <img
                  src={cardImage}
                  alt={`${game.name} cover`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className={`flex h-full items-center justify-center bg-gradient-to-br ${game.gradient}`}>
                  <span className="select-none text-4xl font-bold tracking-tight text-white/15">
                    {game.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
              )}
              <div className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                <span className="text-yellow-400">&#9733;</span>
                <span>{game.rating.toFixed(1).replace(".", ",")}</span>
              </div>
            </motion.div>

            <div className="min-w-0 flex-1 pt-1">
              <h1 className="text-lg font-bold text-textPrimary">{game.name}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {game.featured && <Badge variant="default">Top Pick</Badge>}
                <Badge variant="secondary">{game.genre}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-textSecondary">
                <span>{game.publisher}</span>
              </div>
              <button
                onClick={() => setDescOpen((p) => !p)}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                <span>Description</span>
                <motion.div animate={{ rotate: descOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {descOpen && (
                  <motion.div
                    key="mobile-desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-[12px] border border-border bg-surface p-3 text-xs leading-relaxed text-textSecondary">
                      {game.shortDescription}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

        {/* Account ID Form */}
        <section className="mx-auto mt-10 w-full max-w-xl px-4 md:mt-12 md:px-0" aria-label="Account ID Form">

          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 rounded-[12px] border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...motionProps(0.05)}>
            <Card className="border border-border bg-surface">
              <CardContent className="p-5 md:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-textPrimary">
                  <Gamepad2 className="h-5 w-5 text-primary" /> Account ID
                </h2>
                <div className={defaultFields.length > 1 ? "grid grid-cols-2 gap-4" : "space-y-3"}>
                  {defaultFields.map((field) => (
                    <div key={field.key}>
                      <label htmlFor={field.key} className="mb-1.5 block text-sm text-textSecondary">
                        {field.label}
                      </label>
                      <Input
                        id={field.key}
                        placeholder={field.placeholder}
                        value={accountFields[field.key] ?? ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                {verified && accountFields[defaultFields[0]?.key] === "123" && (
                  <p className="mt-3 text-xs text-textSecondary">
                    Login sebagai <span className="font-medium text-textPrimary">Rynex</span>
                  </p>
                )}
                {verifying && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-textSecondary">
                    <Loader2 className="h-3 w-3 animate-spin text-primary" /> Memverifikasi akun...
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence>
            {verified && (
              <motion.div
                key="product-section"
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-5"
              >
                <Card className="border border-border bg-surface">
                  <CardContent className="p-5 md:p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-textPrimary">
                      <Coins className="h-5 w-5 text-primary" /> Pilih Product
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          className={`relative rounded-[10px] border p-2.5 text-left transition-all ${
                            selectedProduct === product.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 bg-background/50"
                          }`}
                        >
                          {product.isPopular && (
                            <Star className="absolute right-1.5 top-1.5 h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                          )}
                          <div className="flex items-start gap-1.5">
                            <div className="mt-0.5 shrink-0 text-primary">
                              {product.name.includes("Diamond") || product.name.includes("Diamonds") ? (
                                <Gem className="h-3 w-3" />
                              ) : (
                                <Award className="h-3 w-3" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs md:text-xs font-medium text-textPrimary">{product.name}</p>
                              {product.bonus && (
                                <p className="mt-0.5 text-[10px] md:text-[10px] text-emerald-400 font-medium">{product.bonus}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-1.5 flex items-baseline gap-1">
                            <span className="text-[11px] md:text-xs font-semibold text-primary">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-[9px] md:text-[10px] text-textSecondary line-through">{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {verified && selectedProduct && (
              <motion.div
                key="payment-section"
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
                className="mt-5"
              >
                <Card className="border border-border bg-surface">
                  <CardContent className="p-5 md:p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-textPrimary">
                      <Wallet className="h-5 w-5 text-primary" /> Pilih Pembayaran
                    </h3>
                    <div className="space-y-3">
                      {paymentGroups.map((group) => {
                        const isExpanded = expandedGroups[group.name] ?? false;
                        return (
                        <div key={group.name} className="overflow-hidden rounded-[12px] border border-border">
                          <button
                            onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.name]: !isExpanded }))}
                            className="flex w-full items-center justify-between bg-surface px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
                          >
                            <span className="text-[11px] font-medium uppercase tracking-wider text-textSecondary">{group.name}</span>
                            <ChevronDown className={`h-3.5 w-3.5 text-textSecondary transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                key="methods"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                            <div className="grid gap-2 border-t border-border p-4 sm:grid-cols-2">
                              {group.methods.map((method) => (
                                <button
                                  key={method.id}
                                  onClick={() => setSelectedPayment(method.id)}
                                  className={`rounded-[10px] border p-2.5 text-left transition-all ${
                                    selectedPayment === method.id
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50 bg-background/50"
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                      selectedPayment === method.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
                                    }`}>
                                      <Wallet className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-textPrimary truncate">{method.name}</p>
                                      <p className="text-[10px] text-textSecondary truncate">{group.name}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                                      {method.desc}
                                    </Badge>
                                  </div>
                                </button>
                              ))}
                            </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {verified && selectedProduct && (
              <motion.div
                key="checkout-section"
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
                className="mt-5"
              >
                <Card className="border border-border bg-surface">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${game.gradient}`}>
                          <span className="text-xs font-bold text-white">{game.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-textPrimary">Ringkasan Pesanan</p>
                          <p className="text-[10px] text-textSecondary">
                            {selectedProductData?.name || "Pilih product"}
                            {selectedPayment && (
                              <>
                                {" "}&middot;{" "}
                                {paymentMethods.find((p) => p.id === selectedPayment)?.name}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-primary">{formatPrice(total)}</span>
                        <Button
                          size="sm"
                          disabled={!selectedProduct || !selectedPayment}
                          onClick={handleCheckout}
                        >
                          <ShoppingCart className="mr-1.5 h-4 w-4" />
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-12 max-w-7xl px-4 pb-12 md:mt-16 md:px-4" aria-label="Frequently Asked Questions">
          <h2 className="mb-6 text-lg font-semibold text-textPrimary">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} {...motionProps(0.05 * i)}>
                <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-textPrimary transition-colors hover:bg-white/[0.02] md:px-6"
                    aria-expanded={openFaq === faq.q}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="pr-2">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === faq.q ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-4 w-4 text-textSecondary" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === faq.q && (
                      <motion.div
                        id={`faq-answer-${i}`}
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
        </section>

        <Footer />
      </div>
    );
  }

function MotionGameInfo({
  game,
  genreToCategory,
  descOpen,
  onToggleDesc,
}: {
  game: NonNullable<ReturnType<typeof getGameBySlug>>;
  genreToCategory: Record<string, string>;
  descOpen: boolean;
  onToggleDesc: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
    >
      <h1 className="text-2xl font-bold text-textPrimary md:text-4xl md:leading-tight">
        {game.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {game.featured && <Badge variant="default">Top Pick</Badge>}
        <Badge variant="secondary">{game.genre}</Badge>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm text-textSecondary">{game.publisher}</span>
        <span className="text-textSecondary/30">|</span>
        <Rating value={game.rating} readonly size="sm" showValue />
      </div>

      {genreToCategory[game.genre] && (
        <div className="mt-4">
          <p className="text-xs text-textSecondary/60">Category</p>
          <p className="mt-0.5 text-sm text-textSecondary">{genreToCategory[game.genre]}</p>
        </div>
      )}

      {/* Description accordion */}
      <div className="mt-5 overflow-hidden rounded-[16px] border border-border bg-surface">
        <button
          onClick={onToggleDesc}
          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-textPrimary transition-colors hover:bg-white/[0.02] md:px-6"
          aria-expanded={descOpen}
          aria-controls="game-description"
        >
          <span>Description</span>
          <motion.div
            animate={{ rotate: descOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-textSecondary" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {descOpen && (
            <motion.div
              id="game-description"
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-relaxed text-textSecondary md:px-6">
                {game.shortDescription}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
