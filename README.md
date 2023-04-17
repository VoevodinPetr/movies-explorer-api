# Movies Explorer 
Репозиторий для бэкенд-части приложения с API-сервером. 

Ccылка Pull requests: https://github.com/VoevodinPetr/movies-explorer-api/pulls

API-сервер доступен по адресу: https://supermovies1.nomoredomains.monster
___

В ней были созданы схемы и модели ресурсов API : в проекте две сущности: пользователи и сохранённые фильмы (users и movies).
### Поля схемы user:
* email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
* password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
* name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.
### Поля схемы movie:
* country — страна создания фильма. Обязательное поле-строка.
* director — режиссёр фильма. Обязательное поле-строка.
* duration — длительность фильма. Обязательное поле-число.
* year — год выпуска фильма. Обязательное поле-строка.
* description — описание фильма. Обязательное поле-строка.
* image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
* trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
* thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
* owner — _id пользователя, который сохранил фильм. Обязательное поле.
* movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
* nameRU — название фильма на русском языке. Обязательное поле-строка.
* nameEN — название фильма на английском языке. Обязательное поле-строка.
___
### Были созданы роуты и контроллеры:
* возвращает информацию о пользователе (email и имя) GET /users/me

* обновляет информацию о пользователе (email и имя) PATCH /users/me

* возвращает все сохранённые текущим пользователем фильмы GET /movies

* создаёт фильм с переданными в теле

* country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId POST /movies

* удаляет сохранённый фильм по id DELETE /movies/_id
