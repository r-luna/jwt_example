# jwt_example

## Purpose

To understand more about JWT and its implimentation in a multi-user/multi-role Express/Handlebars test case.

## Overview

This example app is built on Express and Handlebars. The jsonwebtoken package handles JWT creation/verification. The JWT itself is held in an HTTPonly cookie. A `validatePermissions` middleware handles route access depending on the role of the currently logged-in user. For simplicity users are held in an array of user objects.

On successful authentication the user is redirected to the home page.

The username and role type is printed at the top of all pages after succesful login.

Note that the HTTPonly cookie in this example does not have the "secure" flag set as https is not available when running the app locally. See <a target="_blank" href="http://expressjs.com/en/api.html#res.cookie">res.cookie options</a>.

## Workflow
1. User log's in
2. Upon successful login a JWT with claims referring to the user's username and role is created.
3. The JWT is sent to the client via an HTTPonly cookie named simply as `token`.
4. Navigating the site causes express to inspect the `token` as needed where it is verified against the 32-byte key used to create it.
5. Restricted pages, upon JWT verification, use the `role` claim to determine access to the page in question.

## Installation And Use

* Clone the repo
* `$ npm install`
* `$ npm run start`
* Navigate to localhost:3000
* Navigate to the restricted pages title "Page 1", and "Page 2" - note you will be "unauthorized"
* Login as one of the three provided users noting the associated roles
* Navigate to the restricted pages

## Setup

Place a `.env` file in the project root with the following values.

| key       | value               | description               |
| ----------| ------------------- | ------------------------- |
|JWT_key   | 32-byte key          |Visit <a href="http://jwtbuilder.jamiekurtz.com">Signed JSON Web Token</a> to quickly create a 32-byte key with which to sign your JWT's. Or simply create a random string of 32 characters.|
|JWT_algo  |HS256                 | JWT Algorithm. Must be a value supported by jsonwebtoken.|
|JWT_exp   |10                    | In minutes, the expiration of the jwt and the HTTPonly cookie that holds it. |

## API

> POST /users/login

### Payload

Sample payload:

```javascript
{
 "useremail": "someone@nowhere.com",
 "password": "qwerty"
}

```
### 301 redirect
Upon successfull authentication the user is redirected to the home page.

The service can be easily modified to return the following 200.

### 200 OK
Sample response:
```javascript
{
 "success": true,
 "message": "Login success",
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMyI6ImQzIiwiZGF0YTQiOiJkNCIsInR5cCI6IkpXVCIsImlzcyI6IkFDTUUgSW5jIiwic3ViaiI6InZhbGlkdXNlciIsImF1ZCI6IlVzZXJHcm91cDEiLCJleHAiOjE1NjU2NjExMDUsImFsZyI6IkhTMjU2IiwiaWF0IjoxNTY1NjYwNTA1fQ.TgVmrqLU-JB9cfEZg_omeAconNL4KzhGyu9mYMc7aFM"
}
```
