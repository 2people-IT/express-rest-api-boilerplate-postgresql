<a name="top"></a>
# express-rest-api-boilerplate v0.0.0



# Table of contents

- [Auth](#Auth)
  - [Authenticate with Apple](#Authenticate-with-Apple)
  - [Authenticate with Email and Password](#Authenticate-with-Email-and-Password)
  - [Authenticate with Facebook](#Authenticate-with-Facebook)
  - [Authenticate with Github](#Authenticate-with-Github)
  - [Authenticate with Google](#Authenticate-with-Google)
  - [Authenticate with Vk](#Authenticate-with-Vk)
- [User](#User)
  - [Create user](#Create-user)
  - [Delete user](#Delete-user)
  - [Render users via HTML](#Render-users-via-HTML)
  - [Retrieve current user](#Retrieve-current-user)
  - [Retrieve user](#Retrieve-user)
  - [Retrieve users](#Retrieve-users)
  - [Update password](#Update-password)
  - [Update user](#Update-user)

___


# <a name='Auth'></a> Auth

## <a name='Authenticate-with-Apple'></a> Authenticate with Apple
[Back to top](#top)

```
POST /auth/apple
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Apple user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Email-and-Password'></a> Authenticate with Email and Password
[Back to top](#top)

```
POST /auth
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with email and password.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Master access only or invalid credentials.</p> |

## <a name='Authenticate-with-Facebook'></a> Authenticate with Facebook
[Back to top](#top)

```
POST /auth/facebook
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Facebook user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Github'></a> Authenticate with Github
[Back to top](#top)

```
POST /auth/github
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Github user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Google'></a> Authenticate with Google
[Back to top](#top)

```
POST /auth/google
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Google user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Vk'></a> Authenticate with Vk
[Back to top](#top)

```
POST /auth/vk
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Vk user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

# <a name='User'></a> User

## <a name='Create-user'></a> Create user
[Back to top](#top)

```
POST /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Master access_token.</p> |
| email | `String` | <p>User's email.</p> |
| password | `String` | <p>User's password.</p> |
| name | `String` | **optional** <p>User's name.</p> |
| picture | `String` | **optional** <p>User's picture.</p> |
| role | `String` | **optional** <p>User's role.</p>_Default value: user_<br>_Allowed values: user,admin_ |

### Success response

#### Success response - `Sucess 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Master access only.</p> |
| 409 |  | <p>Email already registered.</p> |

## <a name='Delete-user'></a> Delete user
[Back to top](#top)

```
DELETE /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Render-users-via-HTML'></a> Render users via HTML
[Back to top](#top)

```
GET /users/html
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | <p>List of users.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Admin access only.</p> |

## <a name='Retrieve-current-user'></a> Retrieve current user
[Back to top](#top)

```
GET /users/me
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

## <a name='Retrieve-user'></a> Retrieve user
[Back to top](#top)

```
GET /users/:id
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>User not found.</p> |

## <a name='Retrieve-users'></a> Retrieve users
[Back to top](#top)

```
GET /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | <p>List of users.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Admin access only.</p> |

## <a name='Update-password'></a> Update password
[Back to top](#top)

```
PUT /users/:id/password
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with email and password.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| password | `String` | <p>User's new password.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Update-user'></a> Update user
[Back to top](#top)

```
PUT /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| name | `String` | **optional** <p>User's name.</p> |
| picture | `String` | **optional** <p>User's picture.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

