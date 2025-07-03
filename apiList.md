# DevTinder APIS


##Auth Router
- POST /signup
- POST /login
- POST /logout

##Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

##Connection Request Router
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userID

- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID


##User Router
- GET /user/connections
- GET /user/requests
- GET /user/feed - gets you the profiles of other users on platform


Status: ignore,  interested, accepted, rejected
