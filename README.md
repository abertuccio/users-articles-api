## Getting Started

### Prepare enviroment (Optional)

Create a file named .env in the root folder if you wish to change enviromental parameters 

```

PORT=3000
DATABASE_URL=localhost/
DATABASE=usersArticlesApi
TOKEN=5CD4ED173E1C95FE763B753A297D5

```

tests will run using DATABASE=test and TOKEN=5CD4ED173E1C95FE763B753A297D5, if you want to change this, edit scripts.test value in package.json

```javascript
"scripts": {
    "start": "node start",
    "test": "DATABASE=test TOKEN=5CD4ED173E1C95FE763B753A297D5 jest"
  }
```

### Run this api using node and mongodb installed locally on your computer

Install this dependencies

* nodejs v12.14.0
* mongodb v4.0.14

then..

```
cd users-articles-api
npm install

```

* The **mongod process** must be started, see [Docs](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)

##### Run the app

```
npm start

```

Or..

##### Run tests

```
npm test

```

### Run this api using docker

Install this dependencies

* docker v18.09.7
* docker-compose v1.25.4

open a terminal and run 

```
cd users-articles-api
docker-compose up

```

**mongodb will run on localhost:27017 and server will run on localhost:3000**