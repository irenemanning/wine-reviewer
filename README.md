# Wine Reviewer Application

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)

## Description

The Wine Reviewer Application is a web-based platform for wine enthusiasts to discover and review wines. It provides a user-friendly interface for exploring various wines, adding reviews, and sharing opinions with a community of wine lovers. The application is built with a Ruby on Rails backend to handle data storage and a React frontend for an interactive user experience.

## Features

- **User Registration and Authentication**: Users can create accounts, log in, and securely manage their profiles.
- **Wine Database**: Comprehensive database of wines with details such as name, type, region, and description.
- **Wine Reviews**: Users can write and view reviews for wines, including ratings and comments. Users can edit and delete their own reviews.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Ruby (version 2.7.4)
- Rails (version 7.0.6)
- React (version 18.2.0)
- React Router Dom (version 6.16.0)
- Bootstrap (version 5.3)
- React Bootstrap (version 2.8.0)
- Node.js (version X.X.X)
- Yarn (version X.X.X)
- PostgreSQL (version 1.1)
- Bcrypt (version 3.1.7)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/irenemanning/wine-reviewer.git
   cd wine-reviewer

2.**Backend Setup**
    bundle install
    rails db:create db:migrate
    rails s

    The backend is now running. You can access it at 'http://localhost:3000'.

3.**Frontend Setup**
    cd client
    npm install
    npm start

    The frontend is now running. You can access it at 'http://localhost:4000'.

## Usage

To use the Wine Reviewer Application, follow these steps:

1. **Access the Application**:

   Visit `http://localhost:4000` in your web browser to access the Wine Reviewer Application.

2. **User Registration and Login**:

   - If you're a new user, click on the "Sign Up" link to create an account. Provide the required information and complete the registration process.
   - If you already have an account, click on "Log In" to enter your credentials and access your account.

3. **Exploring Wines**:

   - Once logged in, you can start exploring wines in the application's database. Use the search and filtering options to find wines that interest you.

4. **Adding Wine Reviews**:

   - To add a review for a wine, navigate to the wine's details page. Click on the "Add Review" button.
   - Provide a rating of 1-5 and write your review comments.
   - Click "Submit" to add your review to the wine's page.


Now you're ready to explore wines, share your reviews, and engage with the wine enthusiast community.

## API Endpoints

For developers interested in accessing the API directly, here are some of the available endpoints:

**User Signup** POST localhost:3000/signup
**User Login** POST localhost:3000/login
**User Logout** DELETE localhost:3000/logout
- **Get a List of All Wines** GET localhost:3000/wines
After user authorization, the following routes will be available:
- **Get User info** GET localhost:3000/me
- **Get Details for a Specific Wine** GET localhost:3000/wines/:id
- **Create a New Wine for for the database** POST localhost:3000/wines
- **Create a New Review for a Wine** POST localhost:3000/reviews
- **Get a list of ALL Reviews** GET localhost:3000/reviews
- **Update a Review** PATCH localhost:3000/reviews/:id
- **Delete a Review** DELETE localhost:3000/reviews/:id

## Frontend

The frontend of this application is built using React. You can find the source code in the `client` directory. Customization and further development of the frontend can be done by modifying the React components and styles.

Thank you  for you interest in this Wine Reviewer Application!

Happy Coding
