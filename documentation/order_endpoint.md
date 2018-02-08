# Restaurant

### POST @*/api/order*

API to add new order.

#### Request

```javascript
    {
    "userId" : "139bc406-5db5-433a-bc64-025a9f0be354"(UUID - required ),
    "restaurantId" : "ed492315-070c-405e-9aa4-0d1e4673cb40"(UUID - required ),,
    "items" : [
    //items is array 
    {
        "id" : "4ad29e90-7375-41da-bce2-caa4fe7bdee5"(UUID - required ),
        "count" : 4 (Integer - required)
    },{
        "id" :"b36da5ba-1b6c-45e4-a9eb-e9503f4ce20a",
        "count" : 3
    }]
    }
```

### Response


```javascript
    {
    "status": 0,
    "message": "order added successfully",
    "order": {
        "status": "registered",
        "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "id": "219bff16-420a-48e3-bc2b-7904cfa04e95",
        "updatedAt": "2018-02-08T06:14:10.372Z",
        "createdAt": "2018-02-08T06:14:10.312Z"
    }
}

```

### GET @*/api/order/list*

Return the list of order in database.
Defaut limit 250;

### Request

##### params  -
###### start 
    Number - start index of list - default 0
###### limit
    Number - count of restaurants required - default 250
###### sortBy
    String - define sorting field - default createdAt
###### order
    String - define sorting order ASC or DESC - default DESC

```
http://localhost:3000/api/order/list
```
    
### Response

```javascript
{
    "status": 0,
    "orders": [
        {
            "id": "219bff16-420a-48e3-bc2b-7904cfa04e95",
            "status": "registered",
            "createdAt": "2018-02-08T06:14:10.000Z",
            "updatedAt": "2018-02-08T06:14:10.000Z",
            "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
            "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
            "orderItems": [
                {
                    "id": "dc54775a-5c84-4e3d-8c77-5e5fc9c4e7f4",
                    "count": 3,
                    "createdAt": "2018-02-08T06:14:10.000Z",
                    "updatedAt": "2018-02-08T06:14:10.000Z",
                    "dishId": "b36da5ba-1b6c-45e4-a9eb-e9503f4ce20a",
                    "orderId": "219bff16-420a-48e3-bc2b-7904cfa04e95"
                },
                {
                    "id": "f13aa2be-87fb-498d-a863-b031ab21346c",
                    "count": 4,
                    "createdAt": "2018-02-08T06:14:10.000Z",
                    "updatedAt": "2018-02-08T06:14:10.000Z",
                    "dishId": "4ad29e90-7375-41da-bce2-caa4fe7bdee5",
                    "orderId": "219bff16-420a-48e3-bc2b-7904cfa04e95"
                }
            ]
        },
        ...
    ]
}
```


### GET @*/api/order/:orderID*

Get order data with Id= orderID
### Request
```
http://localhost:3000/api/order/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "order": {
        "id": "eeecb2c1-f521-417a-bb7b-6e1e3ad19eb2",
        "status": "registered",
        "createdAt": "2018-02-07T17:30:54.000Z",
        "updatedAt": "2018-02-07T17:30:54.000Z",
        "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "orderItems": [
            {
                "id": "6cade4fd-4f96-4e7c-b676-0da39e40e64e",
                "count": 3,
                "createdAt": "2018-02-07T17:30:54.000Z",
                "updatedAt": "2018-02-07T17:30:54.000Z",
                "dishId": "b36da5ba-1b6c-45e4-a9eb-e9503f4ce20a",
                "orderId": "eeecb2c1-f521-417a-bb7b-6e1e3ad19eb2"
            },
            {
                "id": "a94c29f9-880e-4e76-b707-1ec2ee1afdbf",
                "count": 4,
                "createdAt": "2018-02-07T17:30:54.000Z",
                "updatedAt": "2018-02-07T17:30:54.000Z",
                "dishId": "4ad29e90-7375-41da-bce2-caa4fe7bdee5",
                "orderId": "eeecb2c1-f521-417a-bb7b-6e1e3ad19eb2"
            }
        ]
    }
}

```

### DELETE @*/api/order/:orderID*

Delete order data with Id= orderID
### Request
```
http://localhost:3000/api/order/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message": "Order deleted successfully",
    "order": {
        "id": "eeecb2c1-f521-417a-bb7b-6e1e3ad19eb2",
        "status": "registered",
        "createdAt": "2018-02-07T17:30:54.000Z",
        "updatedAt": "2018-02-07T17:30:54.000Z",
        "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
    }
}

```

### PUT @*/api/order/:orderID/updateStatus*

Update order status with Id= orderID
### Request
```
{
    "status" : "processing"(String - required)
}

http://localhost:3000/api/order/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message": "Order status updated successfully",
    "order": {
        "id": "219bff16-420a-48e3-bc2b-7904cfa04e95",
        "status": "processing",
        "createdAt": "2018-02-08T06:14:10.000Z",
        "updatedAt": "2018-02-08T06:20:39.000Z",
        "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
    }
}
```
