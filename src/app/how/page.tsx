export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center pt-24 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">How It Works</h1>
      <p className="max-w-2xl text-lg text-center text-base-content/80 mb-10">
        Code Vault makes it easy to upload, organize, and share your code snippets. Whether you want to keep your snippets private or share them with the world, Code Vault has you covered.
      </p>
      <ol className="max-w-2xl w-full mx-auto space-y-8">
        <li className="bg-base-100 rounded-xl p-6 shadow border-l-4 border-primary">
          <h2 className="text-2xl font-bold mb-2 text-primary">1. Sign Up & Sign In</h2>
          <p>Create an account or sign in to start managing your personal code vault.</p>
        </li>
        <li className="bg-base-100 rounded-xl p-6 shadow border-l-4 border-secondary">
          <h2 className="text-2xl font-bold mb-2 text-secondary">2. Add & Organize Snippets</h2>
          <p>Upload code snippets, assign them to folders, and tag them for easy searching and organization.</p>
        </li>
        <li className="bg-base-100 rounded-xl p-6 shadow border-l-4 border-accent">
          <h2 className="text-2xl font-bold mb-2 text-accent">3. Share & Discover</h2>
          <p>Share your snippets publicly, browse and fork public code, and collaborate with the community.</p>
        </li>
        <li className="bg-base-100 rounded-xl p-6 shadow border-l-4 border-success">
          <h2 className="text-2xl font-bold mb-2 text-success">4. Edit & Manage</h2>
          <p>Edit, update, or delete your snippets at any time. Your vault is always in your control.</p>
        </li>
      </ol>
    </main>
  );
}
