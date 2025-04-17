

"use client";
import UserBubbleLanding from "../../components/user-bubble-landing";
import ThemeSwitcher from "../../components/ThemeSwitcher";

export default function Home() {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="inline-block"><circle cx="12" cy="12" r="10" fill="url(#cvlogo)" /><defs><linearGradient id="cvlogo" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#818cf8"/></linearGradient></defs></svg>
            CodeVault
          </span>
        </div>
        <div className="hidden md:flex items-center font-bold gap-6 text-sm text-base-content/70 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a href="#how" className="hover:text-primary transition-colors cursor-pointer">How it works</a>
          <a href="#features" className="hover:text-primary transition-colors cursor-pointer">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors cursor-pointer">Pricing</a>
          <a href="#faq" className="hover:text-primary transition-colors cursor-pointer">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Switcher placed to the left of the user bubble */}
          <ThemeSwitcher />
          <UserBubbleLanding />
        </div>
      </nav>
      <main className="bg-base-200 pt-16">
        {/* Glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] md:w-[1600px] md:h-[900px] pointer-events-none z-0" aria-hidden="true">
          <div className="w-full h-full bg-gradient-to-br from-primary/60 via-pink-400/40 via-yellow-300/40 to-cyan-400/40 blur-[110px] opacity-60 animate-pulse transform skew-y-6 -rotate-6" />
        </div>
        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-6 md:px-12 lg:px-24">
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 text-base-content">Code Vault</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-base-content">Share & Organize Code Instantly</h2>
          <p className="text-lg max-w-xl font-medium text-base-content/80 mb-6 text-center">Upload, manage, and discover code snippets online.</p>

        </section>
        {/* How It Works Section */}
        <section id="how" className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16 min-h-[700px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">How It Works</h1>
          <p className="max-w-xl text-lg text-center text-base-content/80 mb-10">Code Vault makes it easy to upload, organize, and share your code snippets. Whether you want to keep your snippets private or share them with the world, Code Vault has you covered.</p>
          <ol className="w-full max-w-xl space-y-6">
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-primary">
              <h2 className="text-xl font-bold mb-1 text-primary">1. Sign Up & Sign In</h2>
              <p>Create an account or sign in to start managing your personal code vault.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-secondary">
              <h2 className="text-xl font-bold mb-1 text-secondary">2. Add & Organize Snippets</h2>
              <p>Upload code snippets, assign them to folders, and tag them for easy searching and organization.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-accent">
              <h2 className="text-xl font-bold mb-1 text-accent">3. Share & Discover</h2>
              <p>Share your snippets publicly, browse and fork public code, and collaborate with the community.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-success">
              <h2 className="text-xl font-bold mb-1 text-success">4. Edit & Manage</h2>
              <p>Edit, update, or delete your snippets at any time. Your vault is always in your control.</p>
            </li>
          </ol>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-base-content">Features</h1>
          <p className="max-w-xl text-lg text-center text-base-content/80 mb-10">Everything you need to organize, share, and discover code snippets efficiently.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {/* Feature 1 */}
            <div className="relative bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-md border-2 border-primary/40 flex flex-col items-start transition hover:scale-[1.03] shadow-lg animate-pop-up overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40">
              <div className="rounded-full p-2 mb-4">
                {/* Lock/Shield Icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5c2.485 0 4.5 2.015 4.5 4.5v2.25h1.5A1.5 1.5 0 0 1 19.5 12v6A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18v-6A1.5 1.5 0 0 1 6 10.5h1.5V9c0-2.485 2.015-4.5 4.5-4.5z"/><circle cx="12" cy="15.5" r="1.25"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-base-content">Secure Snippet Storage</h2>
              <p className="text-base-content mb-4">Keep your code snippets safe and accessible from anywhere, with robust privacy controls.</p>
              <a href="#" className="font-semibold text-base-content hover:underline mt-auto">Learn more &rarr;</a>
            </div>
            {/* Feature 2 */}
            <div className="relative bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-md border-2 border-primary/40 flex flex-col items-start transition hover:scale-[1.03] shadow-lg animate-pop-up overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40">
              <div className="rounded-full p-2 mb-4">
                {/* Share Icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-secondary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8.25V6a3 3 0 0 0-6 0v2.25M12 15v-6.75m0 0L8.25 9.75m3.75-1.5l3.75 1.5"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-base-content">Instant Sharing</h2>
              <p className="text-base-content mb-4">Share your snippets with a link, or keep them private—your choice, always.</p>
              <a href="#" className="font-semibold text-base-content hover:underline mt-auto">Learn more &rarr;</a>
            </div>
            {/* Feature 3 */}
            <div className="relative bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-md border-2 border-primary/40 flex flex-col items-start transition hover:scale-[1.03] shadow-lg animate-pop-up overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40">
              <div className="rounded-full p-2 mb-4">
                {/* Search Icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-accent"><circle cx="11" cy="11" r="6" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20l-3.5-3.5"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-base-content">Powerful Search</h2>
              <p className="text-base-content mb-4">Find code in seconds with full-text search, tags, and filters for all your snippets.</p>
              <a href="#" className="font-semibold text-base-content hover:underline mt-auto">Learn more &rarr;</a>
            </div>
            {/* Feature 4 */}
            <div className="relative bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-md border-2 border-primary/40 flex flex-col items-start transition hover:scale-[1.03] shadow-lg animate-pop-up overflow-visible before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-4/5 before:h-7 before:rounded-full before:blur-xl before:opacity-70 before:-z-10 before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40">
              <div className="rounded-full p-2 mb-4">
                {/* Users/Community Icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-success"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20v-2a4 4 0 0 0-8 0v2M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 8v-2a6 6 0 0 0-12 0v2"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-base-content">Community Collaboration</h2>
              <p className="text-base-content mb-4">Fork, comment, and collaborate on public snippets with the CodeVault community.</p>
              <a href="#" className="font-semibold text-base-content hover:underline mt-auto">Learn more &rarr;</a>
            </div>
          </div>
        </section>

        
        {/* Pricing Section */}
        <section id="pricing" className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-base-content">Pricing</h1>
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
              <button className="btn btn-primary btn-block">Get Started</button>
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
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-base-content">Frequently Asked Questions</h1>
          <p className="max-w-xl text-lg text-center text-base-content/80 mb-10">Find answers to the most common questions about CodeVault.</p>
          <div className="w-full max-w-2xl mx-auto space-y-4">
            {/* FAQ Accordion */}
            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
              <input type="checkbox" id="faq1" />
              <div className="collapse-title text-lg font-semibold text-base-content">
                What is CodeVault?
              </div>
              <div className="collapse-content text-base-content/80">
                CodeVault is a platform for storing, organizing, and sharing code snippets online. It helps you manage your code library and collaborate with others.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
              <input type="checkbox" id="faq2" />
              <div className="collapse-title text-lg font-semibold text-base-content">
                Is CodeVault free to use?
              </div>
              <div className="collapse-content text-base-content/80">
                Yes! CodeVault offers a generous free plan. You can upgrade for more features and storage as your needs grow.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
              <input type="checkbox" id="faq3" />
              <div className="collapse-title text-lg font-semibold text-base-content">
                Can I keep my snippets private?
              </div>
              <div className="collapse-content text-base-content/80">
                Absolutely. You control the visibility of every snippet—keep them private or share them publicly with a link.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
              <input type="checkbox" id="faq4" />
              <div className="collapse-title text-lg font-semibold text-base-content">
                How do I organize my code snippets?
              </div>
              <div className="collapse-content text-base-content/80">
                Organize snippets with folders, tags, and search. Easily filter and find what you need, fast.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
              <input type="checkbox" id="faq5" />
              <div className="collapse-title text-lg font-semibold text-base-content">
                Can I collaborate with others?
              </div>
              <div className="collapse-content text-base-content/80">
                Yes! Share snippets, fork public code, and comment to collaborate with the CodeVault community.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

