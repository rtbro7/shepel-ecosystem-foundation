# Shepel Ecosystem — Foundation (черновик)

Структурный фундамент, содранный по мотивам многостраничной экосистемы
home.google.com (welcome / about / get-inspired / compatible-devices) и
адаптированный под Shepel Property. Контент — заглушки (фото с Unsplash,
текст-плейсхолдер); задача этого репо — зафиксировать СТРУКТУРУ и
анимационный язык, а не финальный контент.

Стек: Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui (ручная сборка
button.tsx по стандартному shadcn-паттерну) + react-router-dom + lucide-react.

## Страницы
- `/updates` — «Обновления» (аналог home.google.com/welcome/): хиро с
  параллаксом, keynote-список с якорями, карусели, Ken Burns на видео-мок,
  карточки уведомлений.
- `/catalog` — «Каталог» (аналог home.google.com/compatible-devices/):
  категории объектов, бейдж доверия, фильтр по районам, топ-подборка,
  FAQ-аккордеон.

## Запуск
```
npm install
npm run dev
```

## Дальше
- About/хаб и Get-inspired/блог — та же структура, ещё не собраны.
- Реальные фото объектов вместо Unsplash-заглушек — по мере готовности медиатеки.
- Точные CSS-токены (тени/радиусы/тайминги) сверены с эталонной выгрузкой
  home.google.com — см. REF_ASSETS/google-home-clone в карте проекта.
