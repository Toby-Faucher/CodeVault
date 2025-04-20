import Link from 'next/link';
import Image from 'next/image';

export default function AccountPage() {
  return (
    <>
      <div className="bg-base-200 border-base-300 w-full">
        <div className="navbar max-w-[1200px] mx-auto px-8 bg-base-100">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost normal-case text-lg flex items-center gap-2">
              <Image src="/static/logo.svg" alt="CodeVault Logo" height={40} width={85} priority />
              <span className="font-bold">CodeVault</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              <li><Link href="/snippets/public" className="btn btn-ghost btn-sm font-semibold">Public Snippets</Link></li>
              <li><Link href="/dashboard" className="btn btn-ghost btn-sm font-semibold">Dashboard</Link></li>
              <li><Link href="/account" className="btn btn-ghost btn-sm font-semibold">Account</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10">
  <h1 className="text-4xl font-bold mb-6">Coming Soon</h1>
  <p className="text-lg opacity-70">The Account page will be available in a future update.</p>
</main>
    </>
  );
}
