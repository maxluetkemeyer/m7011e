
#  Lulea Newspaper API: Documentation

## Overview

This API provides endpoints for managing articles, tags, users, user groups, user group members, and settings. It uses Express for routing and Prisma for database interactions.

## Endpoints

### Article Tags

<details>
 <summary><code>GET</code> <code><b>/article_tag</b></code> <code> (gets all article tags)</code></summary>

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns list of article tags                                        |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

</details>

<details>
 <summary><code>GET</code> <code><b>/article_tag/:articleId/:tagId</b></code> <code> (gets a specific article tag by article ID and ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `articleId`       |  required | int            | returns specific article id         |
> | `tagId`           |  required | int            | returns specific tagId id           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the specific article tag                                    |
> | `400`         | `application/json`                | returns { message: "Invalid request" }                              |

</details>


<details>
 <summary><code>POST</code> <code><b>/article_tag</b></code> <code> (creates a new article tag)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `article_id`      |  required | int            | specific article id                 |
> | `tag_id`          |  required | int            | specific tagId id                   |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created article tag                                     |
> | `400`         | `application/json`                | returns { message: "Invalid request" }                              |


 **Authorization**: Requires `author` role. 

</details>  

<details><summary><code>NO UPDATE</code> <code> (there is only the primary key!)</code></summary></details>        

<details>
 <summary><code>DELETE</code> <code><b>/article_tag/:articleId/:tagId</b></code> <code> (deletes an article tag)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `article_id`      |  required | int            | specific article id                 |
> | `tag_id`          |  required | int            | specific tagId id                   |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted article tag                                     |
> | `400`         | `application/json`                | returns { message: "Invalid request" }                              |


 **Authorization**: Requires `author` role. 

</details>    


### Articles

<details>
 <summary><code>GET</code> <code><b>/article</b></code> <code> (gets all articles)</code></summary>

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns list of articles                                            |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

</details>

 <details>
 <summary><code>GET</code> <code><b>/article/:id</b></code> <code> (gets a specific article by ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific article id                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the article                                                 |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

</details> 

<details>
 <summary><code>POST</code> <code><b>/article</b></code> <code> (creates a new article)</code></summary>

##### Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `title`           |  required | String         | article title                       |
> | `content`         |  required | String         | article body                        |
> | `image_url`       |  required | String         | article image link                  |
> | `user_id`         |  required | Int            | author's user ID                    |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created article                                         |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>      

<details>
 <summary><code>PUT</code> <code><b>/article/:id</b></code> <code> (updates an existing article)</code></summary>

 ##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific article id                 |

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `title`           |  required | String         | article title                       |
> | `content`         |  required | String         | article body                        |
> | `image_url`       |  required | String         | article image link                  |
> | `user_id`         |  required | Int            | author's user ID                    |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the updated article                                         |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>    

<details>
 <summary><code>DELETE</code> <code><b>/article/:id</b></code> <code> (deletes an article using ID)</code></summary>

 ##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific article id                 |



##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted article                                         |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>   


### Settings

<details>
 <summary><code>GET</code> <code><b>/setting</b></code> <code> (gets all settings)</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns a list of settings                                          |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details> 
 
 
<details>
 <summary><code>GET</code> <code><b>/setting/:userid</b></code> <code> (gets a specific setting by user ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `userid`          |  required | int            | specific user id                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the setting                                                 |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details> 
   

<details>
 <summary><code>POST</code> <code><b>/setting</b></code> <code> (creates a new setting)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `load_images`     |  required | Boolean        | setting to display thumbnails       |
> | `user_id`         |  required | Int            | user ID                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created setting                                                 |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details> 
 
<details>
 <summary><code>PUT</code> <code><b>/setting/:userid</b></code> <code> (updates an existing setting)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `userid`          |  required | int            | specific user id                    |

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `load_images`     |  required | Boolean        | setting to display thumbnails       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the updated setting                                         |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>DELETE</code> <code><b>/setting/:userid</b></code> <code> (deletes a specific setting using user ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `userid`          |  required | int            | specific user id                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted setting                                                 |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

### Tags

<details>
 <summary><code>GET</code> <code><b>/tag</b></code> <code> (gets all tags)</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns a list of tags                                              |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

</details>    

<details>
 <summary><code>GET</code> <code><b>/tag/:id</b></code> <code> (gets a specific tag by ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific tag id                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the tag                                                     |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

</details>    

<details>
 <summary><code>POST</code> <code><b>/tag</b></code> <code> (creates a new tag)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | tag name                            |
> | `color`           |  required | String         | tag color                           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created tag                                             |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>     

<details>
 <summary><code>PUT</code> <code><b>/tag/:id</b></code> <code> (updates an existing tag)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific tag id                     |

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | tag name                            |
> | `color`           |  required | String         | tag color                           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the updated tag                                             |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>        

<details>
 <summary><code>DELETE</code> <code><b>/tag/:id</b></code> <code> (deletes a tag)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | specific tag id                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted tag                                             |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `author` role. 
</details>      


### User Group Members

<details>
 <summary><code>GET</code> <code><b>/user_group_member</b></code> <code> (gets all user group members)</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns a list of user group members                                |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>GET</code> <code><b>/user_group_member/:groupId/:userId</b></code> <code> (gets a specific user group member by group ID and user ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `groupId`         |  required | Int            | role group ID                       |
> | `userId`          |  required | Int            | user ID                             |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the user group member                                       |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

**Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>POST</code> <code><b>/user_group_member</b></code> <code> (creates a new user group member)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `group_id`        |  required | Int            | role group ID                       |
> | `user_id`         |  required | Int            | user ID                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created user group member                                             |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>     

<details><summary><code>NO UPDATE</code> <code> (there is only the primary key!)</code></summary></details>        

<details>
 <summary><code>DELETE</code> <code><b>/user_group_member/:groupId/:userId</b></code> <code> (deletes a group member)</code></summary>


##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `groupId`         |  required | Int            | role group ID                       |
> | `userId`          |  required | Int            | user ID                             |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted group member                                    |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>   






### User Groups

<details>
 <summary><code>GET</code> <code><b>/user_group</b></code> <code> (gets all user groups)</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns a list of user groups                                       |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>GET</code> <code><b>/user_group/:id</b></code> <code> (gets a specific user group by ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | Int            | role group ID                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the user group                                              |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>POST</code> <code><b>/user_group</b></code> <code> (creates a new user group)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | role group name                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created user group                                      |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>     

<details>
 <summary><code>PUT</code> <code><b>/user_group/:id</b></code> <code> (updates an existing user group)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | role group name                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the updated user group                                      |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>       

<details>
 <summary><code>DELETE</code> <code><b>/user_group/:id</b></code> <code> (deletes an user group)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | Int            | user group ID                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted user group                                      |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>   








### Users

<details>
 <summary><code>GET</code> <code><b>/users</b></code> <code> (gets all users)</code></summary>


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns a list of users                                             |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>GET</code> <code><b>/users/:id</b></code> <code> (gets a specific user by ID)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | Int            | user ID                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the user                                                    |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>    

<details>
 <summary><code>POST</code> <code><b>/users</b></code> <code> (creates a new user)</code></summary>

##### Request Body

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | username                            |
> | `email`           |  required | String         | unique email                        |
> | `password`        |  required | String         | password in clear text              |
> | `totp_secret`     |  required | String         | 2-factor authenticator password     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the created user                                            |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>     

<details>
 <summary><code>PUT</code> <code><b>/user/:id</b></code> <code> (updates an existing user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | Int            | user ID                             |

##### Request Body
> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | String         | username                            |
> | `email`           |  required | String         | unique email                        |
> | `password`        |  required | String         | password in clear text              |
> | `totp_secret`     |  required | String         | 2-factor authenticator password     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the updated user                                            |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details>       

<details>
 <summary><code>DELETE</code> <code><b>/users/:id</b></code> <code> (deletes an user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | Int            | user ID                             |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | returns the deleted user                                            |
> | `400`         | `application/json`                | { message: "Invalid request" }                                      |

 **Authorization**: Requires `admin` role. 
</details> 



## Authorization

Certain endpoints require specific roles for access. The `groupAuthorization` middleware is used to enforce these role-based access controls.

- **`author`**: Required for creating, updating, and deleting articles and tags.
- **`admin`**: Required for managing users, user groups, user group members, and settings.

## Error Handling

All endpoints return a `400 Bad Request` status code with a message if the request is invalid or if an error occurs during the database operation.
