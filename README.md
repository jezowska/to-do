## To-do

An app to keep up with your daily tasks. Add, mark as completed and delete tasks as you please.  Requires users to create an account or log in.       

--- 

### Backend

Backend uses Django, Django REST framework and DRF SimpleJWT. In project I used Django's BaseUserManager, AbstractUserManager  and JWT Tokens to make creating accounts and logging  possible.  

To run project open a terminal and paste following commands:

```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python backend/manage.py runserver
```



--- 

### Frontend

Frontend uses React.js. To run project open a new terminal and pase following commands:

```
cd frontend
npm install
npm start
```
