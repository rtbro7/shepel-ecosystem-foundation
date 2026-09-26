import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useParallax } from "@/hooks/useParallax"
import { useTilt } from "@/hooks/useTilt"
import { Counter } from "@/components/Counter"
import { Plus, Palmtree, Building2, Home, Ruler, Check } from "lucide-react"
import { GradientSparkle } from "@/components/GradientSparkle"

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

const IMG = {
  villaPool: "photo-1759372945658-1e9f56e751bd",
  livingChandelier: "photo-1758448755856-01d3add0177b",
  livingModern: "photo-1746549859958-faa2558a765c",
  housePalm: "photo-1719887805632-de5be825f72b",
  housePoolGreen: "photo-1721989519334-40923a0ee1c0",
  couchLiving: "photo-1728048756806-6832d2f5054c",
  poolLounge: "photo-1596178067639-5c6e68aea6dc",
  poolUmbrella: "photo-1692736933760-8a8a9b8c1b6f",
  poolTable: "photo-1721989518229-3e84837fc398",
  poolTerrace: "photo-1543489822-c49534f3271f",
  poolView: "photo-1651108066220-f61c22fc281f",
}

const CATEGORIES = [
  { icon: Palmtree, title: "Виллы", sub: "от застройщика и вторичка" },
  { icon: Building2, title: "Кондоминиумы", sub: "апартаменты и пентхаусы" },
  { icon: Home, title: "Таунхаусы", sub: "компромисс цены и площади" },
  { icon: Ruler, title: "Земля", sub: "участки под застройку" },
]

const AREAS = ["Все районы", "Бангтао / Лагуна", "Раваи / Найхарн", "Патонг / Кату", "Май Кхао / Сирей", "Пхукет-таун"]

const OBJECTS = [
  { id: IMG.villaPool, title: "Вилла 3BR, Бангтао", sub: "Готова к заселению, бассейн, 5 мин до пляжа", price: "от 18 500 000 ₽" },
  { id: IMG.livingModern, title: "Кондо 1BR, Раваи", sub: "Сдача 2027, рассрочка от застройщика", price: "от 6 200 000 ₽" },
  { id: IMG.poolTable, title: "Таунхаус, Кату", sub: "Вторичка, готовый арендный поток", price: "от 9 800 000 ₽" },
]

const UPDATES = [
  ["Сен 2026", "+42 новых объекта в Бангтао"],
  ["Авг 2026", "Обновлены остатки Laya Resort"],
  ["Авг 2026", "Новый район: Май Кхао"],
  ["Июл 2026", "Видео-обзоры на карточках объектов"],
]

const FAQ = [
  ["Цены в каталоге — это то, что я заплачу?", "Цена — ориентир на момент публикации. Финальная стоимость и остатки уточняются у застройщика перед сделкой."],
  ["Можно ли смотреть объекты без визита?", "Да — видео-обзор, план и подборка похожих присылаем в WhatsApp/Telegram."],
  ["Что значит значок «Проверено агентством»?", "Мы лично сверили статус стройки и прайс с застройщиком, а не скопировали объявление с сайта."],
]

