<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="300" alt="Nest Logo" /></a>
</p>


## Instalar dependencias

```bash
$ npm install --force
```

## Variables de entorno
Clonar el archivo __.env.template__, cambiar el nombre a __.env__ y verificar los valores de las variables de entorno.

## Levantar la base de datos
Utilizamos docker compose 
```
$ docker compose up -d
```

## Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Compilar y correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Correr los tests

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