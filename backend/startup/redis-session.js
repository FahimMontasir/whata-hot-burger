// all redis and session
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
// todo: learn how to use session
// redis
module.exports = function (app) {
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "someTextInVar",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000,
      },
    })
  );
};
