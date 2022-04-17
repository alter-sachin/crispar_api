# Restaurant

### POST @*/api/restaurant*

API to add new restaurant.
request body type should be application/json
#### Request

```javascript
    {   
    "name" : "La Waffle",
    "address" : "Z - 9, Metro Pillar No. 421, Block J, Rajouri Garden Extension, Rajouri Garden, New Delhi, Delhi 110027",
    "phoneNumbers" : ["096969 67050"],
    "latitude" : 28.5469,
    "longitude": 77.1858,
    "introModel":"102/102",
    "introImage":"pictures/la_waffle"
}
```

### Response


```javascript
    {
    "status": 0,
    "restaurant": {
        "name": "afsfsf",
        "address": "asdasdewwesa",
        "phoneNumbers": [
            "545344"
        ],
        "id": "71b55c40-7a41-4833-8779-a174de6d160e",
        "latitude": 155645,
        "longitude": 546432,
        "updatedAt": "2018-02-08T05:20:53.887Z",
        "createdAt": "2018-02-08T05:20:53.887Z"
    },
    "message": "Restaurant added successfully"
}
```


### GET @*/api/restaurant/list*

Return the list of restaurants in database.
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
    
### Response

```javascript
    {
    "status": 0,
    "restaurants": [
        {
            "id": "71b55c40-7a41-4833-8779-a174de6d160e",
            "name": "afsfsf",
            "address": "asdasdewwesa",
            "phoneNumbers": [
                "545344"
            ],
            "latitude": 155645,
            "longitude": 546432,
            "createdAt": "2018-02-08T05:20:53.000Z",
            "updatedAt": "2018-02-08T05:20:53.000Z"
        },
        .....
    ]
}
```

### GET @*/api/restaurant/:restaurantID*

Get restaurant data with Id= restaurantID
### Request
```
http://localhost:3000/api/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "restaurant": {
        "id": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "name": "afsfsf",
        "address": "asdasdewwesa",
        "phoneNumbers": [
            "545344"
        ],
        "latitude": 155645,
        "longitude": 546432,
        "createdAt": "2018-02-07T17:25:10.000Z",
        "updatedAt": "2018-02-07T17:25:10.000Z"
    }
}

```



### DELETE @*/api/restaurant/:restaurantID*

Delete restaurant  with Id = restaurantID
### Request
```
http://localhost:3000/api/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message" : 'Restaurant deleted successfully',
    "restaurant": {
        "id": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "name": "afsfsf",
        "address": "asdasdewwesa",
        "phoneNumbers": [
            "545344"
        ],
        "latitude": 155645,
        "longitude": 546432,
        "createdAt": "2018-02-07T17:25:10.000Z",
        "updatedAt": "2018-02-07T17:25:10.000Z"
    }
}

```

### PUT @*/api/restaurant/:restaurantID*

Update restaurant  with Id = restaurantID

### Request

Request body contains the fiels that needs to be updated and their values

```
http://localhost:3000/api/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40
{   
    "name" : "new name",
    "address" : "new address"
    "latitude" : "new latitude",
}
```

### Response

```javascript
{
    "status": 0,
    "message": "Restaurant updated successfully",
    "restaurant": {
        "id": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "name": "new name",
        "address": "new address",
        "phoneNumbers": [
            "545344"
        ],
        "latitude": 4756,
        "longitude": 546432,
        "createdAt": "2018-02-07T17:25:10.000Z",
        "updatedAt": "2018-02-08T05:37:35.929Z"
    }
}

```



### GET @*/api/restaurant/:restaurantID/orders*

Get orders list of restaurant with Id= restaurantID
### Request

Return the list of orders in database.
Defaut limit 250;


##### params  -

###### status
    String - get list of orders with status as ['registered','processing','completed'] - default registered

###### start 
    Number - start index of list - default 0
###### limit
    Number - count of restaurants required - default 250
###### sortBy
    String - define sorting field - default createdAt
###### order
    String - define sorting order ASC or DESC - default DESC

```
http://localhost:3000/api/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40/orders?order=ASC
```

### Response

```javascript
{
    "status": 0,
    "orders": [
        {
            "id": "eeecb2c1-f521-417a-bb7b-6e1e3ad19eb2",
            "status": "registered",
            "createdAt": "2018-02-07T17:30:54.000Z",
            "updatedAt": "2018-02-07T17:30:54.000Z",
            "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
            "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
        },
        {
            "id": "c6f5be6a-62fc-4db4-9886-858e6f34d0aa",
            "status": "registered",
            "createdAt": "2018-02-07T18:33:08.000Z",
            "updatedAt": "2018-02-07T18:33:08.000Z",
            "userId": "139bc406-5db5-433a-bc64-025a9f0be354",
            "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
        },
        ...
    ]
}

```


### GET @*/api/restaurant/:restaurantID/menu*

Get menu  of restaurant with Id= restaurantID


### Request



```
http://localhost:3000/api/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40/menu
```

### Response

```javascript
{
    "status": 0,
    "restaurant": {
        "categories": [
            {
                "categoryName": "indian",
                "dishes": [
                    {
                        "id": "07fbfd15-3a30-49a1-bcb8-08fee043dc71",
                        "name": "remnae",
                        "description": "buttenr in chicken",
                        "category": "indian",
                        "price": 500,
                        "modelLocation": "safdsds",
                        "createdAt": "2018-02-08T05:55:47.000Z",
                        "updatedAt": "2018-02-08T06:05:13.000Z",
                        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
                    },
                    ...
                ]
            },
            {
                "categoryName": "parantha",
                "dishes": [
                    {
                        "id": "4da3d19f-441d-4f50-af8d-f13ff2fb2fb0",
                        "name": "delte checeka",
                        "description": "buttenr in chicken",
                        "category": "parantha",
                        "price": 500,
                        "modelLocation": "safdsds",
                        "createdAt": "2018-02-07T17:59:30.000Z",
                        "updatedAt": "2018-02-07T17:59:30.000Z",
                        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
                    },
                    ...
                ]
            }
        ],
        "id": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "name": "new name",
        "address": "new address",
        "phoneNumbers": "545344",
        "latitude": 4756,
        "longitude": 546432,
        "createdAt": "2018-02-07T17:25:10.000Z",
        "updatedAt": "2018-02-08T05:37:35.000Z"
    }
}

```



### GET @*/api/search/restaurant/location*

Search for dish in database based on string match in particluar field
Limit 250
### Request

##### params  -

###### latitude
    String - latitude to search nearby - default 0
###### longitude
    String - longitude to search nearby - default 0
###### range
    String - range in area( lat long minus range ) - default 0.1
###### start 
    Number - start index of list - default 0
###### limit
    Number - count of restaurants required - default 250
###### sortBy
    String - define sorting field - default createdAt
###### order
    String - define sorting order ASC or DESC - default DESC

```
http://localhost:3000/api/search/restaurant/location?latitude=30.7548&longitude=76.7876
```
    
### Response

```javascript
{
    "status": 0,
    "restaurants": [
        {
            "id": "87731490-5340-46e3-808e-24c2d24a3b12",
            "name": "pa",
            "address": "asdasdewwesa",
            "phoneNumbers": [
                "545344"
            ],
            "latitude": 30.7548,
            "longitude": 76.7876,
            "createdAt": "2018-02-08T10:22:19.000Z",
            "updatedAt": "2018-02-08T10:22:19.000Z"
        },
        ...
    ]
}
```
