# PostManager - Backend

The backend of the [Post Manager project](https://github.com/nothingnothings/PostManager).

Essentially a Node.js REST API backend with authentication and post creation logic, connected to a ReactJS frontend and deployed on the Heroku platform.


## Technologies

Some of the Languages, Libraries and Packages employed on this backend:

- Node
- Express.js (middleware-based Node.js framework; used for an enhanced backend endpoint setup)
- Node Package Manager (for bootstrapping and managing the Node.js app)
- MongoDB (noSQL database storage solution; storage of `user` and `post` objects into collections in a remote MongoDB Atlas database)
- `body-parser` (needed for the parsing of the JSON data sent by the frontend)
- `express-validator` (validation of inputted user data, on the backend, with methods such as "isEmpty()" and "isLength()")
- `bcryptjs` (used for storing encrypted passwords inside of `user` documents on MongoDB database)
- `multer` - used for receiving product image files, on the "Add a Product" endpoint (disabled on this demo version of the app)
- `jsonwebtoken` (for the generation of JSON Web Tokens, which are then stored on the local storage of the user's browser and then checked for authentication)


## Project Directory Structure

The REST API backend's directory structure:

```
.\
│
├── config\
│   ├── dev.js
│   ├── keys.js
│   └── prod.js
│
├── controllers\
│   ├── auth.js
│   └── feed.js
│
├── images\
│   ├── 504c296d-482d-4d6a-8821-9991b3ea47c6-0c64c92d97cf2c5f4ce1be7b81537d55.png
│   ├── 90fd0c3b-533d-4a9a-92c4-ab5af0cb6f6f-nodejs_original_wordmark_logo_icon_146412.png
│   ├── 9409c72d-3fb3-43e3-b499-396752769a5e-Unofficial_JavaScript_logo_2.svg.png
│   ├── aec4a1bc-c807-4b12-8772-dd7d7e4cf309-mongodb_original_wordmark_logo_icon_146425.png
│   ├── ca6cceac-4648-457b-9306-273b22427567-Unofficial_JavaScript_logo_2.svg.png
│   ├── d3ff5457-17c2-4b71-895e-4802b63cdd7a-logo-og.png
│   ├── d980ff73-f1da-488b-bc21-42efffcfa220-0c64c92d97cf2c5f4ce1be7b81537d55.png
│   ├── e17bbaa2-ef31-4d34-ab98-949ffafc7594-Unofficial_JavaScript_logo_2.svg.png
│   ├── eb3f5305-bd34-43e5-baa6-374b19358510-mobile-first-.jpg
│   └── f2036847-ce43-4135-8519-4c5b3d4030c1-Unofficial_JavaScript_logo_2.svg.png
│
├── middlewareHelpers\
│   └── is-auth.js
│
├── models\
│   ├── post.js
│   └── user.js
│
├── routes\
│   ├── auth.js
│   └── feed.js
│
├── .gitignore
├── app.js
├── package-lock.json
└── package.json
```

## Project Configuration Files (package.json)

The package.json file used in the project:

```
{
  "name": "nodeexpressbackend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.13.0",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^4.2.0",
    "mongoose": "^6.0.13",
    "multer": "^1.4.3",
    "uuid": "^8.3.2"
  }
}


```

## Setup

To use this project, clone it using Git:

1. Run `git clone` to clone the project into your local Git repository
2. Run `npm install` to install all dependencies (`express`, `bcryptjs`, `mongodb`, etc)
3. Run `npm start` to spin up the the app
4. Use the server locally or deploy it on the web, with the help of a hosting provider (e.g. Heroku)
5. For the purposes of this demo, on the "Get Started" (Authentication) page, input the credentials `exemplo@exemplo.com` (email) and `exemplo` (password) to access the apps's various features

## Features

- Single-Page Application, no page reloads, single HTML file (ReactJS)
- Application divided into many components, of which some are used more than a single time, on different pages (ReactJS design philosophy)
- Form validation logic, in the landing page, powered by ReactJS's state management
- Responsive design (adaptive, mobile and desktop support) created with Flexbox and media queries
- Usage of GitHub Actions and GitHub Pages with the create-react-app utility for a seamless workflow (transition from development stage to production/deployment stage). Upon the git push command, GitHub Actions transfers the contents of the master branch into the gh-pages branch, which then deploys the app at https://nothingnothings.github.io/PostManager
- Addition/removal of CSS classes ("fadeEnter" animation) implemented with `react-transition-group`
- For deployment demonstration purposes, only a single user is enabled/created on the serverside, with the credentials exemplo@exemplo.com (email field) and exemplo (password field). Furthermore, the "Posts" made by the user are reset every 1 Hour (MongoDB "Scheduled Trigger" feature)
- Custom favicon, compatible with multiple devices
- Simple pagination logic for the list of posts ("Next" and "Previous" buttons)
- Usage of the `fetch()` API for communication with the Node.js (Express.js) backend, which manages the "User" and "Post" objects, stored on a MongoDB database (MongoDB Atlas service); the Node.js server and MongoDB database also handle the authentication logic (login) implemented on the app

## Inspiration

Inspired by the "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" and "React - The Complete Guide (incl Hooks, React Router, Redux)" courses by Maximilian Schwarzmüller.
