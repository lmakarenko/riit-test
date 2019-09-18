<h1>Описание</h1>
<p>Реализация выполнена на стеке: Laravel (6.0), Ext Js (4.2.1).</p>
<p>Для простоты и удобства, в качестве СУБД иcпользуется SQLite (файл БД находится в database/database.sqlite).</p>
<p>Схема БД оформлена через миграции, таблицы заполняются данными через сиды.</p>
<p>Между пользователями и городами / образованием связь многие-ко-многим, что позволяет выбирать несколько городов / образований для пользователя.</p>
<p>Дата-грид реализован таким образом, что можно выбирать в выпадающем списке город / образование, при етом сразу происходит обновление данных на сервере через REST метод PUT (например: PUT /users/update/{id}), после чего, данные грида обновляются и видны изменения (при потере фокуса гридом).</p>
<p>Для простоты показан локальный фильтр, фильтрация доступна по полю имени пользователя. Однако на стороне бэкенда реализована (в несложном варианте) возможность фильтрации данных пользователей по ряду критериев, а также создание новых критериев фильтрации.</p>
<p>
Для запуска реализации необходимо:
<ul>
 <li>запустить локальный сервер Laravel, используя команду в корневой директории проекта: <pre>php artisan serve</pre></li>
 <li>установить зависимости проекта через composer, используя команду в корневой директории проекта: <pre>composer install</pre></li>
 <li>при необходимости, можно пересоздать БД средствами механизма миграций Laravel, перейдя в корневую директорию проекта и последовательно выполнив команды:
     <ul>
         <li><pre>php artisan migrate:reset</pre></li>
         <li><pre>php artisan migrate</pre></li>
         <li><pre>php artisan db:seed</pre></li>
     </ul>
 </li>
</ul>
</p>
