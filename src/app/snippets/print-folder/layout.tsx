export default function PrintFolderLayout({ children }: { children: React.ReactNode }) {
  // Forcibly hide any fixed top-right promo for print-folder page only
  return (
    <>
      <style>{`
        .fixed.top-4.right-4, .try-code-vault-now {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
