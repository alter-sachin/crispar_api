# Restaurant

### POST @*/api/user*

API to add new user.

#### Request

```javascript
   {    
    "name" : "afsfsf"(String - required),
    "address" : "asdasdewwesa"(String - optional),
    "facebookId" : "helloworld"(String - optional)
}
```

### Response


```javascript
    {
    "status": 0,
    "user": {
        "name": "afsfsf",
        "address": "asdasdewwesa",
        "id": "e83e1b4c-d79e-48b8-8525-63a61353fa1f",
        "updatedAt": "2018-02-08T07:41:33.117Z",
        "createdAt": "2018-02-08T07:41:33.117Z"
    },
    "message": "user added successfully"
}
}

```


### GET @*/api/user/list*

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
http://localhost:3000/api/user/list
```
    
### Response

```javascript
   {
    "status": 0,
    "users": [
        {
            "id": "139bc406-5db5-433a-bc64-025a9f0be354",
            "name": "afsfsf",
            "facebookID": null,
            "address": "asdasdewwesa",
            "createdAt": "2018-02-07T17:25:24.000Z",
            "updatedAt": "2018-02-07T17:25:24.000Z"
        },
        ...
    ]
}
```

### GET @*/api/user/:userID*

Get user data with Id= userID
### Request
```
http://localhost:3000/api/user/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "user": {
        "id": "139bc406-5db5-433a-bc64-025a9f0be354",
        "name": "afsfsf",
        "facebookID": null,
        "address": "asdasdewwesa",
        "createdAt": "2018-02-07T17:25:24.000Z",
        "updatedAt": "2018-02-07T17:25:24.000Z"
    }
}

```

### DELETE @*/api/user/:userID*

Delete user data with Id= userID
### Request
```
http://localhost:3000/api/user/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message": "user deleted successfully",
    "user": {
        "id": "139bc406-5db5-433a-bc64-025a9f0be354",
        "name": "afsfsf",
        "facebookID": null,
        "address": "asdasdewwesa",
        "createdAt": "2018-02-07T17:25:24.000Z",
        "updatedAt": "2018-02-07T17:25:24.000Z"
    }
}

```

### PUT @*/api/user/:userID*

Update user data with Id= userID
### Request

```javascript
{
    "name": "hola",
    "facebookID": "jai ho",
    "address": "new address"
}

http://localhost:3000/api/user/ed492315-070c-405e-9aa4-0d1e4673cb40
```

### Response

```javascript
{
    "status": 0,
    "message": "user updated successfully",
    "user": {
        "id": "e83e1b4c-d79e-48b8-8525-63a61353fa1f",
        "name": "hola",
        "facebookID": "jai ho",
        "address": "new address",
        "createdAt": "2018-02-08T07:41:33.000Z",
        "updatedAt": "2018-02-08T07:49:10.813Z"
    }
}

```


### GET @*/api/user/:userID/orders*

Get orders list of user with Id= userID
### Request

Return the list of orders of user in database.
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
http://localhost:3000/api/user/e83e1b4c-d79e-48b8-8525-63a61353fa1f/orders?status=completed
```

### Response

```javascript
{
    "status": 0,
    "orders": [
        {
            "id": "edb6244c-b87a-404d-a868-cc57f0d01bbf",
            "status": "completed",
            "createdAt": "2018-02-08T09:26:25.000Z",
            "updatedAt": "2018-02-08T09:27:38.000Z",
            "userId": "e83e1b4c-d79e-48b8-8525-63a61353fa1f",
            "restaurantId": "ed492315-070c-405e-9aa4-0d1e4673cb40"
        }
    ]
}

```