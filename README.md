# Budget Tracker

Budget Tracker - это приложение для отслеживания бюджета, построенное с использованием Nest.js для бэкенда и Next.js для фронтенда.

## Структура проекта

budget-tracker
├── bt-server # Бэкенд на NestJS
├── bt-client # Фронтенд на Next.js  
├── docker-compose.yml
└── README.md

## Запуск проекта c использованием Docker

1. Убедитесь, что у вас установлен Docker и Docker Compose.
2. Запустите контейнеры:
   ```sh
   docker-compose up --build
   ```
3. Фронтенд будет доступен по адресу `http://localhost:3000`, а бэкенд по адресу `http://localhost:4000`.
