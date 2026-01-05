export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-[var(--color-text-secondary)] text-sm">
          © {new Date().getFullYear()} Jiann Lu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
