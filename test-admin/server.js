const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom middleware to handle CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

// Use default router
server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
