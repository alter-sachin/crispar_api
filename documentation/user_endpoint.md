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

