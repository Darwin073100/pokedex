<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="300" alt="Nest Logo" /></a>
</p>


## Instalar dependencias

```bash
$ npm install --force
```

## Levantar la base de datos
Utilizamos docker compose 
```
$ docker compose up -d
```

## Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stack usado
* MongoDB
* Nest