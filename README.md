# Health Tracking Web App
Live version available at: https://health-tracking-web-app.herokuapp.com/

## Project Checklist

### 1. Project setup

- [x] Initialize a Git repository
- [x] Set up a Node.js project with a package.json file
- [x] Create a README file with instructions on how to run the site and a list of implemented features
- [x] Define project structure and organize folders

### 2. Backend development

- [x] Set up Express server
- [x] Implement user registration and authentication using an appropriate middleware
- [x] Set up NeDB database to store user information, goals, and achievements
- [x] Design and implement CRUD operations for goals (add, edit, delete, progress update)
- [X] Write unit tests for CRUD operations

### 3. Frontend development

- [x] Set up Handlebars templates
- [x] Create a layout template for a consistent look and feel across pages
- [X] Design and implement the About Us page
- [X] Design and implement user registration and login pages
- [X] Design and implement pages for browsing information about nutrition, fitness, and healthy lifestyle
- [x] Design and implement the goals tracking section:
  - [x] Goals list page with add, edit, and delete options
  - [x] Add goal page with title, description, category, start and end dates, and progress input fields
  - [x] Edit goal page with title, description, category, start and end dates, and progress input fields
  - [x] Delete goal confirmation dialog

### 4. Integration

- [x] Connect frontend with backend CRUD operations for goals
- [x] Test user registration and authentication flow
- [x] Test goals tracking functionality (add, edit, delete, and progress update)

### 5. Testing and debugging

- [X] Perform end-to-end testing for various user scenarios
- [X] Fix any bugs or issues discovered during testing
- [X] Optimize the application for performance, if necessary
- [X] Prepare a test report (refer to Appendix A for format)

### 6. Deployment

- [x] Set up a production environment
- [x] Deploy the application to a live server
- [x] Test the application in the production environment to ensure it works correctly
- [x] Provide a link to the live version of the site or create a video screen capture demonstrating the website in use

### 7. Final submission

- [x] Update the README file with any necessary changes
- [x] Package the website code and README file as a .zip or provide a link to the GitHub repository
- [x] Submit the website code, README, test report, and link to the live site or video screen capture via CodeGrade on GCULearn and Planet eStream

## Features

- About Us page with information about the application
- User registration and authentication using Passport.js
- Access to information about nutrition, fitness, and healthy lifestyle
- Define, add, remove, and modify personal goals in each category (nutrition, fitness, healthy lifestyle)
- Record and review personal achievements

## Getting Started

Add your google secret and client id to the config.env file (Required only for editing/testing not production)

_Install dependencies_

npm install

_Run in development_

npm run dev

_Run in production_

npm start

## Dependencies

connect-nedb-session (version 0.0.3)
cross-env (version 7.0.3)
dotenv (version 16.0.3)
express (version 4.18.2)
express-handlebars (version 7.0.7)
express-session (version 1.17.3)
method-override (version 3.0.0)
moment (version 2.29.4)
morgan (version 1.10.0)
nedb (version 1.8.0)
passport (version 0.6.0)
passport-google-oauth20 (version 2.0.0)

## DevDependencies

cross-env (version 7.0.3)
nodemon (version 2.0.22)

## Prerequisites

Node.js (version X.X.X or later)
Express (version 4.18.2 or later)
NeDB (version 1.8.0 or later)
Handlebars (version 7.0.7 or later)

## Authors

Martin McCurley - Initial work - Github: MMcUni

## Justification of template engine

Handlebars extends Mustache by including additional functionality, including helper functions, block helpers, and built-in helpers such as "if", "each", and "with". While Mustache maintains a minimalistic approach, I plan on using these features for displaying user goals. For example, I can use the "each" helper to iterate through a list of goals and display them on the page. I can also use the "if" helper to display a message if the user has no goals. I can also use the "with" helper to display a message if the user has no goals in a specific category.
