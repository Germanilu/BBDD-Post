
# How to use it

To be able to use it you will need to install Postman (https://www.postman.com/) and aim to this Heroku server:https://bbdd-post.onrender.com

![Postman](./imgReadme/postmanGif.gif)


# Endpoints

Here you can find all the methods you can use on Postman to be able to do your research.

## Auth User

    Method: POST

    URL:  /api/auth/userSignIn --> To register an account
    BODY {"name": " ", "surname":" ", "email": " ", "password": " " }  

    ---------------------------------------------------------------

    Method: POST

    URL: /api/auth/userLogin  --> User can login with his account  
    BODY {"email": " ", "password": " " }  
    ---------------------------------------------------------------

    Method: GET

    URL: /api/auth/profile --> User can see his profile


## User Profile

    Method: PUT

    URL:  /api/users/editProfile --> User can modify his own profile
    BODY {"name": " ", "surname":" ", "email": " ", "password": " " }  

    ---------------------------------------------------------------

    Method: PUT

    URL:  /api/users/editUserProfile/:userID --> Admin/ Mod  can modify other user profile with restrictions
    BODY {"name": " ", "surname":" ", "email": " ", "password": " " }  

    ---------------------------------------------------------------


## User Actions


    Method: Post

    URL:  /api/newPost --> User can add new post
    BODY {"title: " ", "description":" "} 
    ---------------------------------------------------------------

    
    Method: Get

    URL:  /api/users/getPosts --> Get alla vailable posts

    ---------------------------------------------------------------

    
    Method: PUT

    URL:  /api/editPost/:postID --> User can modify his own post
    BODY {"title": " ", "description":" "} 
    ---------------------------------------------------------------

    
    Method: Delete

    URL:  /api/users/deletePost/postID --> User can delete the post
    ---------------------------------------------------------------


## Author 	

#### [Luciano Germani](https://github.com/Germanilu) :it: