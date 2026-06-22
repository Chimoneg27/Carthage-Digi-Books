import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
  BookOpen,
  TrendingUp,
  Wallet,
  Copy,
} from "lucide-react";
import logo from "@/assets/logo.png";
import ebookHero from "@/assets/ebook-hero.jpg";
import { Toaster } from "@/components/ui/sonner";
import { submitLead, submitOrder } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moneymint — The Online Income Playbook" },
      {
        name: "description",
        content:
          "A practical, no-fluff playbook on how to make money online. From first dollar to consistent monthly income.",
      },
      { property: "og:title", content: "Moneymint — The Online Income Playbook" },
      {
        property: "og:description",
        content: "A practical, no-fluff playbook on how to make money online.",
      },
    ],
  }),
  component: Landing,
});

const BANK = {
  name: "Moneymint LLC",
  bank: "Your Bank Name",
  account: "0000 0000 0000 0000",
  routing: "000000000",
  iban: "GB00 BANK 0000 0000 0000 00",
  swift: "BANKGB22",
};

function Landing() {
  return (
    <main className="relative overflow-x-hidden">
      <Toaster theme="dark" position="top-center" richColors />
      <Nav />
      <Hero />
      <SocialProof />
      <WhatsInside />
      <Author />
      <Buy />
      <Newsletter />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
      <a href="#top" className="flex items-center gap-2">
        <img src={logo} alt="Moneymint" className="h-10 w-auto" width={120} height={40} />
      </a>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <a href="#inside" className="hover:text-foreground transition">The Book</a>
        <a href="#author" className="hover:text-foreground transition">Author</a>
        <a href="#buy" className="hover:text-foreground transition">Buy</a>
      </nav>
      <a
        href="#buy"
        className="btn-gold btn-gold-hover hidden rounded-full px-5 py-2 text-sm md:inline-flex"
      >
        Get the book
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.13_82_/_0.3)] bg-[oklch(0.82_0.13_82_/_0.06)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--gold-soft)]">
            <Sparkles className="h-3.5 w-3.5" /> New release · Digital ebook
          </div>
          <h1 className="text-5xl leading-[1.05] tracking-tight md:text-7xl">
            The quiet way to <span className="text-gold-gradient italic">make money</span> online.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            A 180-page playbook on building real online income — without hype, gurus, or
            get-rich-quick noise. Just the systems that actually work in 2026.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#buy"
              className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base"
            >
              Get the playbook — $29 <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> Instant PDF + EPUB
            </div>
          </div>
          <div className="mt-12 flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>★★★★★ 4.9 / 5</span>
            <span className="h-px w-10 bg-border" />
            <span>2,400+ readers</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.82_0.13_82_/_0.18)] blur-3xl" />
          <img
            src={ebookHero}
            alt="The Online Income Playbook ebook cover"
            className="mx-auto w-full max-w-md drop-shadow-[0_30px_60px_oklch(0_0_0_/_0.6)]"
            width={1024}
            height={1280}
          />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Forbes", "Indie Hackers", "Product Hunt", "Hacker News", "Medium"];
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="hairline mb-8" />
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        As featured in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[var(--gold-soft)]/60">
        {logos.map((l) => (
          <span key={l} className="font-display text-2xl tracking-wide">
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}

function WhatsInside() {
  const chapters = [
    { icon: BookOpen, title: "The 7 income models that actually work", body: "Map your skills to the right model — freelancing, productized services, info products, SaaS, affiliate, content, communities." },
    { icon: TrendingUp, title: "From $0 to first $1,000", body: "The exact 30-day plan to get your first paying customer, even with zero audience." },
    { icon: Wallet, title: "Scaling to consistent $5k–$20k/mo", body: "Pricing, positioning, and the boring systems that make income predictable." },
    { icon: ShieldCheck, title: "Avoiding the guru traps", body: "How to spot scams, vet courses, and protect your money in a noisy market." },
  ];
  return (
    <section id="inside" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)]">What's inside</p>
        <h2 className="text-4xl md:text-5xl">Frameworks, not fluff.</h2>
        <p className="mt-4 text-muted-foreground">
          Every chapter ends with a checklist, a template, and a single action to take this week.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {chapters.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-luxe p-8 transition hover:border-[oklch(0.82_0.13_82_/_0.4)]">
            <Icon className="mb-5 h-7 w-7 text-[var(--gold)]" />
            <h3 className="text-2xl">{title}</h3>
            <p className="mt-3 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Author() {
  return (
    <section id="author" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)]">From the author</p>
      <blockquote className="font-display text-3xl italic leading-snug md:text-4xl">
        “I spent six years figuring out what works and what wastes your time. This book is the
        version of itself I wish I had on day one.”
      </blockquote>
      <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
        — The Moneymint Team
      </p>
    </section>
  );
}

