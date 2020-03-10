Edit/create a file .env in the root of this project and put this:

ENV=dev / prod
PORT=3000
DATABASE_URL=localhost/
DATABASE=usersArticlesApi
TOKEN=1CD1ED11111C11FE11B111A111D11


USING npm start

dependencies nodejs v12.14.0
             mongodb v4.0.14 (without authorization)

run npm install
run npm start

test cases

run npm test

USING DOCKER AND DOCKER COMPOSE 

mongodb will run on localhost:27017
server will run on localhost:3000

run sudo docker-compose up

http://127.0.0.1:3000/api/new-user