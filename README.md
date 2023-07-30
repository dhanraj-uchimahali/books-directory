# Book Directory API with JWT Authentication

This is a RESTful API built with Node.js, Express, and MongoDB for managing a book directory. It includes JWT authentication to secure the endpoints.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or remotely

### Installation

1. Clone the repository:

   HTTPS:
   git clone https://github.com/Aizonati/books-directory.git
   
   SSH:
   git clone git@github.com:Aizonati/books-directory.git

2. Install dependencies:

   npm install
   

3. Create a `.env` file in the root directory with the following variables and add your own mongodb url 
   and access token values:

   MONGO_URL = your mongo url

   ACCESS_TOKEN = your secret key
   

4. Start the server:

   npm start
   

## Usage

### Authentication

To access the protected endpoints, you need to obtain a JWT token by sending a POST request to `/v1/login` with valid credentials in the request body:


POST /v1/login

HTTP/1.1

Content-Type: application/json
```
{
  "email": "john@gmail.com",
  "password": "password123"
}
```

If the credentials are valid, you will receive a response with a JWT token:


HTTP/1.1 

200 OK
```
Content-Type: application/json

{
    "success": true,
    "message": "Login Successfully",
    "result": {
        "id": "64c665347851890ae618d04a",
        "username": "john",
        "email": "john@gmail.com",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MTk2NjMzODUsImV4cCI6MTYxOTY2Njk4NX0.uqKZn7K4BrOz9LzC1zQHq5K0jJG3mVZ3y-0HqoKfOwE"
    }
}
```

Include the token in the `Authorization` header of subsequent requests:


GET /v1/books 
```
HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MTk2NjMzODUsImV4cCI6MTYxOTY2Njk4NX0.uqKZn7K4BrOz9LzC1zQHq5K0jJG3mVZ3y-0HqoKfOwE
```

### Endpoints

#### GET /v1/books

Returns a list of all books in the directory.

*Example response:*


HTTP/1.1 200 OK

Content-Type: application/json
```
 "success": true,
    "message": "book data fetched successfully",
    "result":[
    {
      "_id": "606f2a7a6c3b3c7c24b8e5f2",
      "title": "The Hitchhiker's Guide to the Galaxy",
      "author": "Douglas Adams",
      "release_date": "2000-11-14",
      "rating": 0,
      "genre": "Science Fiction"
      "is_active": true,
      "is_deleted": false
    },
    {
      "_id": "606f2a7a6c3b3c7c24b8e5f3",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "release_date": "2000-11-14"
      "genre": "Classic",
      "is_active": true,
      "is_deleted": false
    }
]
```


#### GET /v1/books/:bookId

Returns a single book with the specified ID.

*Example response:*
HTTP/1.1 

200 OK

Content-Type: application/json
```
 "success": true,
 "message": "book data fetched successfully",
 "result":{
  "_id": "606f2a7a6c3b3c7c24b8e5f2",
  "title": "The Hitchhiker's Guide to the Galaxy",
  "author": "Douglas Adams",
  "description": "The misadventures of Arthur Dent, a hapless human who is rescued from Earth just before it is destroyed to make way for a hyperspace bypass.",
  "genre": "Science Fiction"
}
```

#### POST /v1/books

Adds a new book to the directory. Requires authentication.

*Example request:*


POST /v1/books 

HTTP/1.1


Content-Type: application/json


Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MTk2NjMzODUsImV4cCI6MTYxOTY2Njk4NX0.uqKZn7K4BrOz9LzC1zQHq5K0jJG3mVZ3y-0HqoKfOwE
```
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Science Fiction",
  "rating": 4.2
}
```

*Example response:*


HTTP/1.1 201 Created

Content-Type: application/json
```
{
  "_id": "60701c2d8e3a9e7b4c1b8d8d",
  "title": "1984",
  "author": "George Orwell",
  "genre": "Science Fiction",
  "rating": 4.2
}
```
