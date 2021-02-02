# C-list
Check those things off the list

My attempt to build an app using React for the frontend and Django/Django REST Framework for the backend.

## Installation Instructions

### Backend

Create a virtual environment

`$> python3 -m venv c-list-env`

Activate the virtual environment

`$> source c-list-env/bin/activate`

Install requirements

`(c-list-env) $> ./c-list-env/bin/pip install -r requirements.txt`

Run migrations

`(c-list-env) $> cd backend`

`(c-list-env) $/backend> ./manage.py makemigrations`

`(c-list-env) $/backend> ./manage.py migrate`

Create super user
`(c-list-env) $/backend> ./manage.py createsuperuser`

### Frontend

Install Dependencies

`(c-list-env) $> cd frontend`

`(c-list-env) $/frontend> npm install`

Run app

`(c-list-env) $/frontend> npm start`

TODO:
 - delete account
 - email notifications for Account section updates
