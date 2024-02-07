# Тестовое задание на позицию фронтенд-разработчика

<details>
<summary>

### Описание задания

</summary>
Телефонная книга по макету на Vanilla JS / React / другом фреймворке 
со следующей функциональностью:
<ol>
  <li>Каждый контакт должен обязательно содержать одно из полей имя или фамилия, 
  а также набор опциональных полей: отчество, телефоны, компания, адрес, email</li>

  <li>Просмотр всей информации о контакте при клике на него</li>

  <li>Механизм сортировки контактов по алфавиту.
  Сортировка выполняется по имени, либо по фамилии, если имя не указано.</li>

  <li>Возможность добавления нового контакта с валидацией наличия обязательных полей.</li>

  <li>Текстовый поиск среди контактов по всем заполненым полям контакта.</li>

  <li>Динамичная подгрузка данных при прокрутке вниз больше чем на N контактов.
  (Имитация подгрузки списка с сервера по частям)</li>

  <li>* Реализовать импорт и экспорт контактов в JSON файл.</li>

  <li>** Загрузка и обрезка в рамку фото контакта.</li>
</ol>

Приложение должно работать в браузере на основе chromium.
Бэкенд не требуется. Задачи со \* опциональны.

</details>

### Demo

[latest](https://stc-front-test.vercel.app/)

<h3>Запуск приложения</h3>

Для запуска приложения выполните следующие шаги:

<ol>
  <li>Распакуйте архив или скачайте с удаленного репозитория и перейдите в папку с проектом
  
```bash
git clone https://github.com/OlshePete/STC-front-test.git
```

```bash
cd STC-front-test
```

  </li>
  <li>Установите все зависимости, указанные в файле package.json, выполнив команду

    ```bash
    npm install
    ```

</li>
</ol>

<h4> Режим development</h4>
<ol>
  <li>
Выполните команду

```bash
npm run dev
```

</li>
  <blockquote>Для просмотра приложения откройте браузер и перейдите по адресу <a href="http://localhost:3000">http://localhost:3000</a>
  </blockquote>
</ol>
<h4> Режим production</h4>
<ol>
  <li>
Выполните сборку приложения командой

```bash
npm run build
```

</li>
  <li>
Запустите предпросмотр собранного приложения, выполнив команду

```bash
npm run preview
```

</li>
  <blockquote>Для просмотра приложения откройте браузер и перейдите по адресу <a href="http://localhost:4173">http://localhost:4173</a>
  </blockquote>
</ol>
