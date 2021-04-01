# TikiClients
## What is TikiClients

TikiClients is the user service for Tikiway customers, it's used to manage customers action, like creating a new account, login and update informations.

The service return response as json and must be handled in the frontend application.
***
#### Document format:

```json
  {
    "_id": "60658801919a0608e25958e4",
    "firstName": "test",
    "lastName": "test",
    "password": "$2b$10$416mNEe200.qaISJ38xHm.4wL9y1EbjhoAxkGQqC.pnnmBpbAxbdO",
    "email": "test@test.fr",
    "phone": "+689705647",
    "dateOfBirth": "1985-04-12T10:00:00.000Z",
    "__v": 0
  }
```
<br />

#### Error format:
```json
json
{
    "code": 409,
    "message": "An account with that phone number already exists."
}
```
***
## What framework?
TikiClients is written with NodeJs using ExpressJS and Mongoose to communicate with the database(MongoDB).

#### Mongoose schema exemple:

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
***
## In progress

Customers method still in progress: 

* update method
* errors handling for each methods
* delete user by id
