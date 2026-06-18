export interface FaqItem {
  q: string;
  a: string;
}

export const homeFaqs: FaqItem[] = [
  {
    q: "What is TOPIN?",
    a: "TOPIN is a digital gaming top-up platform that allows you to purchase in-game currencies, diamonds, and vouchers for popular games at competitive prices.",
  },
  {
    q: "How do I top up?",
    a: "Simply select your game, enter your game ID, choose a package, select a payment method, and complete the transaction. Your items will be delivered instantly.",
  },
  {
    q: "What payment methods are available?",
    a: "We support GoPay, OVO, DANA, BCA Virtual Account, Mandiri Virtual Account, and Telkomsel. More payment options are coming soon.",
  },
  {
    q: "Is it safe to use TOPIN?",
    a: "Absolutely. We use encrypted connections and trusted payment gateways. Your personal data and transactions are fully protected.",
  },
  {
    q: "How long does delivery take?",
    a: "Most top-ups are processed instantly after payment confirmation. In some cases, it may take 1\u20135 minutes depending on the game server.",
  },
];
