export function Footer({ notes }: { notes?: string[] }) {
  return (
    <footer className="bg-neutral-900 px-5 py-12 text-xs text-white/70">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap gap-5">
          <a href="/about" className="font-semibold text-white">О компании</a>
          <a href="/catalog" className="font-semibold text-white">Каталог</a>
          <a href="#" className="font-semibold text-white">Политика конфиденциальности</a>
          <a href="#" className="font-semibold text-white">Условия</a>
          <a href="/contacts" className="font-semibold text-white">Контакты</a>
        </div>
        {notes && (
          <ul className="list-none space-y-2.5 p-0">
            {notes.map((n, i) => (
              <li key={i} className="leading-relaxed">{n}</li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
