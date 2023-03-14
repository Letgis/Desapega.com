# Desapega.com
 
## ✨ How to use it

> Download the code

```bash
$ # Get the code
$ git clone https://github.com/Letgis/Desapega.com
```

<br />

### 👉 Set Up for `Unix`, `MacOS`

> Install modules via `VENV`

```bash
$ python3 -m venv env
$ source env/bin/activate
$ pip3 install -r requirements.txt
```

<br />

> Set Up Database

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

<br />

> Start the app

```bash
$ python manage.py runserver
```

At this point, the app runs at `http://127.0.0.1:8000/`.

<br />
<br />
<br />
<br />

### 👉 Set Up for `Windows`

> Install modules via `VENV` (windows)

```
$ py -m venv env
$ .\env\Scripts\activate
$ pip3 install -r requirements.txt
```

<br />

> Set Up Database

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

<br />

> Start the app

```bash
$ python manage.py runserver
```

At this point, the app runs at `http://127.0.0.1:8000/`.

<br />