function Buy() {
  const fetchOrder = useServerFn(submitOrder);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await fetchOrder({
        data: {
          full_name: String(form.get("full_name") ?? ""),
          email: String(form.get("email") ?? ""),
          payment_reference: String(form.get("payment_reference") ?? ""),
          notes: String(form.get("notes") ?? ""),
        },
      });
      setDone(true);
      toast.success("Order received — we'll email your download within 12 hours.");
      router.invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }

  return (
    <section id="buy" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Get the book</p>
        <h2 className="text-4xl md:text-5xl">One simple payment.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Transfer $29 to the account below, then drop your details — we'll email your PDF + EPUB
          within 12 hours.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Bank details */}
        <div className="card-luxe p-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="text-2xl">Bank transfer</h3>
            <span className="text-3xl text-gold-gradient font-display">$29</span>
          </div>
          <dl className="space-y-4 text-sm">
            {[
              ["Account name", BANK.name],
              ["Bank", BANK.bank],
              ["Account number", BANK.account],
              ["Routing / Sort", BANK.routing],
              ["IBAN", BANK.iban],
              ["SWIFT / BIC", BANK.swift],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0">
                <dt className="text-muted-foreground uppercase tracking-wider text-[0.7rem]">{label}</dt>
                <dd className="flex items-center gap-2 font-mono">
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => copy(value, label)}
                    className="text-muted-foreground transition hover:text-[var(--gold)]"
                    aria-label={`Copy ${label}`}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded-lg bg-[oklch(0.82_0.13_82_/_0.08)] p-4 text-xs text-[var(--gold-soft)]">
            Use your <strong>email address</strong> as the payment reference, then fill the form so we
            can match your transfer.
          </p>
        </div>

        {/* Order form */}
        <div className="card-luxe p-8">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-14 w-14 text-[var(--gold)]" />
              <h3 className="text-2xl">Order received</h3>
              <p className="mt-3 max-w-xs text-muted-foreground">
                Once we confirm your transfer, your download links will hit your inbox within 12 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl">Confirm your order</h3>
              <Field name="full_name" label="Full name" placeholder="Jane Doe" required />
              <Field name="email" type="email" label="Email" placeholder="you@email.com" required />
              <Field
                name="payment_reference"
                label="Payment reference"
                placeholder="The reference you used"
                required
              />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Notes (optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-lg border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)]"
                  placeholder="Anything we should know?"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-gold btn-gold-hover w-full rounded-full px-6 py-3.5 text-base disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "I've sent the payment"}
              </button>
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
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-lg border border-border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-[var(--gold)]"
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
      <div className="card-luxe p-10 md:p-14 text-center">
        <Mail className="mx-auto mb-5 h-8 w-8 text-[var(--gold)]" />
        <h2 className="text-3xl md:text-4xl">More books on the way.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Get notified when we drop new playbooks. No spam, ever.
        </p>
        {done ? (
          <p className="mt-8 text-[var(--gold)]">Thanks — we'll be in touch.</p>
        ) : (
          <form onSubmit={handle} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              name="email"
              type="email"
              required
              maxLength={255}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-border bg-input/40 px-5 py-3 text-sm outline-none transition focus:border-[var(--gold)]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold btn-gold-hover rounded-full px-6 py-3 text-sm disabled:opacity-50"
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
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Moneymint" className="h-7 w-auto opacity-80" width={84} height={28} />
        </div>
        <p>© {new Date().getFullYear()} Moneymint. All rights reserved.</p>
      </div>
    </footer>
  );
}
