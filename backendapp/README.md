# MWA - Homework 14 - Angular 04
### Backend Application (Express)
* Create a Restful API for `POST /login` and `POST /signup`, after sign-up or sign-in, the backend API will generate a JWT and send it to your Angular app. Password must be encrypted (use `bcrypt` and `jsonwebtoken` packages)
* Create another route `GET /api/protected` and write a middleware to verify and allow tokenized requests to pass through. The route will send back a JSON object as a response.
  
### Frontend Application (Angular)
* Create reactive sign-up and sign-in forms with an async validator that checks if emails are unique.
* Create Angular route `/protected` that displays `protectedComponent`, this component will fetch data from `GET /api/protected/`, make sure all requests have the JWT in the request header, so the backend API will approve the request, your frontend route should be protected with a Guard so only logged in users can access `protectedComponent`.



