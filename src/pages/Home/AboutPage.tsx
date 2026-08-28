import { Link } from "react-router";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-primary-50">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-primary-700">
            About Auth Kit
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Authentication made
            <span className="text-primary"> simple.</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-muted sm:text-lg">
            Auth Kit is a simple and reliable authentication system designed to
            help developers build secure applications without unnecessary
            complexity.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-primary-200 bg-surface p-6">
            <h2 className="text-lg font-semibold text-foreground">Simple</h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              A clean and straightforward authentication experience that is easy
              to integrate and use.
            </p>
          </div>

          <div className="rounded-lg border border-primary-200 bg-surface p-6">
            <h2 className="text-lg font-semibold text-foreground">Secure</h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Built with security and reliability in mind to help protect users
              and their data.
            </p>
          </div>

          <div className="rounded-lg border border-primary-200 bg-surface p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Developer Friendly
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Designed to reduce repetitive authentication work so you can focus
              on building your application.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to get started?
          </h2>

          <p className="mt-3 text-muted">
            Create an account and start building with Auth Kit.
          </p>

          <Link
            to="/auth/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
