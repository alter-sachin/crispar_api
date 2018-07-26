# Dish

### POST @*/api/dish*

API to add new dish.

#### Request

```javascript
    {   
    "name" : "delte checeka"(String -required),
    "restaurantId" : "9ed0bd26-6d1e-4d18-ba2e-12232d19b287"( UUID - required),
    "category" : "parantha"(String -required),
    "description" : "buttenr in chicken"(String -required),
    "price" : 500(INTEGER -required),
    "modelLocation" : "safdsds",(String -required)
    "process" : {
        //process is object - optional
        "name" : "delete check",(String -required)
        "description" : "hello world"(String -optional)
    },
    "flavour" : {
        //flavour is object - optional
        "name" : "delete check"(String -required),
        "description" : "hello world"(String -optional)
    },
    "ingredients" : [
        //ingredients is array - optional
        {
            "name" : "Butter",(String -required)
            "description"  : "cream"(String -optional)
        },
        {
            "name" : "Hello",(String -required)
            "description" : "murga"(String -optional)
        }
        ]
        
    
}
```

### Response


```javascript
    {
    "status": 0,
    "message" : 'Dish added succesfully'
    "dish": {
        "name": "delte checeka",
        "category": "parantha",
        "description": "buttenr in chicken",
        "price": 500,
        "modelLocation": "safdsds",
        "id": "07fbfd15-3a30-49a1-bcb8-08fee043dc71",
        "updatedAt": "2018-02-08T05:55:47.133Z",
        "createdAt": "2018-02-08T05:55:47.078Z",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
    }
}
```


### GET @*/api/dish/list*

Return the list of dishes in database.
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
http://localhost:3000/api/dish/list
```
    
### Response

```javascript
   {
    "status": 0,
    "dish": [
        {
            "id": "07fbfd15-3a30-49a1-bcb8-08fee043dc71",
            "name": "delte checeka",
            "description": "buttenr in chicken",
            "category": "parantha",
            "price": 500,
            "modelLocation": "safdsds",
            "createdAt": "2018-02-08T05:55:47.000Z",
            "updatedAt": "2018-02-08T05:55:47.000Z",
            "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
            "processes": [
                {
                    "id": "1c6a17a1-b7f2-418d-baf7-14794a901de8",
                    "name": "delete check",
                    "description": "hello world",
                    "createdAt": "2018-02-08T05:55:46.000Z",
                    "updatedAt": "2018-02-08T05:55:47.000Z",
                    "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                }
            ],
            "flavours": [
                {
                    "id": "bd64ccc9-8b14-42d8-8df0-6baff166e03f",
                    "name": "delete check",
                    "description": null,
                    "createdAt": "2018-02-08T05:55:46.000Z",
                    "updatedAt": "2018-02-08T05:55:47.000Z",
                    "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                }
            ],
            "ingredients": [
                {
                    "id": "37cec556-9d3f-4b8a-92f0-0569d80f8f9a",
                    "name": "hello",
                    "description": "murga",
                    "createdAt": "2018-02-07T17:26:41.000Z",
                    "updatedAt": "2018-02-07T17:26:41.000Z",
                    "IngredientDishMap": {
                        "createdAt": "2018-02-08T05:55:47.000Z",
                        "updatedAt": "2018-02-08T05:55:47.000Z",
                        "ingredientId": "37cec556-9d3f-4b8a-92f0-0569d80f8f9a",
                        "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                    }
                },
                {
                    "id": "bcfe7a27-b26a-4cbe-9e71-09cc4f0e4360",
                    "name": "butter",
                    "description": "cream",
                    "createdAt": "2018-02-07T17:26:41.000Z",
                    "updatedAt": "2018-02-07T17:26:41.000Z",
                    "IngredientDishMap": {
                        "createdAt": "2018-02-08T05:55:47.000Z",
                        "updatedAt": "2018-02-08T05:55:47.000Z",
                        "ingredientId": "bcfe7a27-b26a-4cbe-9e71-09cc4f0e4360",
                        "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                    }
                }
            ]
        },
        ...
    ]
}
}
```

### GET @*/api/dish/:dishID*

Get dish data with Id= dishID
### Request
```
http://localhost:3000/api/dish/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "dish": {
        "id": "f710ea4e-697e-4f6b-900d-9dac7eb9483b",
        "name": "delte checeka",
        "description": "buttenr in chicken",
        "category": "parantha",
        "price": 500,
        "modelLocation": "safdsds",
        "createdAt": "2018-02-08T05:52:28.000Z",
        "updatedAt": "2018-02-08T05:52:28.000Z",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "processes": [
            {
                "id": "ec876b87-e80b-44a3-bbbf-b136196e4f98",
                "name": "delete check",
                "description": "hello world",
                "createdAt": "2018-02-08T05:52:28.000Z",
                "updatedAt": "2018-02-08T05:52:28.000Z",
                "dishId": "f710ea4e-697e-4f6b-900d-9dac7eb9483b"
            }
        ],
        "ingredients": [],
        "flavours": [
            {
                "id": "a15324cc-335f-4dd7-a7d9-cdee77cf12d2",
                "name": "delete check",
                "description": null,
                "createdAt": "2018-02-08T05:52:28.000Z",
                "updatedAt": "2018-02-08T05:52:28.000Z",
                "dishId": "f710ea4e-697e-4f6b-900d-9dac7eb9483b"
            }
        ]
    }
}

```

### DELETE @*/api/dish/:dishID*

Delete dish  with Id= dishID
### Request
```
http://localhost:3000/api/dish/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message": "dish deleted successfully",
    "dish": {
        "id": "f710ea4e-697e-4f6b-900d-9dac7eb9483b",
        "name": "delte checeka",
        "description": "buttenr in chicken",
        "category": "parantha",
        "price": 500,
        "modelLocation": "safdsds",
        "createdAt": "2018-02-08T05:52:28.000Z",
        "updatedAt": "2018-02-08T05:52:28.000Z",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
    }
}

