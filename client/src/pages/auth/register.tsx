import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ROUTES } from "@/shared/constants";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const requirements = useMemo(
    () => [
      { label: "Min 8 characters", met: password.length >= 8 },
      { label: "Uppercase letter", met: /[A-Z]/.test(password) },
      { label: "Lowercase letter", met: /[a-z]/.test(password) },
      { label: "Number", met: /[0-9]/.test(password) },
      { label: "Symbol", met: /[^A-Za-z0-9]/.test(password) },
    ],
    [password],
  );

  const allMet = requirements.every((r) => r.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!allMet) {
      setError("Password does not meet requirements");
      return;
    }
    setLoading(true);
    try {
      await register({ email, password, name, phone: phone || undefined });
      navigate(ROUTES.dashboard);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-sm items-center justify-center px-4 py-12">
      <div className="w-full">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block text-xl font-bold tracking-tight text-textPrimary">
            TOPIN
          </Link>
          <h1 className="mt-6 text-lg font-semibold text-textPrimary">Create account</h1>
          <p className="mt-1 text-sm text-textSecondary">Join TOPIN and start top up</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-[12px] border border-danger/20 bg-danger/10 p-3 text-sm text-danger">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm text-textSecondary">Name</label>
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-textSecondary">Email</label>
            <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-textSecondary">Phone (optional)</label>
            <Input type="tel" placeholder="08123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-textSecondary">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <ul className="mt-2 space-y-1">
                {requirements.map((r) => (
                  <li key={r.label} className="flex items-center gap-1.5 text-xs">
                    {r.met ? (
                      <Check className="h-3 w-3 text-success" />
                    ) : (
                      <X className="h-3 w-3 text-textSecondary" />
                    )}
                    <span className={r.met ? "text-textPrimary" : "text-textSecondary"}>{r.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading || (password.length > 0 && !allMet)}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-textSecondary">
          Already have an account?{" "}
          <Link to={ROUTES.login} className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
