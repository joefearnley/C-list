# Checklist
Check those things off the list

My attempt to build an app using React for the frontend and Django/Django REST Framework for the backend.

## Installation Instructions

### Backend

Create a virtual environment

`$> python3 -m venv checklist-env`

Activate the virtual environment

`$> source checklist-env/bin/activate`

Install requirements

`(checklist-env) $> ./checklist-env/bin/pip install -r requirements.txt`

Run migrations

`(checklist-env) $> cd backend`

`(checklist-env) $/backend> ./manage.py makemigrations`

`(checklist-env) $/backend> ./manage.py migrate`

Create super user
`(checklist-env) $/backend> ./manage.py createsuperuser`

### Frontend

Install Dependencies

`(checklist-env) $> cd frontend`

`(checklist-env) $/frontend> npm install`

Run app

`(checklist-env) $/frontend> npm start`