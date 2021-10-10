# 🔥️ Guama Server
## Dependecies
- **Expresss** --> API framework
- **Socket.IO** --> Realtime Websocket communication
- **Cors** --> Set's cross origin resource headers
- **Helmet** --> Set's some headers to be mroe secure
- **Morgan** --> Small http logger
- **Nodemon** --> Development code live realoader
- **MongoDB** --> No SQL Database
- **Bcrypt** --> Password hasher

## Work Log 📔️
- [x] **Create boilerplate code with base dependecies**
	* [x] Import in modules
	* [x] Create Instances   } of Http, Express, Socket
	* [x] Use express middlewares
	* [x] Create hello world route
	* [x] Comment code
- [x] **Create and push to GitHub repo**
	* [x] Create repo
	* [x] Push boilerplate code
- [x] **Create router for API**
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
  * [x] Respond
  * [ ] Create Session
- [ ] **Session logic**
	* [ ] Create Session
		- [ ] Based on TOKEN
		- [ ] Has TOKEN
		- [ ] Has user ID
		- [ ] Has EXPIRE
		- [ ] Has SOCKET array
  * [ ] Reverse search by ID
		- [ ] object key is ID
		- [ ] value array of TOKENS
		- [ ] value array of SOCKETS