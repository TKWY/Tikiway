# TikiClients

## <u>What is TikiClients</u>

TikiClients is the user service for Tikiway customers, it's used to manage customers action, like creating a new account, login and update informations.

The service return response as json and must be handled in the frontend application.

---

## <u>Folder Structure</u>

```
├── app.js
├── config.js
├── package-lock.json
├── package.json
├── server.js
├── src
│   ├── db
│   │   ├── controllers
│   │   │   ├── customerController.js
│   │   │   ├── errorController.js
│   │   │   └── walletController.js
│   │   ├── index.js
│   │   └── models
│   │       ├── customerModels.js
│   │       └── walletModel.js
│   └── routes
│       ├── customerRoutes.js
│       └── walletRoutes.js
├── tests
└── tree.txt
```

---

## <u>Application requests</u>

### Return list of customer

#### Get request on /customers

```json5
{
{
  code: 200,
  success: true,
  msg: "Account has been created",
  user: [
    {customer1},
    {customer2},
    {customer3},
    ...
  ],
}
}
```

### Account creation

#### Form post request on /customers

```json5
{
  _id: "60658801919a0608e25958e4",
  firstName: "John",
  lastName: "DOE",
  password: "thisIsAPassword",
  email: "john.doe@thisisamail.com",
  phone: "+689XXXXXX",
  dateOfBirth: "1980-04-12T10:00:00.000Z",
  __v: 0,
}
```

#### POST return

```json5
{
  code: 200,
  success: true,
  msg: "Account has been created",
  user: {
    firstName: "John",
    lastName: "DOE",
    email: "john.doe@thisamail.com",
    phone: "+689XXXXXX",
    dateOfBirth: "1980-04-12T10:00:00.000Z",
  },
}
```

#### Error format

```json5
{
  code: 409,
  succes: false,
  message: "An account with that phone number or email already exists.",
}
```

### Customer by id

#### GET on /customers/:id return

```json5
{
  code: 200,
  success: true,
  msg: "Account has been created",
  user: {
    firstName: "John",
    lastName: "DOE",
    email: "john.doe@thisamail.com",
    phone: "+689XXXXXX",
    dateOfBirth: "1980-04-12T10:00:00.000Z",
  },
}
```

#### PUT on /customers/:id return

#### if customer is not logged in, return error

```json5
{
  code: 403, 
  success: false, 
  msg: 'Please log in first!'
}
```

#### customer is logged in

```json5
{
  code: 200,
  success: true,
  msg: {
    updated customer information...
  }
}
```

---

## What framework?

TikiClients is written with NodeJs using ExpressJS and Mongoose to communicate with the database(MongoDB).

#### Mongoose schema exemple

```Javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    unique: 'That username is already used', // return unique error
    index: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password']
  }
})

```

---

## In progress

Customers method still in progress:

- delete user by id
