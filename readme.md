-- npm init
-- npm i express
-- npm i -g nodemon  -> it uses to restart the server automatically

// it has routes order is mandtory.

// Route Handlers
// if we use multiple routes, the server gives the first response only.
// if in the first route had no response server runs infinite loop.
// it can not goes to the next route.
// if we can use third parameter called as next it goes through the next route successfully.
// if first had response and also include next it run perfect but it can not go to the next route and give error.
// if we can not give route, then app will be crash.
// rapping Route Handlers in Array is works properly.