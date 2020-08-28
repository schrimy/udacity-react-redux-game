# Udacity REACT-Redux would you rather game
 
## Table of contents
 
* [Overview](#overview)
* [Instructions](#instructions)
* [Resources](#resources)
 
## Overview
 
'Would you rather' is an app built using React and Redux where the user has to choose between two answers. It stores the main data in the Redux store, which holds the user and questions state. The user can vote / select from one of two options relevant to the question. Upon doing so the selected question is highlighted and the overall number of votes and percentage is shown for each option.
 
The user can also create new questions, with two possible answers, which is then added to the list of available questions. As each question is answered that particular question is then displayed in the answered questions section. Each user is also ranked according to the number of questions asked and questions answered on the leaderboard screen.
 
I also added the extra functionality of being able to sign up a new user as well as log in as an existing user. If the requested username is already in use an alert is displayed and the user is asked to select a new username. The login also validates if the username and password match to the current list of users.
 
This App works across all major screen sizes and uses 'react-router' in order to navigate via url. However, due to the current 'mocked' backend once the page is refreshed any newly created user is wiped from the store state and backend.
 
 
## Instructions
 
* Once the files have been copied over use `yarn add` or `npm i` to install all dependencies.
* Then, `yarn start` or `npm start` to run the dev server and show in the browser.
* Run `yarn build` or `npm build` to produce a distribution folder of minified files.
* For ease of use use the username 'johndoe' and password 'three' to log-in to the app.
* Alternatively use the sign up button to create your own user profile.
 
 
## Resources
 
[Svg-Path-Editor](https://yqnn.github.io/svg-path-editor/) - to create the tick svg file (23/08/2020)

[Pexels](https://www.pexels.com/photo/yawning-cat-1576193/) - New user cat image for avatar (24/08/2020)

[react-router](https://reactrouter.com/web/example/auth-workflow) - way to build out a protected route (25/08/2020)

[codedaily](https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router) - way to build out a protected route (25/08/2020)

[MDN](https://developer.mozilla.org/en-US/) - for general definitions and use of syntax

[stack-overflow](https://stackoverflow.com/) - for general help and use of syntax