# Uber Clone Backend - API Documentation

This directory contains the backend services for the Uber Clone application.

## User Registration Endpoint

### Description
Registers a new user in the system by validating their inputs, hashing their password, and saving their profile to the database. Upon successful registration, the API returns a JWT authentication token along with the newly created user object (excluding the password).

---

### Endpoint Information
- **URL Path:** `/users/register`
- **HTTP Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

---

### Request Body Schema

The request body must be a JSON object containing the user's registration details.

| Field Name | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | **Yes** | Container object for the user's name details. |
| `fullname.firstname` | `String` | **Yes** | User's first name. Must be at least **3 characters** long. |
| `fullname.lastname` | `String` | No | User's last name. If provided, must be at least **3 characters** long. |
| `email` | `String` | **Yes** | A valid email address. |
| `password` | `String` | **Yes** | User's password. Must be at least **6 characters** long. |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

---

### Responses & Status Codes

#### 1. `201 Created`
Returned when a user is successfully registered and created in the database.

- **Response Body (JSON):**
  - `token` (String): A JWT authentication token to authenticate subsequent requests.
  - `user` (Object): The user document created in the database.

##### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIwZjBhMTIzNDU2Nzg5MDEyMzQ1NjciLCJpYXQiOjE2ODkyOTQwMDB9.someSignature",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "64b0f0a12345678901234567",
    "email": "johndoe@example.com"
  }
}
```

#### 2. `400 Bad Request`
Returned when client-side validation fails (e.g., missing required fields, invalid email format, or passwords that are too short).

- **Response Body (JSON):**
  - `error` (Array): An array of validation error objects containing details from `express-validator`.

##### Example Response (Invalid Email & Short Password):
```json
{
  "error": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be atleast 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### 3. `500 Internal Server Error`
Returned for unexpected server errors (e.g., database connection issues).

---

## User Login Endpoint

### Description
Authenticates an existing user with their email and password. Upon successful authentication, the API returns a JWT authentication token along with the user's details.

---

### Endpoint Information
- **URL Path:** `/users/login`
- **HTTP Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

---

### Request Body Schema

The request body must be a JSON object containing the user's login credentials.

| Field Name | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `email` | `String` | **Yes** | The user's registered email address. Must be a valid email format. |
| `password` | `String` | **Yes** | The user's password. Must be at least **6 characters** long. |

#### Example Request Body
```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

---

### Responses & Status Codes

#### 1. `200 OK`
Returned when the user is successfully authenticated.

- **Response Body (JSON):**
  - `token` (String): A JWT authentication token to authenticate subsequent requests.
  - `user` (Object): The authenticated user's document details.

##### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIwZjBhMTIzNDU2Nzg5MDEyMzQ1NjciLCJpYXQiOjE2ODkyOTQwMDB9.someSignature",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "64b0f0a12345678901234567",
    "email": "johndoe@example.com"
  }
}
```

#### 2. `400 Bad Request`
Returned when client-side validation fails (e.g., invalid email format or password under 6 characters).

- **Response Body (JSON):**
  - `errors` (Array): An array of validation error objects containing details from `express-validator`.

##### Example Response (Invalid Email):
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### 3. `401 Unauthorized`
Returned when authentication fails due to incorrect credentials (invalid email or wrong password).

- **Response Body (JSON):**
  - `message` (String): `"Invalid email or password"`

##### Example Response:
```json
{
  "message": "Invalid email or password"
}
```

#### 4. `500 Internal Server Error`
Returned for unexpected server errors (e.g., database connection issues).

---

## User Profile Endpoint

### Description
Retrieves the profile details of the currently logged-in user. This endpoint requires a valid JWT token passed in the Authorization header or via cookies.

---

### Endpoint Information
- **URL Path:** `/users/profile`
- **HTTP Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <JWT_token>`
  - `Cookie: token=<JWT_token>`

---

### Request Body Schema
This endpoint does not require a request body.

---

### Responses & Status Codes

#### 1. `200 OK`
Returned when the user profile is successfully retrieved.

- **Response Body (JSON):**
  - The authenticated user's profile details.

##### Example Response:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "_id": "64b0f0a12345678901234567",
  "email": "johndoe@example.com"
}
```

#### 2. `401 Unauthorized`
Returned when the request lacks a valid authentication token.

- **Response Body (JSON):**
  - `message` (String): `"Unauthorized"` (or `"Unautorized"`)

##### Example Response:
```json
{
  "message": "Unauthorized"
}
```

#### 3. `500 Internal Server Error`
Returned for unexpected server errors.

---

## User Logout Endpoint

### Description
Logs out the currently authenticated user by clearing the authentication cookie and adding the active JWT token to the blacklist collection.

---

### Endpoint Information
- **URL Path:** `/users/logout`
- **HTTP Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <JWT_token>`
  - `Cookie: token=<JWT_token>`

---

### Request Body Schema
This endpoint does not require a request body.

---

### Responses & Status Codes

#### 1. `200 OK`
Returned when the user is successfully logged out.

- **Response Body (JSON):**
  - `message` (String): `"Logged Out"`

##### Example Response:
```json
{
  "message": "Logged Out"
}
```

#### 2. `401 Unauthorized`
Returned when the request lacks a valid authentication token.

- **Response Body (JSON):**
  - `message` (String): `"Unauthorized"` (or `"Unautorized"`)

##### Example Response:
```json
{
  "message": "Unauthorized"
}
```

#### 3. `500 Internal Server Error`
Returned for unexpected server errors.

---

## Captain Registration Endpoint

### Description
Registers a new captain in the system by validating their inputs (including vehicle details), hashing their password, and saving their profile to the database. Upon successful registration, the API returns a JWT authentication token along with the newly created captain object (excluding the password).

---

### Endpoint Information
- **URL Path:** `/captains/register`
- **HTTP Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

---

### Request Body Schema

The request body must be a JSON object containing the captain's registration and vehicle details.

| Field Name | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | **Yes** | Container object for the captain's name details. |
| `fullname.firstname` | `String` | **Yes** | Captain's first name. Must be at least **3 characters** long. |
| `fullname.lastname` | `String` | **Yes** | Captain's last name. Must be at least **3 characters** long. |
| `email` | `String` | **Yes** | A valid and unique email address. |
| `password` | `String` | **Yes** | Captain's password. Must be at least **3 characters** long. |
| `vehicle` | `Object` | **Yes** | Container object for the captain's vehicle details. |
| `vehicle.color` | `String` | **Yes** | Vehicle color. Must be at least **3 characters** long. |
| `vehicle.plate` | `String` | **Yes** | Vehicle license plate number. Must be at least **3 characters** long. |
| `vehicle.capacity` | `Number` | **Yes** | Vehicle passenger capacity. Must be an integer and at least **1**. |
| `vehicle.vehicleType`| `String` | **Yes** | Type of the vehicle. Must be one of: `'car'`, `'motorcycle'`, or `'auto'`. |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "janesmith@example.com",
  "password": "securePassword456",
  "vehicle": {
    "color": "white",
    "plate": "MH-12-CD-5678",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Responses & Status Codes

#### 1. `201 Created`
Returned when a captain is successfully registered and created in the database.

- **Response Body (JSON):**
  - `token` (String): A JWT authentication token to authenticate subsequent requests.
  - `captain` (Object): The captain document created in the database.

##### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIwZjBhMTIzNDU2Nzg5MDEyMzQ1NjciLCJpYXQiOjE2ODkyOTQwMDB9.someSignature",
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "janesmith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "white",
      "plate": "MH-12-CD-5678",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "64b0f0a12345678901234567",
    "__v": 0
  }
}
```

#### 2. `400 Bad Request`
Returned when client-side validation fails (e.g., missing required fields, invalid email format, passwords or names that are too short, invalid vehicle type) or if the captain already exists.

- **Response Body (JSON):**
  - **Case A (Validation Errors):** `errors` (Array) - An array of validation error objects containing details from `express-validator`.
  - **Case B (Duplicate Email):** `message` (String) - `"Captain already exist"`

##### Example Response (Invalid Email & Short Password):
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "12",
      "msg": "Password must be atleast 3 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

##### Example Response (Duplicate Email):
```json
{
  "message": "Captain already exist"
}
```

#### 3. `500 Internal Server Error`
Returned for unexpected server errors (e.g., database connection issues).

