import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Carthage Digi Books" },
      {
        name: "description",
        content:
          "Carthage Digi Books refund policy. Refunds are available within 24 hours of purchase.",
      },
      { property: "og:title", content: "Refund Policy — Carthage Digi Books" },
      {
        property: "og:description",
        content: "Refunds available within 24 hours of purchase.",
      },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <main className="relative overflow-x-hidden">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Link to="/" className="text-base font-medium tracking-tight md:text-lg">
          carthagedigibooks
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/about" className="transition hover:text-foreground">About</Link>
          <Link to="/refund-policy" className="transition hover:text-foreground">Refunds</Link>
        </nav>
        <Link to="/" hash="checkout" className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-sm">
          Get the book
        </Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-24">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="accent-dot mr-2 align-middle" /> Refund Policy
        </p>
        <h1 className="text-4xl tracking-tight md:text-6xl">Refund policy</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We want you to feel confident buying from Carthage Digi Books. If the
          book isn't what you expected, you can request a full refund within
          <strong className="text-foreground"> 24 hours of purchase</strong>.
        </p>

        <div className="mt-12 space-y-10 text-muted-foreground">
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Eligibility</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Refund requests must be submitted within 24 hours of your purchase.</li>
              <li>The request must come from the same email address used at checkout.</li>
              <li>Requests received after the 24-hour window cannot be honoured — all sales become final.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-foreground">How to request a refund</h2>
            <p>
              Email <a href="mailto:hello@carthagedigibooks.com" className="text-foreground underline underline-offset-4">hello@carthagedigibooks.com</a> with
              the subject line "Refund request" and include the email address you
              used at checkout. We'll process the refund through PayFast within
              3–5 business days.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-foreground">Why a 24-hour window?</h2>
            <p>
              Our books are digital products delivered instantly. The 24-hour
              window gives you time to skim the material and decide if it's the
              right fit, while protecting us from abuse of unlimited returns on
              downloadable files.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <span className="font-mono text-sm tracking-tight opacity-70">carthagedigibooks</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/refund-policy" className="hover:text-foreground">Refund policy</Link>
          </div>
          <p className="font-mono">© {new Date().getFullYear()} Carthage Digi Books.</p>
        </div>
      </footer>
    </main>
  );
}
