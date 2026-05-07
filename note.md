# note

- кнопка удалить строку
  - удаление строки
- пагинация кнопки
  - логика

Ревью текущих изменений
🐞 1. Потенциальные ошибки

# Файл Проблема

1 GlobalStyles.ts:18 line-height: var(--body-line-height);s — лишний символ s после ;. Парсер CSS примет, но s создаст невалидный селектор и сломает всё, что следует
2 index.css:66 --table-header-color: var(--grey) — переменная --grey не объявлена
3 MeterTable/index.tsx:61 colSpan={7} захардкожен, должен быть tableLabels.length
4 types/index.ts:3 В union \_type значение HotWaterAreaMeter с заглавной, остальные — с маленькой. Несогласованность приведёт к опечаткам
5 src/assets/electicity.svg Опечатка в имени файла — electicity вместо electricity
6 Pagination/index.tsx:54 key={dots-${index}} — индекс как ключ; лучше dots-left/dots-right (их максимум 2)
7 MeterTable/index.tsx:4 Двойной пробел в import { Table, ...}
8 Pagination/index.tsx Файл без ; на концах строк, остальной код — с ;. Несогласованность стиля
9 mocks/meters.ts:38 В адресе area id=1 — мусорная строка qwertyuiop... (видимо, для тестирования переноса). Оставлять не стоит
⚡ 2. Оптимизация и рефакторинг
Производительность:

MeterTable/index.tsx:33-34 — getArea делает O(n) поиск в mockAreas для каждой строки. На странице 20 строк × 20 area = 400 итераций при каждом рендере. Заменить на Map<id, Area> через useMemo:

const areasById = useMemo(
() => new Map(mockAreas.map(a => [a.id, a])),
[]
);
pageMeters стоит обернуть в useMemo (если коллекция вырастет).
handlePageChange / handleDelete — useCallback, чтобы не ломать мемоизацию MeterRow.
MeterRow стоит обернуть в React.memo, особенно когда появятся обработчики.
Архитектура:

В MeterTable/index.tsx логика пагинации (slice, handlePageChange, totalPages) — отдельный hook usePagination(items, pageSize).
mockAreas хардкодится внутри MetersTable — это нарушение зависимостей. area-данные должны прийти пропсом или из стора.
MeterRow/index.tsx:42 — handleDelete поднять наверх (onDelete пропс), сейчас просто console.log.
Дублирование display: table; width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0 в styles.ts THead/TFooter — выделить общий миксин.
Td принимает variant/color через attrs, но типизирует их как string вместо импорта типов из Text — теряется автокомплит и type-safety.
В Text/index.tsx экспорт default — лучше named export для согласованности с остальной кодовой базой и tree-shaking автодополнения.
Алиас @/ в vite.config.ts настроен — но импорты используют то @/..., то ../../... (Home/index.tsx первая строка против четвёртой). Привести к единому стилю.
Магические числа ширин колонок (3.43%, 8.57%…) — вынести в массив рядом с tableLabels, чтобы метки/ширины не разъезжались.
🧹 3. Лишние / неиспользуемые стили
В index.css:

--border: var(--grey-150) — не используется
--accent, --accent-bg, --accent-border — не используются
--body-color, --body-color-emphasis — не используются
--delete-button, --delete-button-hover, --disabled-delete-button — объявлены, но в MeterRow/styles.ts используются напрямую --red-100, --red-200, --grey-400. Либо удалить, либо использовать семантические имена
--table-header-color, --table-header-border, --table-cell-color — не используются (плюс битая --grey)
В MeterRow/styles.ts:30:

flex-direction: row — это значение по умолчанию у flex, можно удалить
В MeterTable/styles.ts:11:

border-collapse: collapse на Table уже не нужен, поскольку THead/TFooter переопределяют через separate
В MeterTable/styles.ts:9:

overflow: hidden на <table> визуально ничего не делает (table-элемент игнорирует overflow без display: block)
🏗️ 4. Структура проекта — рекомендации
Сейчас:

src/
assets/
components/
Header/
MeterTable/
PageWrapper/
Text/
mocks/
pages/
styles/
types/
Что улучшить:

Разделить UI-kit и фичи. Text, PageWrapper — переиспользуемые примитивы; MeterTable — фича. Структура:

src/
shared/ui/ # Text, Button, PageWrapper
features/meters/ # MeterTable, MeterRow, типы и mock
pages/
(FSD-подобный подход — для приложения такого размера сейчас оверкилл, но шаг в эту сторону окупится с ростом).

Колокация типов и моков. Meter, Area относятся к фиче meters — держать рядом (features/meters/types.ts, features/meters/api/mock.ts), а не в общих src/types/, src/mocks/.

Barrel-файлы (index.ts). Сейчас компонент = папка. Хорошо. Но импорты from './MeterRow' работают только потому, что index.tsx подразумевается. Это ОК, но для shared-ui удобнее единый shared/ui/index.ts.

index.css → CSS-токены. Стоит разделить на:

styles/tokens.css (переменные)
styles/reset.css или оставить только в GlobalStyles.ts
Сейчас часть глобальных стилей в index.css, часть в GlobalStyles.ts — мешанина. Выбрать один подход.

Конфиг линтера. В проекте Vite есть стандартный ESLint-конфиг — стоит добавить правило @typescript-eslint/consistent-type-imports, import/order и Prettier — это автоматом починит много стилевых несогласованностей (точки с запятой, пробелы в импортах).

Тесты. Нет ни одного теста. Базовое: unit-тест на buildPages из Pagination/index.tsx:13 — там сложная логика с границами и легко словить off-by-one.

.env для конфигурации. Магическое число PAGE_SIZE = 20, max-height: 864px — кандидаты в общий конфиг/токены.

Naming: поля \_type, installation_date, is_automatic, area_id — это API-стиль (snake_case + underscore-prefix). Если данные приходят от backend в этом виде — ОК; если нет — привести к camelCase согласно общим конвенциям TS/JS.

🔒 Прочее
В MeterRow/index.tsx:43 console.log('delete', meter.id) — оставлять в коммите не стоит.
SVG-иконки импортируются как ?react — стоит проверить, что есть declaration vite-plugin-svgr/client в tsconfig.app.json под types (сейчас только vite/client), иначе TS будет ругаться при tsc --noEmit.
Резюме: код в целом аккуратный, типизация есть, разделение на компоненты разумное. Главные приоритеты для исправления — (1) синтаксическая ошибка ;s в GlobalStyles, (2) чистка неиспользуемых CSS-переменных, (3) Map для getArea, (4) согласованность импортов и стиля кода через ESLint+Prettier.
