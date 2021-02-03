# twitter
twitter clone (work in progress)

## Запуск под Linux (для разработки)

Для начала надо скачать проект и установить зависимости.
```sh
$ git clone https://github.com/dikos1337/twitter
$ cd twitter
$ npm install
$ cd backend
$ python -m venv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
```
Cделать миграции и cоздать супер пользователя.
```sh
(venv) /backend$ python manage.py makemigrations
(venv) /backend$ python manage.py migrate
(venv) /backend$ python manage.py createsuperuser
```
Запуск frontend
```sh
$ npm run serve
```
Запуск backend
```sh
(venv) /backend$ python manage.py runserver