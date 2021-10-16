# RESTful API with Node using Typescript

This is a simple REST API developed using node, mongodb and express with typescript

## GETTING STARTER

-   Create a MongoDB atlas to get the secret url and access key
-   Create a Circle CI account
-   Install global TypeScript and TypeScript Node `npm install -g typescript ts-node`

## TO RUN LOCALLY

-   Git clone https://github.com/AdedayoMj/royce-tech.git
-   run `npm install`
-   run `ts-node-dev src/server.ts` - This will start the application and run on port 7000
-   run `npm run build` then `npm start` - This can also be used to start the application
-   run `npm run dev` - This will start the application in development mode

## FOLDER STRUCTURE

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

## DOCKER SETUP

-   Install Docker and Docker extension on Visual Studio Code `Cmd + Shift + P to open settings to initialize Docker work station`
-   Add below to docker-compose yaml file:

        ```
        services:
        royce:
        image: royce
        build:
          context: .
          dockerfile: ./Dockerfile
        environment:
          NODE_ENV: production
        ports:
          - 3000:3000
        volumes:
          - .:/usr/src/app
        links:
          - mongodb
        mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
        volumes:
          - data:/data/db
        restart: always

        volumes:
          data:
        networks:
          default:
            name: mongo-network```

-   Modify MONGODB URL to use the docker mongo created with its port number `dockerUrl: 'mongodb://mongodb:27017/royce'`

## TEST RESTful API ON POSTMAN

The default URL is: http://localhost:3000

-   GET all users

```
Send GET request to http://localhost:3000/api/users/

Get the Response: { "count": 2,
"user": [
  {
"_id": "6168d8e2c185d01a8786329c",
"name": "maryam",
"dob": "08/08/2020",
"address": "Estonia",
"description": "royce test",
"createdAt":"2021-10-15T01:26:58.525Z",
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
] }
```

-   POST a new user

    `Send POST request to http://localhost:3000/api/users/register`

-   AUTH with user

    `Send POST request to http://localhost:3000/api/users/login`

-   UPDATE a user information

    `Send POST request to http://localhost:3000/api/users/updateUser/:userID`

-   FIND a single user

    `Send POST request to http://localhost:3000/api/users/findUser/:userID`

-   DELETE a single user

    `Send POST request to http://localhost:3000/api/users/deleteUser/:userID`

## UNIT TESTING USING JEST

Some of the test examples shown below:

-   Login the initially to get JWT Token for access

```
beforeAll(async () => {
    request(app)
        .post('/api/users/login')
        .send({
            name: 'roycetest',
            password: 'test1234',
        })
        .end((err: any, response: { body: { token: any; }; }) => {
            token = response.body.token;
            console.log('this is token', token, response.body)// save the token!

        });
});
```

-   Get all users

```
 describe('Fetch Users', () => {
        it('should fetch all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body.count).toBe(13);
        });
        it('Update should require autorization', async () => {
            const res = await request(app).get('/api/users/findUser/616a805170dbc310d3a8244a');
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Unauthorized')

        });
        it('It should update a single user', async () => {
            const res = await request(app).get('/api/users/findUser/616a77de70018324884c9940').set('Authorization', `Bearer ${token}`).send({ name: 'Adedayo' })
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('user')

        });

    })
```
