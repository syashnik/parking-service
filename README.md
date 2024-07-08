# Parking Service

This project is a parking spot booking service built with Node.js, Express, TypeScript, and Sequelize. It allows users to perform CRUD operations on parking spot bookings based on their permission level.

## Features
- **Admin Users**: Can create, view, edit, and delete any booking.
- **Standard Users**: Can create new bookings and view, edit, and delete only their own bookings.

___
# Run with Docker Compose
- Clone `.env.example` and rename into `.env.production`. Fill in the necessary environment variables if needed
- `docker-compose up --build`
- Open [swagger docs](http://localhost:3001/swagger) or use [postman collection](./docs/Parking_Service.postman_collection.json)
- Don't forget to specify Bearer token with proper role `admin` or `user`

### Here is data seed, which should bring some clarity about which user and spot can be used to create a booking:
- #### Users
```js
    {
      id: '847d97ca-11ef-4429-98e4-40b418ff93bc',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      token: 'admin',
    },
    {
      id: '866874ce-e326-4cea-b717-00628b297837',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      token: 'user',
    },
```
- #### Spots:
```js
  {
      id: '0b931c00-73ac-4f5a-88c1-2487880838fc',
      name: 'Spot 1',
    },
    {
      id: '6d7c479b-7c3c-4c26-8e45-a9e462cf91e6',
      name: 'Spot 2',
    },
    {
      id: '8bb69464-e5d0-4d8e-8d1a-52f541f6c251',
      name: 'Spot 3',
    },
    {
      id: '8bc98511-99e0-4f37-aaf6-22fd4d908f4f',
      name: 'Spot 4',
    },
    {
      id: '9d251159-af63-4d2b-aa6d-e32192aa2e97',
      name: 'Spot 5',
    },
```

___
# Development run

## Install dependencies
- `npm i`

## Environment variables 
- Clone `.env.example` and rename into `.env.development`.
- Fill in the necessary environment variables in the `.env.development` file.

## Run service
- `npm start`

## Bootstrap data
- `npm run seed`

## Run tests
- Clone `.env.example` and rename into `.env.test`.  
- `npm test`

## Link
- `npm run lint`

## Format code
- `npm run format`

___
## [Database schema](./src/database/parking_db.sql)
