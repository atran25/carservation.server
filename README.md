# Full application Link: https://github.com/cmtnguyen/CS160-project
# carservation.server

## How to Run
```
To run our application’s back end: https://github.com/atran25/carservation.server
Clone the repository
Run npm install in the root directory
Open directory in text editor
Create a .env file in the root directory
Inside the .env file write the following information:
MONGODB_URI = ...omitted
TEST_MONGODB_URI = ...omitted
Create a google-credentials.json in the root directory
Inside the google-credentials.json file, write the following information:
{
  ...omitted
}
Run npm start 
If you are not able to run it locally, you can view it here: https://carservation.herokuapp.com/
```
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

GET /date/:startDate/:endDate
Returns all reservations that are between the 2 query parameter dates.

GET /parkingSpotId/:parkingSpotId
Returns all reservations that match the parkingSpotId parameter

GET /userId/:userId
Returns all reservations that match the userId parameter

GET /checkedIn
Returns all reservations that have been checked in

POST /
Creates a reservation in the reservation document
Requires adding reservationId, parkingSpotId, userId, licensePlate, reservationDate, time to the body of the request

DELETE /:reservationId
Deletes a reservation from the reservation document matching the reservationId parameter

PUT /:reservationId
Updates a user from the reservation document matching the reservationId parameter
Requires adding reservationId, parkingSpotId, userId, licensePlate, reservationDate, time to the body of the request
```

