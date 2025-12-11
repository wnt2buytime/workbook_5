# Contact Book API (Express)

Учебное приложение на Express для книги контактов. Реализованы маршруты, контроллеры, middleware, раздача статических файлов и простая документация.

## Запуск

1) Установите зависимости: `npm install`  
2) Старт в продакшн-режиме: `npm start`  
3) Старт в dev c автоперезапуском: `npm run dev`  
4) Откройте `http://localhost:3000` чтобы увидеть статическую страницу, API доступно под `http://localhost:3000/api/...`

## Эндпоинты

- `GET /api/health` — статус сервиса.  
- `GET /api/contacts` — все контакты. Опции: `?search=alex` (по имени/почте/телефону/городу), `?city=Москва` (фильтр по городу).  
- `GET /api/contacts/:id` — контакт по id.  
- `POST /api/contacts` — создать контакт. Тело: `{ "name": "...", "email": "...", "phone": "...", "city": "..." }`.  
- `PUT /api/contacts/:id` — обновить контакт (любые поля).  
- `DELETE /api/contacts/:id` — удалить контакт.

## Структура

- `src/app.js` — точка входа, middleware, статика.  
- `src/routes/contacts.js` — роутер контактов.  
- `src/controllers/contactController.js` — бизнес-логика контактов.  
- `src/middleware/*` — собственные middleware (логгер, отметка времени).  
- `src/data/contacts.js` — стартовые данные в памяти.  
- `public/*` — статика и демонстрационная страница.

## Проверка

После запуска попробуйте:

- Открыть `http://localhost:3000` — статика.  
- `curl http://localhost:3000/api/contacts` — список.  
- `curl -X POST http://localhost:3000/api/contacts -H "Content-Type: application/json" -d '{"name":"Новый","phone":"+7 900 000-00-00","email":"new@example.com","city":"Казань"}'`


# workbook_5
