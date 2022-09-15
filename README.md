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
├── public\
│   ├── 404.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│
├── src\
│   │
│   ├── components\
│   │   │
│   │   ├── Backdrop\
│   │   │   ├── Backdrop.css
│   │   │   └── Backdrop.js
│   │   │
│   │   ├── Button\
│   │   │   ├── Button.css
│   │   │   └── Button.js
│   │   │
│   │   ├── ErrorHandler\
│   │   │   └── ErrorHandler.js
│   │   │
│   │   ├── Feed\
│   │   │   │
│   │   │   └── Post\
│   │   │       ├── Post.css
│   │   │       └── Post.js
│   │   │
│   │   │
│   │   ├── Footer\
│   │   │   ├── Footer.css
│   │   │   └── Footer.js
│   │   │
│   │   ├── Form\
│   │   │   │
│   │   │   └── Input\
│   │   │       ├── FilePicker.js
│   │   │       ├── Input.css
│   │   │       └── Input.js
│   │   │
│   │   │
│   │   ├── Image\
│   │   │   ├── Avatar.css
│   │   │   ├── Avatar.js
│   │   │   ├── Image.css
│   │   │   └── Image.js
│   │   │
│   │   ├── Layout\
│   │   │   ├── Layout.css
│   │   │   └── Layout.js
│   │   │
│   │   ├── Loader\
│   │   │   ├── Loader.css
│   │   │   └── Loader.js
│   │   │
│   │   ├── Logo\
│   │   │   ├── Logo.css
│   │   │   └── Logo.js
│   │   │
│   │   ├── Modal\
│   │   │   ├── Modal.css
│   │   │   └── Modal.js
│   │   │
│   │   ├── Navigation\
│   │   │   │
│   │   │   ├── MainNavigation\
│   │   │   │   ├── MainNavigation.css
│   │   │   │   └── MainNavigation.js
│   │   │   │
│   │   │   ├── MobileNavigation\
│   │   │   │   ├── MobileNavigation.css
│   │   │   │   └── MobileNavigation.js
│   │   │   │
│   │   │   ├── MobileToggle\
│   │   │   │   ├── MobileToggle.css
│   │   │   │   └── MobileToggle.js
│   │   │   │
│   │   │   └── NavigationItems\
│   │   │       ├── NavigationItems.css
│   │   │       └── NavigationItems.js
│   │   │
│   │   │
│   │   ├── Paginator\
│   │   │   ├── Paginator.css
│   │   │   └── Paginator.js
│   │   │
│   │   ├── SinglePostPaginator\
│   │   │   ├── SinglePostPaginator.css
│   │   │   └── SinglePostPaginator.js
│   │   │
│   │   └── Toolbar\
│   │       ├── Toolbar.css
│   │       └── Toolbar.js
│   │
│   │
│   ├── pages\
│   │   │
│   │   ├── Auth\
│   │   │   ├── Auth.css
│   │   │   ├── Auth.js
│   │   │   ├── Login.css
│   │   │   └── Login.js
│   │   │
│   │   └── Feed\
│   │       │
│   │       ├── FeedEdit\
│   │       │   ├── FeedEdit.css
│   │       │   └── FeedEdit.js
│   │       │
│   │       ├── SinglePost\
│   │       │   ├── SinglePost.css
│   │       │   └── SinglePost.js
│   │       │
│   │       ├── Feed.css
│   │       └── Feed.js
│   │
│   │
│   ├── util\
│   │   ├── image.js
│   │   └── validators.js
│   │
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package-lock.json
└── package.json
```

The create-react-app workflow's production output, as shown in the `gh-pages` branch (tasked with the deployment of the app):

```
.\
│
├── static\
│   │
│   ├── css\
│   │   ├── 1.b0103ddb.chunk.css
│   │   ├── 1.b0103ddb.chunk.css.map
│   │   ├── main.176757f9.chunk.css
│   │   └── main.176757f9.chunk.css.map
│   │
│   └── js\
│       ├── 1.ab771bf3.chunk.js
│       ├── 1.ab771bf3.chunk.js.map
│       ├── main.8ad88ea1.chunk.js
│       ├── main.8ad88ea1.chunk.js.map
│       ├── runtime~main.720003f3.js
│       └── runtime~main.720003f3.js.map
│
│
├── .nojekyll
├── 404.html
├── logo192.png
├── logo512.png
├── apple-touch-icon.png
├── asset-manifest.json
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon.ico
├── index.html
├── manifest.json
├── precache-manifest.b9da06879698db9688cbb05c98f3fb50.js
└── service-worker.js
```

## Project Configuration Files (package.json)

The package.json file used in the project:

```
{
  "name": "post-manager",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://nothingnothings.github.io/PostManager",
  "dependencies": {
    "@fortawesome/free-regular-svg-icons": "^6.1.1",
    "@fortawesome/free-solid-svg-icons": "^6.1.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@types/react-fontawesome": "^1.6.5",
    "bootstrap": "^5.1.3",
    "react": "^16.5.2",
    "react-bootstrap": "^2.4.0",
    "react-dom": "^16.5.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.0.4",
    "react-transition-group": "^4.4.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
  "devDependencies": {
    "gh-pages": "^4.0.0"
  }
}


```

## Setup

To use this project, clone it using Git:

1. Run `git clone` to clone the project into your local Git repository
2. Run `npm install` to install all dependencies (`react`, `axios`, etc)
3. Run `npm run build` to create the production/deployment version of the app (outputted in `/build`)
4. Serve the production files locally or on the web, with the help of a hosting provider (although great part of the app relies/depends on the backend's data, which in the case of this demo, is served by a Node.js (Express.js) server, hosted on Heroku)
5. For the purposes of this demo, on the Home page, input the credentials `exemplo@exemplo.com` (email) and `exemplo` (password) to access the apps's functionalities (Post Viewing and Creation)

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
