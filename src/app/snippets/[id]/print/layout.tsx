export default function PrintLayout({ children }: { children: React.ReactNode }) {
  // No UserBubble, no extra wrappers, just the content for print
  return <>{children}</>;
}
