## Getting Started

### Prepare enviroment (Optional)

Create a file named .env in the root folder if you wish to change enviromental parameters

```

PORT=3000
DATABASE_URL=localhost/
DATABASE=usersArticlesApi
TOKEN=5CD4ED173E1C95FE763B753A297D5

```

tests will run using `DATABASE=test` and `TOKEN=5CD4ED173E1C95FE763B753A297D5`, if you want to change this, edit scripts.test value in package.json

```javascript
"scripts": {
    "start": "node start",
    "test": "DATABASE=test TOKEN=5CD4ED173E1C95FE763B753A297D5 jest"
  }
```

### Run this API using node and mongodb installed locally on your computer

Install this dependencies

- nodejs v12.14.0
- mongodb v4.0.14

then..

```
cd users-articles-api
npm install

```

- The **mongod process** must be started, see [Docs](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)

##### Run the app

```
npm start

```

Or..

##### Run tests

```
npm test

```

### Run this API using docker

Install this dependencies

- docker v18.09.7
- docker-compose v1.25.4

open a terminal and run

```
cd users-articles-api
docker-compose up

```

mongodb will run on **localhost:27017** and server will run on **localhost:3000** by default.

## Endpoints

- HTTP POST 'api/new-user'
- HTTP POST 'api/new-article'
- HTTP POST 'api/edit-article'
- HTTP GET 'api/delete-article/'
- HTTP GET'/all-articles'

All request must have the `content-type : application/json` header.

## Authorization

Every request must have the at least this content in the body:

```
{ token: VALID_TOKEN }
```

To keep the API as simple as possible, no authorization methods such as Basic or Bearer were used. Despite this, the authentication is encapsulated in a middleware to be easily changed (`api/services/authentication.js`).

## New user

To create a new user you must send a POST request sending at least the `token` and a `name`:

```javascript
    {
      token: VALID_TOKEN,
      name: String,
    }
```

If you did not send the `avatar` property, a default avatar URL will be asigned, otherwise you could send the avatar URL:

```javascript
    {
        token: VALID_TOKEN,
        name: "Some Name",
        avatar: "http://example.com"
    }
```

### Accepted values

- `name`: 3 to 50 English letters and spaces.
- `avatar`: valid http or https URL.

## New article

To create a new article you must send a POST request sending a json using this structure:

```javascript
    {
        token: VALID_TOKEN,
        userId: String,
        title: String,
        text: String,
        tags: [String]
    }
```
### Accepted values

- `userId`: 24 alphanumeric characters belonging to an existing user in the database.
- `title`: 3 to 50 English letters, spaces and comma symbol(,).
- `text`: 3 to 4000 English letters, spaces, comma symbol (,), period symbol (.) and line breaks.
- `tags`: Array of one or unlimmited strings contained 3 to 50 lowercase English letters. Example ` ['sometag','othertag']`

