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

To run tests individually (recomended) add `-- ` and part of the name of files under `/test` folder, example to run `allArticles.test.js`: 

```
npm test -- allArticles

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
- HTTP DELETE 'api/delete-article/'
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

## Edit article

The user sent must be the same as the article creator. 

To edit an article you must send a POST request including at least `articleId` and `userId` and at least one of `title`, `text` or `tags` properties:

```javascript
    {
        token: VALID_TOKEN,
        userId: String,
        title: String,
        text: String,
        tags: [String]
    }
```

also Valid

```javascript
    {
        token: VALID_TOKEN,
        userId: String,
        text: String
    }
```

### Accepted values

The same rules as new article


## Delete article

As I said in the beginning, token must be sent in the body `{ token: VALID_TOKEN }` depite of this is not a POST requst. This is the way it is for simplicity.

To delete an article you must send a DELETE request sending the article id as a part of the URL as this example:

```
https://localhost/api/delete-article/5e5d11e7114a2b37ee248f90

```

### Accepted values

- Article Id: 24 alphanumeric characters belonging to an existing article in the database.


## All articles

As I said in the beginning, token must be sent in the body `{ token: VALID_TOKEN }` depite of this is not a POST requst. This is the way it is for simplicity.

To list all articles you must send a GET request, optionaly indicating a `tags` array as query parameter, like this examples:

To list all articles:
```
https://localhost/api/all-articles

```

To list all articles containing at least one of the tags "comedy" or "action" :
```
https://localhost/api/all-articles?tags=["comedy","action"]

```


### Accepted values

The rules for tags are the same as the rules used in New article tags.