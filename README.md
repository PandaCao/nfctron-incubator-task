# NFCtron Backend Task

## About this Task

Simple web server for customer records. It simulates basic CRUD operations but is not connected to any database.  
The goal of this project is to get familiar with the basic concepts of the NestJS framework.

**Note:** This application does not use a database. Customer data is stored in memory in array and resets to five new
random customers when the server restarts.

## Setup and installation

```bash
    git clone https://github.com/PandaCao/nfctron-incubator-task
```

### Using docker compose:

```bash
    docker-compose up
```

### Alternatively:

Before running the application, install dependencies:

```bash
    pnpm install
```

Running the application

```bash
  pnpm run start
```

Testing the application

```bash
  pnpm run test
```

## REST API

I personally use Postman for sending requests but below are some request examples:

### Some examples of requests

`GET /api/v1/customers`

    curl -X GET --location "http://localhost:8080/api/v1/customers"

`GET /api/v1/customers/:uuid`

    curl -X GET --location "http://localhost:8080/api/v1/customers/:uuid"

`POST /api/v1/customers/create`

    curl -X POST --location "http://localhost:8080/api/v1/customers/create" \
    -H "Content-Type: application/json" \
    -d '{
    "firstName": "Xiao",
    "lastName": "Pang",
    "email": "xiaopang@gmail.com",
    "phone": "123456789"
    }'

`PATCH /api/v1/customers/update/:uuid`

    curl -X PATCH --location "http://localhost:8080/api/v1/customers/update/:uuid" \
    -H "Content-Type: application/json" \
    -d '{
    "firstName": "Xiao",
    "lastName": "Pang",
    "email": "xiaopang@gmail.com",
    "phone": "123456789"
    }'

### Endpoints

| Method  | URL                               | Description                    |
|---------|-----------------------------------|--------------------------------|
| `GET`   | `/api/v1/customers`               | Retrieve all customers.        |
| `GET`   | `/api/v1/customers/{uuid}`        | Retrieve the customer by uuid. |
| `POST`  | `/api/v1/customers/create`        | Create new customer            |
| `PATCH` | `/api/v1/customers/update/{uuid}` | Update customer by uuid.       |