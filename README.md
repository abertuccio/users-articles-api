start mongo using : sudo systemctl start mongod

ENV=dev / prod
PORT=3000
DATABASE_URL=mongodb://localhost/
DATABASE=usersArticlesApi
TOKEN=0001111AAABBB

RUN MONGO
sudo docker run --name uaa-mongo -d mongo:4.0.14

BUILD DOCKER
sudo docker image build -t users-articles-api:1.0 .

RUN DOCKER 
sudo docker container run --publish 8000:8080 --name bb users-articles-api:1.0

REMOVE CONTAINER
docker container rm --force bb

sudo docker-compose up