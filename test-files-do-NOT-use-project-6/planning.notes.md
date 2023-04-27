# Project 6
`https://github.com/burlingtoncodeacademy-students/reactchat-ashlee-and-john`

## Team A.L.J.I.
`A`shlee `L`indstrom & `J`ohn `I`sabella

## Files Needed

### Controllers
    Message
    User
    Room

### Models
    Message
    User
    Room


## Schema
### Message
    {
        "when": "2018-07-15T20:00:47.696Z", (DATE)
        "user": "John",
        "room": "Main",
        "body": "I really want to attend NASA's DEVELOP program this summer!"
    }
    Tie the messages to become an owner

### User
    {
        "firstName": "John",
        "lastName": "Wick",
        "email": "jwick@puppyfinder.com",
        "password": "focusCommitment1979"
    }
    Tie messages to ID (OBJECT ID)

### Room
    {
        "name": "Continental",
        "description": "No business conducted",
        "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
    }

## Endpoints
### Message
    /message/display-all (GET)
    /message/create (POST)
    /message/update/:id (PATCH)
    /message/delete/:id (DELETE)

### User
    /user/create (POST)
    /user/login (POST)
    /user/update/:id (PATCH) - Icebox
    /user/delete/:id (DELETE) - Icebox

### Room
    /room/create (POST)
    /room/display-all (GET)
    /room/update/:id (PATCH) - Icebox
    /room/delete/:id (DELETE) - Icebox


## Icebox Notes

Hiding the CRUD - Reference the `Broken Server` .env to hide secret password

Add middleware for `isAdmin`
