# RESTful API with Node using Typescript

This is a simple REST API developed using node, mongodb and express with typescript

## Getting Started

-   Create a MongoDB atlas to get the secret url and access key
-   Create a Circle CI account
-   Install global TypeScript and TypeScript Node
    `` npm install -g typescript ts-node ``

## To run locally

-   Git clone https://github.com/AdedayoMj/royce-tech.git 
-   run `npm install`
-   run `ts-node-dev src/server.ts`         -  This will start the application and run on port 7000 
-   run `npm run build` then `npm start`    - This can also be used to start the application
-   run `npm run dev`                       - This will start the application in development mode

## Folder Structure

```
    .
    ├── .vscode                 # project settings
    ├── build                   # Compiled files (alternatively `dist`)
    ├── src                     
        ├── config                          # Application variables and logging alert configuration
        ├── controllers                     # Express route controllers for all the endpoints of the app
        ├── interface                       # models interfaces
        ├── middleware                      # jwt token validation
        ├── models                          # DB Models 
        ├── routes                          # Application routes / endpoints
        ├── services                        # Application validation
        └── server.ts                       # Application entry point
```


## TEST RESTful API on POSTMAN

The default URL is: http://localhost:7000

-   GET all users

``` 
Send GET request to http://localhost:7000/api/users/getAllUsers 

Get the Response:
{
    "count": 2,
    "user": [
        {
            "_id": "6168d8e2c185d01a8786329c",
            "name": "maryam",
            "dob": "08/08/2020",
            "address": "Estonia",
            "description": "royce test",
            "createdAt": "2021-10-15T01:26:58.525Z",
            "updatedAt": "2021-10-15T01:53:40.215Z",
            "__v": 0
        },
        {
            "_id": "6168e257745ae0c01e2da6c3",
            "name": "permanent",
            "dob": "02/02/1900",
            "address": "United Kingdom",
            "description": "royce test update test",
            "createdAt": "2021-10-15T02:07:19.555Z",
            "updatedAt": "2021-10-15T02:07:19.555Z",
            "__v": 0
        }
    ]
}

```

-   POST a new user

    `` Send POST request to http://localhost:7000/api/users/register ``

-   AUTH with user

    `` Send POST request to http://localhost:7000/api/users/login ``

-   UPDATE a user information

    `` Send POST request to http://localhost:7000/api/users/updateUser/:userID ``

-   FIND a single user

    `` Send POST request to http://localhost:7000/api/users/findUser/:userID ``

-   DELETE a single user

    `` Send POST request to http://localhost:7000/api/users/deleteUser/:userID ``