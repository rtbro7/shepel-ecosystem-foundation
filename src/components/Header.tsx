import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header({ activePath }: { activePath?: string }) {
  const link = (href: string, label: string) => (
    <a
      href={href}
      className={`hover:text-accent ${activePath === href ? "text-accent border-b-2 border-accent pb-1" : ""}`}
    >
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <div className="flex h-7 w-[150px] items-center justify-center rounded-md bg-[repeating-linear-gradient(45deg,#ddd,#ddd_6px,#eee_6px,#eee_12px)] text-[11px] text-neutral-500">
          ЛОГОТИП
        </div>
        <nav className="hidden gap-7 text-sm font-semibold md:flex">
          {link("/about", "О нас")}
          {link("/catalog", "Объекты")}
          {link("/contacts", "Контакты")}
        </nav>
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden sm:inline-flex">Получить подборку</Button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 md:hidden" aria-label="Меню">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
