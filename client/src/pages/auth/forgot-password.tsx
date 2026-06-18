import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/constants";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <p className="text-sm text-textSecondary">Enter your email to receive reset instructions</p>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center">
              <p className="mb-4 text-textSecondary">
                If an account with that email exists, we've sent password reset instructions.
              </p>
              <Link to={ROUTES.login}>
                <Button variant="outline">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-textSecondary">Email</label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Reset Link
              </Button>
              <p className="text-center text-sm text-textSecondary">
                <Link to={ROUTES.login} className="text-primary hover:underline">Back to Login</Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
