# About
This application is a simple Mongo, Express, Vue, and Node web application that allows visitors to check-in at an event by supplying thier basic contact information. The application also allows administrators to view this information in table format. 

# Non-functional Requirements
## Design 
The application should be able to run in tablet environment. Therefore each of the pages displayed to the user/administrator should be finger-friendly, i.e. each item that can be selected should be large enough for a human finger to tap on but not so large that it appears odd when viewed from a desktop computer. Furthermore selectable components should maintain large enough margins to not be spaced so close together and they should be well padded to increase the total selectable area of the component without increasing its size. Lastly, when a component requires user input the keyboard displayed on the screen should automatically adapt itself to the input required. This not only makes it faster for the user to input information while checking-in, but it will also reduce the likelihood of user-input errors and thus increase check-in throughput. 

## Tools 
This application will make use of the MEVN web-stack (MongoDB, Express.js, Vue.js, and Node.js). I have chosen this web-stack as it is comprised of the technologies I used during my CSC 583 - Software Processes course. Therefore I am familar with these techologies and this will lead to the project having a higher likelihood of success. This stack was also chosen as the MEN-portion of the stack is comprised of industry standard technologies while the V-portion is known to be very user friendly. 

To actually get started working on this project I chose vue-cli as it makes starting a Vue.js project from scratch easy. I also chose it because it configures webpack for you and makes it very easy to run the application. 

To make the application more visually appealing I have included Bootstrap-Vue as it was simple enough to install and has very well written documentation. I research other styling frameworks such as Buefy and Vue-Material, but I found the simplicity of Bootstrap-Vue the most appealing. 

# Architecture 
This application uses the tried-and-true three-tier architecture. Vue.js handles the front-end visual interface and all dynamic routing (first-tier). Express.js and Node.js provide the front-end with all the API-endpoints needed to populate the front-end with useful data (second-tier). MongoDB is what makes user data presist and what API-endpoints use to store and retrieve data (third-tier).  

# Plan of Action 

## Frontend 
- [x] Install vue-cli and start a new vue project
- [x] Create a check-in and administrator components
- [x] Complete the check-in component: 
  - [x] Install Vee-Validate, Axios, and Bootstrap-Vue
  - [x] Create form outline 
  - [x] Add form front-end validation 
  - [x] Write form submission method 
  - [x] Add form styling 
  - [x] Add automatic form clearing after submission 
- [x] Complete the admin component: 
  - [x] Install Vue-Loading-Spinner 
  - [x] Create basic table structure 
  - [x] Add pagination buttons and develope pagination strategy  
  - [x] Write backend query method 
  - [x] Add loading icon
  - [x] Create modal sign-in form 
  - [x] Implement sign-in frontend logic 

## Backend
- [x] Install Node.js and Node Package Manager
- [x] Complete server.js file 
- [x] Create Check-In backend infrastructure 
  - [x] Create Visitor schema 
  - [x] Create `/visitor/add` API-endpoint to handle form submission
  - [x] Create `/visitor/get/:offset/:max` API-endpoint to handle data retrieval and pagination
  - [x] Add automatic email generation to `/visitor/add`
- [x] Create Admin backend infrastructure 
  - [x] Create Admin schema 
  - [x] Create `/admin/add` API-endpoint to handle new admin creation
  - [x] Create `/admin/login` API-endpoint to handle authentication 
  - [x] Add password hashin to `/admin/login` API-endpoint

## General 
- [ ] Finish README
- [ ] Add tablet specific styling to frontend 
- [ ] Add dummy data to DB
- [ ] Deploy to Digital Ocean
- [ ] Test application on tablet

# Installation Instructions
Before installing this application make sure that you have already installed Node and the Node Package Manager (NPM). Once you have done that clone this repository: 
```bash
git clone https://github.com/hugoLucas/check_in
```
Next enter the directory where the application was cloned into and install the application dependencies with NPM: 
``` bash
cd check_in
npm install 
```
Once that is complete you can now run the front-end with any of the following commands: 
``` bash
# serve with hot reload
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader). The backend can be run from the root directory using the following: 
```bash
./node_modules/nodemon/bin/nodemon.js server.js
```
Lastly, create a `.env` file with the following fields:
```
PORT=<frontend port number>
MONGO_URI=<address for mongodb>
SOURCE_EMAIL=<gmail account that generates admin emails>
SOURCE_PASSWORD=<password for above gmail account>
DESTINATION_EMAIL=<where to send admin emails>
```

# User View 
This page can be accessed from `http://<address>:<port>/`. This page's features include:  
  1. Automatic and Conditional Form Validation 
  2. Pop-Up Descriptions for Each Field 
  3. Automatic redirection on Submission 
  4. Email notifications for Sucessful User Check-Ins

# Admin View
This page can be accessed from `http://<adress>:<port>/admin`. This page's features include:
  1. Administrator Authentication 
  2. Result Pagination 
  3. Loading Icon for Backend Data Retrival
