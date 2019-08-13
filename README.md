# jwt_example

## Purpose

To understand more about JWT and its implimentation in a multi-user/multi-role Express/Handlebars test case.

## Overview



# Installation

* clone the repo
* `$ npm install`
* `$ npm run start`
* Navigate to localhost:3000

# Setup

| key       | value               | description               |
| ----------| ------------------- | ------------------------- |
|JWT_key   | 32-byte key          |Visit <a href="http://jwtbuilder.jamiekurtz.com">Signed JSON Web Token</a> to quickly create a 32-byte key with which to sign your JWT's.|
|JWT_algo  |HS256                 | JWT Algorithm. Must be a value supported by jsonwebtoken.|
|JWT_exp   |10                    | Expiration of the jwt and the HTTPonly cookie that holds it. For testing purposes this is in minutes |

