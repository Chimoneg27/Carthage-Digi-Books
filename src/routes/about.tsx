import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Carthage Digi Books" },
      {
        name: "description",
        content:
          "About Carthage Digi Books, frequently asked questions, and our 24-hour refund policy.",
      },
      { property: "og:title", content: "About — Carthage Digi Books" },
      {
        property: "og:description",
        content: "Who we are, FAQs, and our refund policy.",
      },
    ],
  }),
  component: AboutPage,
});

const FAQS = [
  {
    q: "What format is the book delivered in?",
    a: "You'll receive a PDF and EPUB download link via email the moment your PayFast payment clears.",
  },
  {
    q: "How long does delivery take?",
    a: "Instant. As soon as PayFast confirms the payment, the download link is emailed to the address you used at checkout.",
  },
  {
    q: "Can I buy the book more than once?",
    a: "No — purchases are limited to one per email address. You get lifetime access and free updates with your single purchase.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All checkouts run through PayFast — card, instant EFT, SnapScan, and Zapper are all supported.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — within 24 hours of purchase. See our refund policy below for the details.",
  },
  {
    q: "I didn't get my download email — what now?",
    a: "Check your spam folder first. If it's still missing, email us at hello@carthagedigibooks.com with the email you used at checkout and we'll resend it.",
  },
];

function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="accent-dot mr-2 align-middle" /> About
        </p>
        <h1 className="text-4xl tracking-tight md:text-6xl">Practical books for people building real income online.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Carthage Digi Books is an independent publisher of no-fluff digital
          playbooks. We write the books we wish we'd had when we started — short
          on hype, long on systems that actually work.
        </p>
        <p className="mt-4 text-muted-foreground">
          Every title is shipped as a clean PDF and EPUB, delivered instantly
          after checkout, with free lifetime updates.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-8 text-3xl md:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section id="refunds" className="mx-auto max-w-3xl px-6 pb-24 scroll-mt-24">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="accent-dot mr-2 align-middle" /> Refund Policy
        </p>
        <h2 className="text-3xl tracking-tight md:text-4xl">Refund policy</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          We want you to feel confident buying from Carthage Digi Books. If the
          book isn't what you expected, you can request a full refund within
          <strong className="text-foreground"> 24 hours of purchase</strong>.
        </p>

        <div className="mt-10 space-y-10 text-muted-foreground">
          <div>
            <h3 className="mb-3 text-xl text-foreground">Eligibility</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Refund requests must be submitted within 24 hours of your purchase.</li>
              <li>The request must come from the same email address used at checkout.</li>
              <li>Requests received after the 24-hour window cannot be honoured — all sales become final.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl text-foreground">How to request a refund</h3>
            <p>
              Email <a href="mailto:hello@carthagedigibooks.com" className="text-foreground underline underline-offset-4">hello@carthagedigibooks.com</a> with
              the subject line "Refund request" and include the email address you
              used at checkout. We'll process the refund through PayFast within
              3–5 business days.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xl text-foreground">Why a 24-hour window?</h3>
            <p>
              Our books are digital products delivered instantly. The 24-hour
              window gives you time to skim the material and decide if it's the
              right fit, while protecting us from abuse of unlimited returns on
              downloadable files.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteNav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
      <Link to="/" className="text-base font-medium tracking-tight md:text-lg">
        carthagedigibooks
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <Link to="/books" className="transition hover:text-foreground" activeOptions={{ exact: true }}>Books</Link>
        <Link to="/" hash="checkout" className="transition hover:text-foreground">Buy</Link>
        <Link to="/about" className="transition hover:text-foreground" activeOptions={{ exact: true }}>About</Link>
      </nav>
      <Link to="/" hash="checkout" className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-sm">
        Get the book
      </Link>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
        <span className="font-mono text-sm tracking-tight opacity-70">carthagedigibooks</span>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/about" hash="refunds" className="hover:text-foreground">Refund policy</Link>
        </div>
        <p className="font-mono">© {new Date().getFullYear()} Carthage Digi Books.</p>
      </div>
    </footer>
  );
}
