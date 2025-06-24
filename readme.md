-- npm init
-- npm i express
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