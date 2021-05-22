const express = require('express')
const redis = require('redis');
const marvelRouter = require('./marvel/marvel-route');
const marvelController = require('./marvel/marvel-controller');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./open-api-doc');

const redisClient = redis.createClient(
  process.env.REDIS_PORT, 
  process.env.REDIS_HOST, {
    prefix: 'xendit-'
  });

redisClient.on('error', err => {
  console.error('Create Redis Client Error ' + err);
});

marvelController.setCacheClient(redisClient);

const app = express()
app.use('/characters', marvelRouter.router);

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(err.response.status || 500).send(err.response.data);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.listen(process.env.PORT || 8080, () => {
  console.log("Node server started")
})
