## Order List with Items (React)

## Features
- Fetch 2 different endpoint to display data.
- CSS achieved using ANT UI
- Display detailed list of items
- Edit address

## start the backend

```sh
npx json-server --watch db.json
```

json-server will expose a full fake REST API from the db that you'll be able to use for this challenge

## start the backend
In a another tab run

```sh
yarn start
```

## Endpoints
There are a couple of APIs you should use:

* /orders listing all orders
* /orderitems listing orderItems
* /orderitems/<ID> for an individual order item

## Task
Using this API, create a JS app that:

* lists all the orders with the total price, quantity and status of each order

* has an order detail view that lists the product, quantity and price for the items in an individual order
    * allows editing of each order's address in this view if the order status is not shipped

## Note
When making POST/PUT/PATCH requests to json-server, it's good to know that:

* If you make POST, PUT, PATCH or DELETE requests, changes will be saved to db.json
* Your request body JSON should be object enclosed, just like the GET output. (for example {"name": "Foobar"})
* Id values are not mutable. Any id value in the body of your PUT or PATCH request will be ignored
* A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will return a 2XX status code, but without changes being made to the data

