import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Coins } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { formatPrice } from "@/shared/lib/utils";

interface LocationState {
  game: { id: string; name: string; slug: string };
  product: { id: string; name: string; price: number };
  accountFields?: Record<string, string>;
  gradient?: string;
  paymentMethodId?: string;
  paymentMethodName?: string;
}

const paymentMethods = [
  { id: "gopay", name: "GoPay", type: "E-Wallet", accountName: "TOPIN Official", accountNumber: "081234567890" },
  { id: "ovo", name: "OVO", type: "E-Wallet", accountName: "TOPIN Official", accountNumber: "081234567891" },
  { id: "dana", name: "DANA", type: "E-Wallet", accountName: "TOPIN Official", accountNumber: "081234567892" },
  { id: "bca", name: "BCA Virtual Account", type: "Bank Transfer", accountName: "PT TOPIN Indonesia", accountNumber: "1234567890" },
  { id: "mandiri", name: "Mandiri Virtual Account", type: "Bank Transfer", accountName: "PT TOPIN Indonesia", accountNumber: "9876543210" },
  { id: "telkomsel", name: "Telkomsel", type: "Pulsa", accountName: "TOPIN Pulsa", accountNumber: "081111111111" },
];

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [step, setStep] = useState(1);

  if (!state) {
    return <Navigate to="/games" />;
  }

  const { game, product, accountFields, paymentMethodId, paymentMethodName } = state;
  const fields = accountFields ?? {};
  const total = product.price;
  const selectedPayment = paymentMethodId ?? null;

  const handleSubmit = async () => {
    if (!selectedPayment) return;
    setIsProcessing(true);

    const generatedOrderNumber = `TOP-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setOrderNumber(generatedOrderNumber);

    const orderData = {
      orderNumber: generatedOrderNumber,
      status: "PENDING",
      totalAmount: total,
      createdAt: new Date().toISOString(),
      items: [{ name: product.name, qty: 1, price: product.price }],
      paymentMethod: paymentMethods.find((p) => p.id === selectedPayment)?.name,
      gameName: game.name,
      gameUserId: Object.values(fields)[0] ?? "",
    };

    const stored = localStorage.getItem("topin_orders");
    const orders = stored ? JSON.parse(stored) : [];
    orders.unshift(orderData);
    localStorage.setItem("topin_orders", JSON.stringify(orders));

    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-lg items-center px-4 py-12">
        <Card className="w-full text-center">
          <CardContent className="p-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-textPrimary">Order Placed!</h2>
            <p className="mb-6 text-textSecondary">Your order has been submitted successfully.</p>
            <div className="mb-6 rounded-[12px] bg-background p-4">
              <p className="text-sm text-textSecondary">Order Number</p>
              <p className="text-lg font-bold text-primary">{orderNumber}</p>
            </div>
            <p className="mb-6 text-sm text-textSecondary">
              Please complete the payment to {paymentMethods.find((p) => p.id === selectedPayment)?.accountNumber} a.n.{" "}
              {paymentMethods.find((p) => p.id === selectedPayment)?.accountName}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/games")}>
                Back to Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <button
        onClick={() => navigate(`/games/${game.slug}`)}
        className="mb-6 flex items-center gap-2 text-sm text-textSecondary hover:text-textPrimary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {game.name}
      </button>

      <h1 className="mb-8 text-3xl font-bold text-textPrimary">Checkout</h1>

      <div className="mb-6 flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 1 ? "bg-primary text-white" : "bg-success/20 text-success"}`}>
          {step === 1 ? "1" : <Check className="h-3.5 w-3.5" />}
        </div>
        <span className={`text-sm font-medium ${step >= 1 ? "text-textPrimary" : "text-textSecondary"}`}>Customer</span>
        <div className="mx-2 h-px flex-1 bg-border" />
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 2 ? "bg-primary text-white" : "bg-background text-textSecondary"}`}>
          2
        </div>
        <span className={`text-sm font-medium ${step === 2 ? "text-textPrimary" : "text-textSecondary"}`}>Review</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className={`space-y-6 ${step === 2 ? "lg:col-span-3 lg:col-start-2" : "mx-auto w-full max-w-lg"}`}>
          {step === 1 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-textPrimary">Customer Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm text-textSecondary">Name</label>
                    <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-textSecondary">Email</label>
                    <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-textSecondary">Phone (optional)</label>
                    <Input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="08123456789" />
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg" disabled={!customerName || !customerEmail} onClick={() => setStep(2)}>
                  Next
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-textPrimary">Order Summary</h3>
                <div className="mb-4 rounded-[12px] bg-background p-4">
                  <p className="text-sm text-textSecondary">Game</p>
                  <p className="font-medium text-textPrimary">{game.name}</p>
                  {Object.entries(fields).map(([key, val]) => (
                    <div key={key} className="mt-2">
                      <p className="text-sm text-textSecondary">{key}</p>
                      <p className="font-medium text-textPrimary">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="text-textSecondary">{product.name}</span>
                  </div>
                  <span className="font-medium text-textPrimary">{formatPrice(product.price)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="font-semibold text-textPrimary">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
                {selectedPayment && (() => {
                  const pm = paymentMethods.find((p) => p.id === selectedPayment);
                  return pm ? (
                    <div className="mt-4 rounded-[12px] border border-border bg-background/50 p-3">
                      <p className="text-[11px] text-textSecondary">Metode Pembayaran</p>
                      <p className="mt-0.5 text-sm font-medium text-textPrimary">{pm.name}</p>
                      <p className="text-xs text-textSecondary">{pm.accountNumber} a.n. {pm.accountName}</p>
                    </div>
                  ) : null;
                })()}
                <Button className="mt-6 w-full" size="lg" disabled={isProcessing} onClick={handleSubmit}>
                  {isProcessing ? "Processing..." : "Bayar"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
}
