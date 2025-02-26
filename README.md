# HealthTrack - Health Tracking Web App

![HealthTrack Logo](public/img/favicon.png)

A modern, responsive Progressive Web App (PWA) for tracking health, fitness, and nutrition goals. HealthTrack helps users monitor their progress, set achievable targets, and maintain a healthier lifestyle.

Live version available at: https://health-tracking-web-app.herokuapp.com/

## Features

### Core Functionality
- **User Authentication**: Secure login via Google OAuth 2.0
- **Goal Management**: Create, read, update, and delete health goals
- **Progress Tracking**: Monitor progress towards goals with visual indicators
- **Dashboard**: Comprehensive overview of health metrics and goal status
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

### Progressive Web App (PWA) Capabilities
- **Offline Support**: Access key features even without an internet connection
- **Installable**: Add to home screen on mobile and desktop devices
- **Fast Loading**: Optimized caching strategies for quick access
- **Push Notifications**: Get updates about goal progress (where supported)
- **Automatic Updates**: Seamless updates when new versions are available

### User Experience Enhancements
- **Dark/Light Theme**: Toggle between themes based on preference
- **Animations**: Smooth transitions and visual feedback
- **Interactive Charts**: Visualize progress with dynamic charts
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Accessibility**: Designed with accessibility in mind (keyboard navigation, screen readers)

## Technologies Used

### Frontend
- **Handlebars**: Templating engine for dynamic content
- **Materialize CSS**: Modern responsive CSS framework
- **Chart.js**: Interactive data visualization
- **Font Awesome**: Icon library
- **Service Workers**: For PWA functionality and offline support

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **Passport.js**: Authentication middleware
- **NeDB**: Lightweight document database
- **Express Session**: Session management

### Development & Deployment
- **Git**: Version control
- **Heroku**: Cloud platform hosting
- **Nodemon**: Development server with auto-reload
- **dotenv**: Environment variable management

## Getting Started

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/health-tracking-web-app.git
   cd health-tracking-web-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `config.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CALLBACK_URL=http://localhost:3000/auth/google/callback
   SESSION_SECRET=your_session_secret
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Running in Production
```
npm start
```

## Deploying to Heroku

1. Create a Heroku account at [heroku.com](https://heroku.com)
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Login to Heroku from the terminal:
   ```
   heroku login
   ```
4. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
5. Set up environment variables on Heroku:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
   heroku config:set SESSION_SECRET=your_session_secret
   heroku config:set CALLBACK_URL=https://your-app-name.herokuapp.com/auth/google/callback
   ```
6. Deploy your code:
   ```
   git push heroku main
   ```
7. Open your app:
   ```
   heroku open
   ```

## PWA Features Explained

### Offline Support
HealthTrack uses service workers to cache important assets and data, allowing users to access previously viewed content even when offline. The app also provides a dedicated offline page with helpful information.

### Installable
Users can install HealthTrack on their devices by:
- **Mobile**: Tapping "Add to Home Screen" in their browser menu
- **Desktop**: Clicking the install icon in the address bar (Chrome, Edge) or using browser menu options

### Caching Strategy
The app implements a sophisticated caching strategy:
- **Static Cache**: Core app assets (CSS, JS, images) for immediate loading
- **Dynamic Cache**: Content viewed by users for offline access
- **Network-First Strategy**: For fresh data when online, falling back to cache when offline

### Updates
When a new version of the app is available, users receive a notification allowing them to update immediately or continue using the current version until they're ready to update.

## Project Structure

```
health-tracking-web-app/
├── config/                 # Configuration files
├── helpers/                # Handlebars helpers
├── middleware/             # Express middleware
├── models/                 # Database models
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── img/                # Images
│   ├── main.js             # Main JavaScript file
│   ├── service-worker.js   # Service worker for PWA
│   └── manifest.json       # Web app manifest
├── routes/                 # Express routes
├── views/                  # Handlebars templates
│   ├── layouts/            # Layout templates
│   ├── partials/           # Reusable template parts
│   └── *.hbs               # Page templates
├── app.js                  # Application entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Browser Compatibility

HealthTrack is compatible with:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Materialize CSS](https://materializecss.com/) for the UI framework
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Font Awesome](https://fontawesome.com/) for icons
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) for authentication

---

© 2023 HealthTrack. All rights reserved.

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

## Deploying to Heroku

Follow these steps to deploy the application to Heroku:

1. Create a Heroku account at [heroku.com](https://heroku.com) if you don't have one
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Login to Heroku from the terminal:
   ```
   heroku login
   ```
4. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
5. Set up environment variables on Heroku:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
   heroku config:set SESSION_SECRET=your_session_secret
   heroku config:set CALLBACK_URL=https://your-app-name.herokuapp.com/auth/google/callback
   ```
6. Deploy your code:
   ```
   git push heroku main
   ```
7. Open your app:
   ```
   heroku open
   ```

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
