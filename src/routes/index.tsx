import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Zap,
  Target,
  LineChart,
  ShieldCheck,
  Lock,
} from "lucide-react";

import ebookHeroAsset from "@/assets/book-cover.png.asset.json";
const ebookHero = ebookHeroAsset.url;
import { Toaster } from "@/components/ui/sonner";
import { submitLead, startPayfastCheckout } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carthage Digi Books — The Online Income Playbook" },
      {
        name: "description",
        content:
          "A practical, no-fluff playbook on how to make money online. From first rand to consistent monthly income. Secure checkout via PayFast.",
      },
      { property: "og:title", content: "Carthage Digi Books — The Online Income Playbook" },
      {
        property: "og:description",
        content: "A practical, no-fluff playbook on how to make money online.",
      },
    ],
  }),
  component: Landing,
});

const PRICE = "R150";
const BRAND = "Carthage Digi Books";

function Landing() {
  // Friendly toast when the user returns from PayFast.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchase = params.get("purchase");
    if (purchase === "success") {
      toast.success("Payment successful — your download will hit your inbox shortly.");
    } else if (purchase === "cancelled") {
      toast.error("Payment cancelled. You can try again whenever you're ready.");
    }
    if (purchase) {
      const url = new URL(window.location.href);
      url.searchParams.delete("purchase");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <Toaster theme="light" position="top-center" richColors />
      <Nav />
      <Hero />
      <Inside />
      <Checkout />
      <Newsletter />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
      <Link to="/" className="text-base font-medium tracking-tight md:text-lg">
        carthagedigibooks
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <Link to="/books" className="transition hover:text-foreground">Books</Link>
        <a href="#checkout" className="transition hover:text-foreground">Buy</a>
        <Link to="/about" className="transition hover:text-foreground">About</Link>
      </nav>
      <a
        href="#checkout"
        className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
      >
        Get the book
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pt-20 pb-28 md:grid-cols-[1.15fr_1fr] md:pt-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="accent-dot" /> New release · Digital ebook
          </div>
          <h1 className="text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Make money online.
            <br />
            <span className="text-muted-foreground">Without the noise.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground">
            A 180-page playbook on building real online income — no hype, no gurus, no
            get-rich-quick. Just the systems that actually work in 2026.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#checkout"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-base"
            >
              Get the playbook — {PRICE} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#inside"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              See what's inside
            </a>
          </div>
          <div className="mt-12 flex items-center gap-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span>★★★★★ 4.9</span>
            <span className="h-px w-8 bg-border" />
            <span>2,400+ readers</span>
            <span className="h-px w-8 bg-border" />
            <span>PDF + EPUB</span>
          </div>
        </div>

        <div className="relative">
          <img
            src={ebookHero}
            alt="Online Income Playbook ebook"
            className="mx-auto w-full max-w-md rounded-2xl"
            width={1024}
            height={1280}
          />
        </div>
      </div>
    </section>
  );
}

function Inside() {
  const items = [
    { icon: Target, title: "The 7 models that actually work", body: "Freelancing, productized services, info products, SaaS, affiliate, content, communities — mapped to your skills." },
    { icon: Zap, title: "Zero to first R10,000", body: "A 30-day plan to your first paying customer, even with no audience." },
    { icon: LineChart, title: "Scale to R50k–R200k/month", body: "Pricing, positioning, and the boring systems that make income predictable." },
    { icon: ShieldCheck, title: "Avoid the guru traps", body: "How to spot scams, vet courses, and protect your money in a noisy market." },
  ];
  return (
    <section id="inside" className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
      <div className="mb-14 flex items-end justify-between gap-8">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="accent-dot mr-2 align-middle" /> What's inside
          </p>
          <h2 className="text-4xl md:text-5xl">Frameworks, not fluff.</h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
          Every chapter ends with a checklist, a template, and one action to take this week.
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-card p-8 transition hover:bg-surface">
            <Icon className="mb-5 h-5 w-5" strokeWidth={1.5} />
            <h3 className="text-xl">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Checkout() {
  const fetchCheckout = useServerFn(startPayfastCheckout);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [payfast, setPayfast] = useState<{
    action: string;
    fields: Record<string, string>;
  } | null>(null);

  // Auto-submit the hidden PayFast form once we have the signed payload.
  useEffect(() => {
    if (payfast && formRef.current) formRef.current.submit();
  }, [payfast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetchCheckout({
        data: {
          full_name: String(form.get("full_name") ?? ""),
          email: String(form.get("email") ?? ""),
        },
      });
      toast.success("Redirecting you to PayFast…");
      setPayfast(res);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section id="checkout" className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
      <div className="mb-14 max-w-xl">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="accent-dot mr-2 align-middle" /> Get the book
        </p>
        <h2 className="text-4xl md:text-5xl">One payment. Lifetime access.</h2>
        <p className="mt-4 text-muted-foreground">
          Secure checkout via PayFast — card, instant EFT, SnapScan, or Zapper.
          Your download link is emailed the moment payment clears.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Order summary */}
        <div className="card-flat p-8">
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-5">
            <h3 className="text-lg font-medium">The Online Income Playbook</h3>
            <span className="font-mono text-3xl">{PRICE}</span>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "180 pages, PDF + EPUB",
              "Lifetime access — re-download anytime",
              "Free updates as the book evolves",
              "One purchase per email",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-2 rounded-lg bg-surface p-4 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span>
              Payments processed securely by <strong className="text-foreground">PayFast</strong>.
              We never see your card details.
            </span>
          </div>
        </div>

        {/* Checkout form */}
        <div className="card-flat p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-medium">Your details</h3>
            <Field name="full_name" label="Full name" placeholder="Jane Doe" required />
            <Field name="email" type="email" label="Email" placeholder="you@email.com" required />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full px-6 py-3.5 text-sm disabled:opacity-50"
            >
              {submitting ? "Redirecting…" : `Pay ${PRICE} with PayFast`}
            </button>
            <p className="text-center text-[0.7rem] text-muted-foreground">
              You'll be redirected to PayFast to complete your purchase.
            </p>
          </form>

          {/* Hidden auto-submit form to PayFast */}
          {payfast && (
            <form ref={formRef} action={payfast.action} method="POST" className="hidden">
              {Object.entries(payfast.fields).map(([k, v]) => (
                <input key={k} type="hidden" name={k} value={v} />
              ))}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-lg border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </div>
  );
}

function Newsletter() {
  const fetchLead = useServerFn(submitLead);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setSubmitting(true);
    try {
      await fetchLead({ data: { email, source: "newsletter" } });
      setDone(true);
      toast.success("You're on the list.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="card-flat flex flex-col items-center gap-6 p-10 text-center md:p-14">
        <Mail className="h-6 w-6" strokeWidth={1.5} />
        <div>
          <h2 className="text-3xl md:text-4xl">More books on the way.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Get notified when we drop new playbooks. No spam, ever.
          </p>
        </div>
        {done ? (
          <p className="font-mono text-sm">✓ Thanks — we'll be in touch.</p>
        ) : (
          <form onSubmit={handle} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              name="email"
              type="email"
              required
              maxLength={255}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-border bg-input/40 px-5 py-3 text-sm outline-none transition focus:border-foreground"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-3 text-sm disabled:opacity-50"
            >
              {submitting ? "…" : "Notify me"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
        <span className="font-mono text-sm tracking-tight opacity-70">carthagedigibooks</span>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/about" hash="refunds" className="hover:text-foreground">Refund policy</Link>
        </div>
        <p className="font-mono">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
      </div>
    </footer>
  );
}
