import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-textPrimary">TOPIN</h3>
            <p className="text-sm text-textSecondary">
              Platform top up game terpercaya di Indonesia. Cepat, aman, dan harga terbaik.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textPrimary">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/games" className="text-sm text-textSecondary hover:text-textPrimary">Games</Link>
              <Link to="/about" className="text-sm text-textSecondary hover:text-textPrimary">About</Link>
              <Link to="/contact" className="text-sm text-textSecondary hover:text-textPrimary">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textPrimary">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/faq" className="text-sm text-textSecondary hover:text-textPrimary">FAQ</Link>
              <Link to="/terms" className="text-sm text-textSecondary hover:text-textPrimary">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-textSecondary hover:text-textPrimary">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textPrimary">Payment Methods</h4>
            <p className="text-sm text-textSecondary">
              GoPay, OVO, DANA, Bank Transfer, and more.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-textSecondary">
          &copy; {new Date().getFullYear()} TOPIN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
