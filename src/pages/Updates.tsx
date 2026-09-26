import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useReveal } from "@/hooks/useReveal"
import { useParallax } from "@/hooks/useParallax"
import { useTilt } from "@/hooks/useTilt"
import { Counter } from "@/components/Counter"
import { TrendingDown, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
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

const HERO_SLIDES = [
  { id: IMG.villaPool, title: ["Новые фишки,", "которые меняют всё"] },
  { id: IMG.poolTerrace, title: ["Твой дом на Пхукете,", "на шаг ближе"] },
]

const NOTIFICATIONS = [
  { Icon: TrendingDown, title: "Цена снижена", sub: "Вилла 3BR, Бангтао", price: "18.5 → 16.3М" },
  { Icon: CheckCircle2, title: "Остатки обновлены", sub: "Laya Resort, блок B", price: null as string | null },
  { Icon: MessageCircle, title: "Ответ менеджера", sub: "По заявке #4521", price: null as string | null },
]

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 scale-100 opacity-100 blur-none" : "translate-y-8 scale-[0.97] opacity-0 blur-sm"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Carousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector(":scope > *") as HTMLElement | null
    const step = card ? card.getBoundingClientRect().width + 20 : 300
    track.scrollBy({ left: dir * step, behavior: "smooth" })
  }
  return (
    <div className="relative mt-8">
      <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <div className="mt-4 flex justify-end gap-2.5">
        <button onClick={() => scroll(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15" aria-label="Назад"><ChevronLeft size={16} /></button>
        <button onClick={() => scroll(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15" aria-label="Вперёд"><ChevronRight size={16} /></button>
      </div>
    </div>
  )
}

export default function Updates() {
  const [promoShown, setPromoShown] = useState(false)
  const [promoClosed, setPromoClosed] = useState(false)
  const [videoPaused, setVideoPaused] = useState(false)
  const [slide, setSlide] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const parallax = useParallax()
  const badgeParallax = useParallax(-0.06, 40)
  const tilt = useTilt<HTMLDivElement>(6)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (promoClosed) return
      const h = heroRef.current?.offsetHeight ?? 600
      setPromoShown(window.scrollY > h * 0.7)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [promoClosed])

  return (
    <div className="overflow-x-hidden bg-paper text-ink">
      <div
        className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-4 bg-ink px-5 py-3 text-sm text-white transition-transform duration-300 ${promoShown && !promoClosed ? "translate-y-0" : "-translate-y-[120%]"}`}
      >
        <span>Shepel Property — новый заход на таргет. Смотри объекты.</span>
        <Button size="sm" variant="default">Смотреть →</Button>
        <button onClick={() => setPromoClosed(true)} className="text-lg text-white/70" aria-label="Закрыть">×</button>
      </div>

      <Header />

      <section className="pt-3.5">
        <div className="mx-auto max-w-6xl px-5">
          <div ref={heroRef} className="relative min-h-[640px] overflow-hidden rounded-[32px]">
            {HERO_SLIDES.map((s, i) => (
              <img
                key={s.id}
                src={img(s.id, 1600)}
                alt=""
                className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-1000"
                style={{ transform: `scale(1.02) translateY(${parallax}px)`, opacity: slide === i ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className="absolute right-[8%] top-1/3 hidden max-w-[230px] cursor-default rounded-2xl bg-white p-4 text-sm font-semibold leading-snug text-ink shadow-2xl transition-transform duration-200 sm:block"
              style={{ transform: `translateY(${badgeParallax}px)` }}
            >
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-accent">
                <GradientSparkle size={12} /> Настя, ИИ-бот
              </div>
              Покажи виллы у моря до 20 млн ₽ с бассейном
            </div>
            <div className="relative z-10 w-full p-9 pb-11 text-white">
              <div className="mb-4 flex gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSlide(i)}
                    aria-label={`Слайд ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${slide === i ? "w-5 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
                  />
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
                {HERO_SLIDES[slide].title[0]}<br />{HERO_SLIDES[slide].title[1]}
              </h1>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
            <div>
              <div className="text-2xl font-bold"><Counter to={1240} suffix="+" /></div>
              <div className="text-xs text-muted">проверенных объектов</div>
            </div>
            <div>
              <div className="text-2xl font-bold"><Counter to={98} suffix="%" /></div>
              <div className="text-xs text-muted">точность цены</div>
            </div>
            <div>
              <div className="text-2xl font-bold"><Counter to={12} suffix=" мин" /></div>
              <div className="text-xs text-muted">средний ответ менеджера</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section-orange px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Осень 2026</p>
            <h2 className="mb-3.5 text-3xl font-bold tracking-tight sm:text-4xl">Обновление Shepel Property</h2>
            <p className="max-w-xl text-base leading-relaxed text-muted">
              Новые инструменты помогают быстрее находить объект под бюджет, точнее понимать реальную стоимость и получать ответ от менеджера в разы быстрее.
            </p>
          </Reveal>
          <Reveal delay={150} className="rounded-3xl bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <h3 className="mb-3.5 text-lg font-semibold">Главное</h3>
            {[
              ["Смотри объекты по-новому", "#objects-look"],
              ["Настрой поиск под себя", "#personalize"],
              ["Управляй заявкой в один клик", "#control"],
              ["Открой Shepel Premium", "#premium"],
            ].map(([label, href]) => (
              <div key={href} className="flex items-center justify-between border-t border-neutral-200 py-3.5 text-sm font-bold first:border-t-0">
                <a href={href}>{label}</a>
                <span className="opacity-50">→</span>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 text-xs text-muted">
              <span>⏱ 5 мин чтения</span>
              <button className="rounded-full border border-neutral-300 px-3.5 py-2 text-xs font-bold">Поделиться</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-section-orange px-5 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3.5 md:grid-cols-3 md:grid-rows-2">
          {[
            [IMG.housePalm, "Вилла, Бангтао", "col-span-2 row-span-2 md:col-span-2"],
            [IMG.housePoolGreen, "Бассейн виллы", "col-span-1"],
            [IMG.poolUmbrella, "Терраса у бассейна", "col-span-1"],
          ].map(([id, cap, span], i) => (
            <Reveal key={id} delay={i * 150} className={`group relative overflow-hidden rounded-2xl shadow-lg ${span}`}>
              <img
                src={img(id, 900)}
                alt=""
                className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 md:aspect-auto"
              />
              <span className="absolute bottom-2.5 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white">{cap}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <div id="objects-look" />
      <section className="bg-section-slate px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-[760px]">
            <h2 className="mb-3.5 text-3xl font-bold sm:text-4xl">Больше не листай десятки фото</h2>
            <p className="text-base leading-relaxed text-muted">
              Карточки объектов теперь работают вместе: планировка, вид из окна, инфраструктура района и реальная цена — на одном экране, без прыжков между вкладками.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-section-slate px-5 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <Reveal>
            <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Умные превью карточек</p>
            <h3 className="mb-3.5 text-xl font-bold">Смотри детали, не открывая карточку</h3>
            <p className="text-base leading-relaxed text-muted">
              Превью показывают то, что важно: свежие фото, статус бронирования и разницу в цене за последний месяц — коротким анимированным роликом прямо в ленте.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
              <img
                src={img(IMG.livingChandelier, 900)}
                alt=""
                className={`h-full w-full object-cover ${videoPaused ? "" : "animate-kenburns"}`}
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white">видео-заглушка · авто-зум в цикле</span>
              <button
                onClick={() => setVideoPaused((v) => !v)}
                className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg"
                aria-label="Пауза/плей"
              >
                {videoPaused ? "▶" : "⏸"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-section-slate px-5 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <div className="max-w-[360px] rounded-2xl bg-white p-4 shadow-xl">
              {NOTIFICATIONS.map(({ Icon, title, sub, price }) => (
                <div key={title} className="flex items-start gap-3 border-t border-neutral-100 py-2.5 first:border-t-0">
                  <div className="flex h-9.5 w-9.5 flex-none items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-[#8a6425] text-white">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <b className="block text-[13px]">{title}</b>
                    <span className="text-xs text-muted">{sub}</span>
                  </div>
                  {price && <div className="ml-auto whitespace-nowrap text-xs font-extrabold text-emerald-700">{price}</div>}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="order-1 md:order-2">
            <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Точные уведомления</p>
            <h3 className="mb-3.5 text-xl font-bold">Узнавай о снижении цены первым</h3>
            <p className="text-base leading-relaxed text-muted">
              Уведомление приходит с готовым сравнением: было / стало, и сразу ведёт к менеджеру, если объект подходит под твой бюджет.
            </p>
            <a href="#" className="mt-4 inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 text-sm font-bold">Как это настроить →</a>
          </Reveal>
        </div>
      </section>

      <div id="personalize" />
      <section className="bg-section-teal px-5 py-16 text-white">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl">✦</div>
          <h2 className="mb-3.5 text-3xl font-bold sm:text-4xl">Поиск, который подстраивается под тебя</h2>
          <p className="text-base leading-relaxed text-white/80">
            Shepel Property учится на твоих предпочтениях — бюджет, район, тип объекта и стиль общения — чтобы каждый следующий подбор был точнее.
          </p>
        </div>
      </section>

      <section className="bg-section-teal px-5 pb-16 text-white">
        <div className="mx-auto max-w-6xl">
          <Carousel>
            {[
              [IMG.couchLiving, "Подбор, который понимает контекст", "Голосовой помощник (заглушка) запоминает твой бюджет и не переспрашивает."],
              [IMG.poolTable, "Запоминает детали заявки", "Можно попросить запомнить контакты и дату просмотра."],
              [IMG.poolView, "Фильтр по языку общения", "Настрой, на каком языке удобно получать ответы."],
            ].map(([id, title, text]) => (
              <div key={id} className="group w-[82%] flex-none snap-start overflow-hidden rounded-2xl bg-white/8 sm:w-[60%] lg:w-[32%]">
                <div className="overflow-hidden">
                  <img src={img(id, 700)} alt="" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h4 className="mb-2.5 text-base font-semibold">{title}</h4>
                  <p className="text-[13px] leading-relaxed opacity-85">{text}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <div id="control" />
      <div id="premium" />
      <section className="bg-section-violet px-5 py-20 text-white">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl">★</div>
          <h2 className="mb-3.5 text-3xl font-bold sm:text-4xl">Заходи дальше с Shepel Premium</h2>
          <p className="text-base leading-relaxed text-white/80">
            Умный поиск — только начало. Premium открывает персонального менеджера, приоритетный показ и расширенную аналитику цен по району.
          </p>
          <Button variant="default" className="mt-5">Узнать про Premium</Button>
        </div>
      </section>

      <section className="bg-section-indigo px-5 py-16 text-center">
        <h2 className="mx-auto mb-3 max-w-[700px] text-3xl font-bold">Полный список новых функций</h2>
        <p className="mx-auto mb-5 max-w-[600px] text-base text-muted">Загляни в наш блог — там подробно расписано всё, что вошло в это обновление.</p>
        <a href="#" className="inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 text-sm font-bold">Читать блог →</a>
      </section>

      <section className="bg-section-indigo px-5 pb-4 text-center">
        <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent">Смотри дальше</p>
        <h2 className="mx-auto max-w-[700px] text-3xl font-bold">Новые функции, объекты и идеи для покупки</h2>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <Carousel>
            {[
              [IMG.housePalm, "Гид по районам Пхукета", "Где лучше покупать под сдачу, а где — для себя."],
              [IMG.housePoolGreen, "Как проверить застройщика", "Пять признаков надёжного проекта."],
              [IMG.livingModern, "Ипотека для иностранцев", "Что реально работает на Пхукете в 2026."],
              [IMG.poolLounge, "Аренда vs покупка", "Считаем окупаемость на реальных цифрах."],
            ].map(([id, title, text]) => (
              <div key={id} className="group relative aspect-[3/4] w-[70%] flex-none snap-start overflow-hidden rounded-2xl bg-neutral-900 text-white transition-transform hover:-translate-y-1.5 sm:w-[40%] lg:w-[23%]">
                <img src={img(id, 700)} alt="" className="absolute inset-0 h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-110" />
                <div className="relative z-10 flex h-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-5">
                  <h4 className="mb-2 text-[15px] font-semibold">{title}</h4>
                  <p className="mb-3 text-xs opacity-85">{text}</p>
                  <a href="#" className="inline-flex items-center gap-1.5 border-b-2 border-white pb-0.5 text-xs font-bold">Читать →</a>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="mt-6 text-center">
            <Button>Смотреть все статьи</Button>
          </div>
        </div>
      </section>

      <Footer notes={[
        "¹ Заглушка сноски — сюда позже встанет реальный дисклеймер по проекту/цене.",
        "² Заглушка сноски — условия актуальны на момент публикации, уточняйте у менеджера.",
      ]} />
    </div>
  )
}
