# carservation.server

## Data Schmas
### User
```
userId: String, unique
name: String,
email: String,
isEmployee: Boolean,
```

### Reservation
```
reservationId: String, unique
parkingSpotId: String,
userId: String,
licensePlate: String,
reservationDate: Date,
time: Number,
isCheckedIn: Boolean,
```

## Base URL: https://carservation.herokuapp.com/api/
## API Routes
### api/users/...
```
GET /
Returns all users

GET /:userId
Returns user matching the userId parameter

POST /
Creates a user in the user document
Requires adding userId, name, email, and isEmployee to the body of the request

DELETE /:userId
Deletes a user from the user document matching the userId parameter

PUT /:userId
Updates a user from the user document matching the userId parameter
Requires adding userId, name, email, and isEmployee to the body of the request
```
### api/reservations/...
```
GET /
Returns all reservations

GET /reservationId/:reservationId
Returns reservation matching the reservationId parameter

GET /date/:date
Returns all reservations that match the date parameter

GET /parkingSpotId/:parkingSpotId
Returns all reservations that match the parkingSpotId parameter

GET /userId/:userId
Returns all reservations that match the userId parameter

POST /
Creates a reservation in the reservation document
Requires adding reservationId, parkingSpotId, userId, licensePlate, reservationDate, time to the body of the request

DELETE /:reservationId
Deletes a reservation from the reservation document matching the reservationId parameter

PUT /:reservationId
Updates a user from the reservation document matching the reservationId parameter
Requires adding reservationId, parkingSpotId, userId, licensePlate, reservationDate, time to the body of the request
```

