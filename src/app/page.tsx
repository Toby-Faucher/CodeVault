import UnderlineMotion from "../../components/underline-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6">
    Upload Your Code.<br />
    Share It <span className="relative inline-block">
      Anywhere
      <UnderlineMotion />
    </span>.
  </h1>
      </div>
    </main>
  );
}
