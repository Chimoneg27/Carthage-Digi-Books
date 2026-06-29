import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ebookHeroAsset from "@/assets/book-cover.png.asset.json";

const ebookHero = ebookHeroAsset.url;

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Carthage Digi Books" },
      {
        name: "description",
        content:
          "Browse the Carthage Digi Books catalogue — our current release and what's on the way.",
      },
      { property: "og:title", content: "Books — Carthage Digi Books" },
      {
        property: "og:description",
        content: "Our current release and upcoming digital playbooks.",
      },
      { property: "og:image", content: ebookHero },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return (
    <main className="relative overflow-x-hidden">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="accent-dot mr-2 align-middle" /> Catalogue
        </p>
        <h1 className="text-4xl tracking-tight md:text-6xl">Our books.</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          One release out today, more in the works. Every title ships as PDF +
          EPUB with free lifetime updates.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="card-flat grid items-center gap-10 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <img
            src={ebookHero}
            alt="The Online Income Playbook"
            className="mx-auto w-full max-w-xs rounded-xl"
            width={1024}
            height={1280}
          />
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              Available now · R150
            </p>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
              The Online Income Playbook
            </h2>
            <p className="mt-4 text-muted-foreground">
              A 180-page, no-fluff guide to building real online income — the
              seven models that actually work, a 30-day plan to your first
              R10,000, and the systems that make revenue predictable.
            </p>
            <Link
              to="/"
              hash="checkout"
              className="btn-primary mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm"
            >
              Get the book <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="border-t border-border pt-16 text-center">
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="accent-dot mr-2 align-middle" /> What's next
          </p>
          <h2 className="text-3xl tracking-tight md:text-5xl">
            More books coming soon.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            We're already writing the next titles. Join the list on the home
            page and we'll let you know the moment they drop.
          </p>
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
          <Link to="/books" className="hover:text-foreground">Books</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/about" hash="refunds" className="hover:text-foreground">Refund policy</Link>
        </div>
        <p className="font-mono">© {new Date().getFullYear()} Carthage Digi Books.</p>
      </div>
    </footer>
  );
}
