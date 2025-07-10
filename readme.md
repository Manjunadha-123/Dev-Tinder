-- npm init
-- npm i express -- middeleware support and works route perfectly and intigrate with database.
-- npm i -g nodemon -> it uses to restart the server automatically

// it has routes order is mandtory.

// Route Handlers
// if we use multiple routes, the server gives the first response only.
// if in the first route had no response server runs infinite loop.
// it can not goes to the next route.
// if we can use third parameter called as next it goes through the next route successfully.
// if first had response and also include next it run perfect but it can not go to the next route and give error.
// if we can not give route, then app will be crash.
// rapping Route Handlers in Array is works properly.

// in the use of next functions are middeleares and where the one is give the response is the request handlers.

--database creation
----npm i mongoose
----we can create a database and connect to app in that also we applied before the server running that would easy.
---next would be create userSchema
---next is sent random user data to database.

---create a post signup api.
--- and next send a document.

---find a document using details.
--- find all the docments.

--- use curd operations.
----/get, /post, /patch, /put, /delete

----/put -> it is update fully document without mention attributes.
----/patch -> it is only update the mentioned data only it is secured perfectly.

--next modify profecissional type user schema using schematypes.

--next create a login paage for users
-- in that first you can check is user are present or not . if exists then check password otherwise show invalid credential.
--if ok for all that then show login sucessfully.

--next we can add athentication we can provie tokens for that we can install "npm i cookie-parser".
-- it first user login browser provide us a token inside with a cookie the we got we can store our browser then every time we can request the database the will goes to database then return back the info. if user once logout the key token wiil be invalid if you use it can't work and it shows pleas login agian.
--then we can create a profile upi.

read  cookie we can  use c
-- const cokkies = req.cookies;

we can create jsonwebtoken we can use npm package called as npm i jsonwebtoken.


--After we can create routers using express router.
