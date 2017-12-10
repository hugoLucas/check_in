# About
This application is a simple Mongo, Express, Vue, and Node web application that allows visitors to check-in at an event by supplying thier basic contact information. The application also allows administrators to view this information in table format. 

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
TO-DO 
```