export default function Catalog() {
  const parallax = useParallax()
  const badgeParallax = useParallax(-0.06, 40)
  const tilt = useTilt<HTMLDivElement>(6)
  const [area, setArea] = useState(AREAS[0])
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="overflow-x-hidden bg-paper text-ink">
      <Header activePath="/catalog" />

      <section className="pt-3.5">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative min-h-[520px] overflow-hidden rounded-[32px]">
            <img
              src={img(IMG.housePoolGreen, 1600)}
              alt=""
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
              style={{ transform: `scale(1.02) translateY(${parallax}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className="absolute right-[8%] top-[22%] hidden max-w-[230px] cursor-default rounded-2xl bg-white p-4 text-sm font-semibold leading-snug text-ink shadow-2xl transition-transform duration-200 sm:block"
              style={{ transform: `translateY(${badgeParallax}px)` }}
            >
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-accent">
                <GradientSparkle size={12} /> Подбор за 30 сек
              </div>
              Вилла 3BR, бюджет 15–20М, готова к заселению
            </div>
            <div className="relative z-10 w-full p-9 pb-11 text-white">
              <p className="mb-2 text-[13px] font-bold uppercase tracking-wide opacity-90">Каталог объектов</p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-[56px]">Найди свой дом<br />на Пхукете</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section-orange px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-[700px] text-center">
            <h2 className="mb-3 text-3xl font-bold">Тысячи объектов, один каталог</h2>
            <p className="text-base leading-relaxed text-muted">
              Виллы, кондо, таунхаусы — от застройщиков и на вторичке. Живые остатки, реальные цены, фильтр по бюджету и району, без «висяков».
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="rounded-2xl bg-white p-5 text-center shadow-[0_8px_26px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.07]">
                  <Icon size={19} />
                </div>
                <h4 className="mb-1 text-sm font-semibold">{title}</h4>
                <p className="text-xs text-muted">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-slate px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#8a6425] text-white">
              <Check size={22} />
            </div>
            <div>
              <h3 className="mb-1.5 text-lg font-semibold">Проверено агентством</h3>
              <p className="text-base leading-relaxed text-muted">
                Каждый объект — с подтверждённым статусом стройки и прайсом застройщика. Значок «Проверено» = мы лично сверили документы и остатки.
              </p>
              <div className="mt-3 flex gap-6">
                <div>
                  <div className="text-xl font-bold"><Counter to={1240} suffix="+" /></div>
                  <div className="text-xs text-muted">объектов в базе</div>
                </div>
                <div>
                  <div className="text-xl font-bold"><Counter to={98} suffix="%" /></div>
                  <div className="text-xs text-muted">точность цены</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section-slate px-5 pb-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Смотри по районам</p>
          <h3 className="mb-4 text-xl font-bold">Категории по локации и назначению</h3>
          <div className="flex flex-wrap gap-2.5">
            {AREAS.map((a) => (
              <button
                key={a}
                onClick={() => setArea(a)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${a === area ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-slate px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Топ подборка</p>
          <h3 className="mb-5 text-xl font-bold">Актуальные объекты недели</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTS.map((o) => (
              <div key={o.title} className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_26px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1.5 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img src={img(o.id, 800)} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4.5">
                  <h4 className="mb-1.5 text-[15px] font-semibold">{o.title}</h4>
                  <p className="mb-2.5 text-[13px] leading-relaxed text-muted">{o.sub}</p>
                  <div className="text-sm font-extrabold">{o.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-teal px-5 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide">Как мы проверяем</p>
            <h2 className="mb-3.5 text-3xl font-bold">Матрица доверия к источнику</h2>
            <p className="text-base leading-relaxed text-white/80">
              Прайс застройщика — правда. Всё найденное в интернете помечается «ИИ-поиск» и не выдаётся как факт.
            </p>
            <a href="#" className="mt-4 inline-flex items-center gap-1.5 border-b-2 border-white pb-0.5 text-sm font-bold">Как устроена проверка →</a>
          </div>
          <img src={img(IMG.couchLiving, 800)} alt="" className="aspect-[4/3] rounded-2xl object-cover brightness-75" />
        </div>
      </section>

      <section className="bg-section-indigo px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Новое в каталоге</p>
          <h3 className="mb-5 text-xl font-bold">Последние обновления</h3>
          <div className="flex gap-4 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {UPDATES.map(([date, title]) => (
              <div key={title} className="w-[260px] flex-none rounded-xl bg-white p-4 shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
                <div className="text-[11px] font-extrabold uppercase text-accent">{date}</div>
                <h4 className="mt-1.5 text-sm font-semibold">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-indigo px-5 pb-16">
        <div className="mx-auto max-w-[760px]">
          <h3 className="mb-4 text-xl font-bold">Частые вопросы</h3>
          {FAQ.map(([q, a], i) => (
            <div key={q} className="border-t border-neutral-300 py-4.5 last:border-b">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="flex w-full items-center justify-between text-left text-[15px] font-bold"
              >
                <span>{q}</span>
                <Plus size={16} className={`transition-transform ${openFaq === i ? "rotate-45" : ""}`} />
              </button>
              {openFaq === i && <p className="mt-2.5 text-sm leading-relaxed text-muted">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer notes={["¹ Заглушка сноски — цены ориентировочные, актуальность уточняйте у менеджера."]} />
    </div>
  )
}
