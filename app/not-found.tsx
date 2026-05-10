export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-accent mb-6">Page not found</p>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6">
          Oops — we couldn’t find that page.
        </h1>
        <p className="text-lg text-foreground/70 mb-10">
          The page you requested could not be found.
        </p>
      </div>
    </main>
  )
}
