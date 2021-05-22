# Play MARVEL Characters API with NodeJS, ExpressJS, Open API, Swagger, Redis and Jest

## Requirements

- NodeJS v10.17.0+, install with <https://github.com/nvm-sh/nvm> or <https://nodejs.org/en/>

- NPM 6.11.3+, NPM installed along with NodeJS but may be outdated, consider upgrading it to the latest version

- Redis, install and quick start guide <https://redis.io/topics/quickstart>

- MARVEL Developer API private and public keys, see <https://developer.marvel.com>

## Environment variables

- Create .env file at the project root directory

```xml
SERVER_PORT=8080

REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_TIMEOUT=2000
REDIS_KEY_PREFIX=xendit-
REDIS_TTL_MARVEL=3600

MARVEL_PUBLIC_KEY=
MARVEL_PRIVATE_KEY=
MARVEL_BASE_URL=https://gateway.marvel.com

```

- Obtain MARVEL Developer API private + public keys and fill the value to MARVEL_PUBLIC_KEY and MARVEL_PRIVATE_KEY

## Run the application

- Redis server has to be started before the application server, can be started with `redis-server` command

- Start the application server with `npm start` command at the project root directory, the script is configured inside package.json

## Open API with Swagger

- Open API documentation is defined in `open-api-doc.js` file, the UI is provided by `swagger-ui-express` module

- Once the server started, you can explore the Open API at `http://localhost:8080/api-docs` or `http://localhost:8080`

## Run tests with coverage

- Run unit tests with `npm test` command at the project root directory, the script is configured inside package.json

- This project only implements unit test cases for `marvel/marvel-controller.js` file as others are config files

- Unit tests are implemented with Jest <https://jestjs.io/> in `tests/marvel-controller.test.js` file, all test cases are passed with 100% coverage

```markup
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |      100 |     100 |     100 |                   
 marvel-controller.js |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total

```