```


### PUT @*/api/dish/:dishID*

Update dish  with Id = dishID

### Request

Request body contains the fiels that needs to be updated and their values

```
http://localhost:3000/dish/restaurant/ed492315-070c-405e-9aa4-0d1e4673cb40
{   
    "name" : "remnae",
    "category" : "indian",
    "description" : "buttenr in chicken",
    "price" : 500,
    "modelLocation" : "safdsds",
    "process" : {
        "name" : "renaem",
        "description" : "hello world"
    },
    "flavour" : {
        "name" : "delete check renaem",
        "description" : "hola bhola"
    },
    "ingredients" : [
        {
            "name" : "PButter rename",
            "description"  : "cream"
        },
        {
            "name" : "HePllo rename",
            "description" : "murga"
        }
        ]
        
    
}
```

### Response

```javascript
{
    "status": 0,
    "message": "Dish updated successfully",
    "dish": {
        "id": "07fbfd15-3a30-49a1-bcb8-08fee043dc71",
        "name": "remnae",
        "description": "buttenr in chicken",
        "category": "indian",
        "price": 500,
        "modelLocation": "safdsds",
        "createdAt": "2018-02-08T05:55:47.000Z",
        "updatedAt": "2018-02-08T06:05:13.000Z",
        "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40",
        "processes": [
            {
                "id": "1c6a17a1-b7f2-418d-baf7-14794a901de8",
                "name": "renaem",
                "description": "hello world",
                "createdAt": "2018-02-08T05:55:46.000Z",
                "updatedAt": "2018-02-08T06:05:12.000Z",
                "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
            }
        ],
        "ingredients": [
            {
                "id": "c97372e4-2265-4935-96fd-ed3664a592e2",
                "name": "hepllo rename",
                "description": "murga",
                "createdAt": "2018-02-08T06:05:12.000Z",
                "updatedAt": "2018-02-08T06:05:12.000Z",
                "IngredientDishMap": {
                    "createdAt": "2018-02-08T06:05:13.000Z",
                    "updatedAt": "2018-02-08T06:05:13.000Z",
                    "ingredientId": "c97372e4-2265-4935-96fd-ed3664a592e2",
                    "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                }
            },
            {
                "id": "caa45204-1e21-4fb5-9db1-54e4e19e25c5",
                "name": "pbutter rename",
                "description": "cream",
                "createdAt": "2018-02-08T06:05:12.000Z",
                "updatedAt": "2018-02-08T06:05:12.000Z",
                "IngredientDishMap": {
                    "createdAt": "2018-02-08T06:05:13.000Z",
                    "updatedAt": "2018-02-08T06:05:13.000Z",
                    "ingredientId": "caa45204-1e21-4fb5-9db1-54e4e19e25c5",
                    "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
                }
            }
        ],
        "flavours": [
            {
                "id": "bd64ccc9-8b14-42d8-8df0-6baff166e03f",
                "name": "delete check renaem",
                "description": "hola bhola",
                "createdAt": "2018-02-08T05:55:46.000Z",
                "updatedAt": "2018-02-08T06:05:12.000Z",
                "dishId": "07fbfd15-3a30-49a1-bcb8-08fee043dc71"
            }
        ]
    }
}

```



### GET @*/api/search/dish*

Search for dish in database based on string match in particluar field
Limit 250
### Request

##### params  -

###### search 
    String - string to match in dish fields - default ''
###### field
    String - database field name in which to search - default 'name'
###### start 
    Number - start index of list - default 0
###### limit
    Number - count of restaurants required - default 250
###### sortBy
    String - define sorting field - default createdAt
###### order
    String - define sorting order ASC or DESC - default DESC

```
http://localhost:3000/api/search/dish?search=p&field=category
```
    
### Response

```javascript
{
    "status": 0,
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
        }
        ...
    ]
}
```