"use client";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center pt-24 pb-16 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4 text-base-content">Pricing</h1>
      <p className="max-w-xl text-lg text-center text-base-content/80 mb-12">
        Simple, transparent pricing for every developer. Start for free, upgrade as you grow.
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="relative bg-base-100 rounded-2xl p-8 shadow-md border-2 border-primary/40 flex flex-col items-center overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-60 before:-z-10 before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40">
          <h2 className="text-2xl font-bold mb-2 text-base-content">Free</h2>
          <div className="text-4xl font-extrabold mb-2 text-primary">$0</div>
          <p className="text-base-content/80 mb-6 text-center">Perfect for individuals getting started.</p>
<ul className="mb-8 space-y-2 text-base-content/80 text-left w-full max-w-xs mx-auto">
  <li>✔️ 50 snippets</li>
  <li>✔️ 3 folders</li>
  <li>✔️ Public & private snippets</li>
  <li>✔️ Community access</li>
</ul>
<div className="flex-grow" />
<button className="btn btn-primary btn-block mt-2">Get Started</button>
        </div>
        {/* Pro Plan */}
        <div className="relative bg-base-100 rounded-2xl p-8 shadow-md border-2 border-secondary/40 flex flex-col items-center overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-secondary/40 before:via-primary/40 before:to-accent/40">
          <h2 className="text-2xl font-bold mb-2 text-base-content">Pro</h2>
          <div className="text-4xl font-extrabold mb-2 text-secondary">$8<span className="text-base-content/60 text-lg font-normal">/mo</span></div>
          <p className="text-base-content/80 mb-6 text-center">For power users who need more.</p>
          <ul className="mb-8 space-y-2 text-base-content/80 text-left w-full max-w-xs mx-auto">
            <li>✔️ Unlimited snippets</li>
            <li>✔️ Unlimited folders</li>
            <li>✔️ Priority support</li>
            <li>✔️ Early access to new features</li>
          </ul>
          <button className="btn btn-secondary btn-block">Upgrade</button>
        </div>
        {/* Team Plan */}
        <div className="relative bg-base-100 rounded-2xl p-8 shadow-md border-2 border-accent/40 flex flex-col items-center overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-accent/40 before:via-primary/40 before:to-secondary/40">
          <h2 className="text-2xl font-bold mb-2 text-base-content">Team</h2>
          <div className="text-4xl font-extrabold mb-2 text-accent">$24<span className="text-base-content/60 text-lg font-normal">/mo</span></div>
          <p className="text-base-content/80 mb-6 text-center">Best for teams & organizations.</p>
          <ul className="mb-8 space-y-2 text-base-content/80 text-left w-full max-w-xs mx-auto">
            <li>✔️ Everything in Pro</li>
            <li>✔️ Team collaboration</li>
            <li>✔️ Organization management</li>
            <li>✔️ Advanced permissions</li>
          </ul>
          <button className="btn btn-accent btn-block">Contact Sales</button>
        </div>
      </div>
    </main>
  );
}
