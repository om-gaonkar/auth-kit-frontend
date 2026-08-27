import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-primary-50">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-primary-700">
          Welcome
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Build something
          <span className="text-primary"> meaningful.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          A simple and modern platform designed to help you get things done
          faster and focus on what matters most.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/auth/login"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-primary-300 bg-surface px-4 text-sm font-medium text-primary-700 transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}
