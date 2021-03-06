# 🔥️ Guama Server
## Dependecies
- **Expresss** --> API framework
- **Socket.IO** --> Realtime Websocket communication
- **Cors** --> Set's cross origin resource headers
- **Helmet** --> Set's some headers to be more secure
- **Morgan** --> Small http logger
- **Nodemon** --> Development code live realoader
- **MongoDB** --> No SQL Database
- **Bcrypt** --> Password hasher
- **NanoID** --> Small ID generator
- **Terminal-Kit** --> Terminal input parser and display

## Work Log 📔️
### V1 - Thoothpick 🥢
- [x] **Create boilerplate code with base dependecies**
	* [x] Import in modules
	* [x] Create Instances of Http, Express, Socket
	* [x] Use express middlewares
	* [x] Create hello world route
	* [x] Comment code
- [x] **GitHub repo**
	* [x] Create repo
	* [x] Push boilerplate code
- [x] **Router for API** 
	* [x] Add route map
	* [x] Create router structure
- [x] **Register API**
  * [x] Get user input
  * [x] Verify user input
  * [x] Controll input by rules
  	- [x] Username length
  	- [x] Email validation
  	- [x] Password length
  	- [x] Password capitalize
  	- [x] Password special character
  * [x] Check if user doen't already exist
  	- [x] Check duplicate email
  * [x] Add user to database
  	- [x] Create database connection file
  	- [x] Create setting for database string
  	- [x] Create user id
  	- [x] Create user data
  	- [x] Save to database
  * [x] Respond
- [x] **Login API**
  * [x] Get Input
  * [x] Verify Input
  * [x] Validate user
  * [x] Create token
  * [x] Respond
  * [x] Create Session
- [x] **Session logic**
	* [x] Create Session
		- [x] Based on TOKEN
		- [x] Has TOKEN
		- [x] Has user ID
		- [x] Has EXPIRE
	* [x] Check session
    - [x] Check if user has a session
    - [x] Respond
  * [x] Socket middleware
  	- [x] Get token from headers or auth
  	- [x] Check if token exists
  	- [x] Append socket to token
  	- [x] Remove socket on disconnect
- [x] **Me Api**
	* [x] / - Gets your data 
    - [x] Check session
    - [x] Req parser
    - [x] Get token (Cookie or Auth)
    - [x] Get user details from id
    - [x] Get status
    - [x] Return details
- [x] **User API**
	* [x] / [GET] - Gets your user list
		- [x] Get users friendlist
		- [x] Find all users
		- [x] Get Data
		- [x] Reponse
  * [x] :ID [GET] - Gets users info based on id
  	- [x] Check session
  	- [x] Get token
  	- [x] Check if can get details
    - [x] Get user details
  	- [x] If friends return more details
    - [x] Parse user details
  	- [x] Retrun details
  	- [x] Respond
  * [x] ADD/:ID [GET] - Sends friend request
    - [x] Check session
  	- [x] Get token
  	- [x] Check if not already friends
  	- [x] Check if not already send
  	- [x] Check if not already pending
    - [x] Add user
  	- [x] Respond
  	- [x] Socket
  * [x] REMOVE/:ID [GET] - Removes user from friends
  	- [x] Check if user is friend
  	- [x] Remove
  	- [x] Respond
  	- [x] Socket
  * [x] ANSWER/:ID [GET] - Accepts or Declines friend request
   	- [x] Get user data
  	- [x] Validate user input
  	- [x] Check if user has pending
  	- [x] Accept/Decline
  	- [x] Respond
  	- [x] Socket
  * [x] FIND [POST] - Finds users based on data
    - [x] Get user data
  	- [x] Validate user input
  	- [x] Find users
  	- [x] Respond
- [x] **Message API**
	* [x] / [GET] - All messages
		- [x] Get all text unique ID's
		- [x] Remove own id
		- [x] Find recent chats with id's
		- [x] Return found chats
	* [x] :ID [GET] - Messages from user
		- [x] Get ID from params
		- [x] Retreve messages
		- [x] Respond
	* [x] SEND/:ID - Send message to user
		- [x] Get ID from params
		- [x] Get user data
		- [x] Validate user data
		- [x] Send Message
      * [x] Check if can send message to user
      * [x] New or Old chat?
			* [x] Parse message
			* [x] Append to message colletion
		- [x] Response / Error
		- [x] Socket IO message
- [x] **Socket**
  * [x] Middleware
  * [x] Append to socket
  * [x] Remove from socket
  * [x] Add User
  * [x] Status
  * [x] Remove User
  * [x] Accept/Decline User
  * [x] Messages
- [x] **Flags**
	* [x] Terminal
	* [x] Debug
- [x] **Terminal**
	* [x] Boilerplate
	* [x] Clear
	* [x] Exit 
	* [x] addUser