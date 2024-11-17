![photo_2024-11-17_05-21-00](https://github.com/user-attachments/assets/31bd6b45-9bb9-48cf-83e2-8aac0bd97255)


# My Portfolio

This is a personal portfolio website designed to showcase my work, including projects, finance charts, news, and contact information. The website is built with Node.js, Express.js, and EJS templates, and integrates financial data dynamically into the frontend using a charting library (Chart.js).

## Features

- **Interactive Portfolio**: Showcases my personal and professional projects.
- **Dynamic Financial Chart**: Displays real-time financial data using an external API.
- **News Section**: Latest updates and articles on topics of interest.
- **Contact Form**: Allows visitors to get in touch with me directly via a submission form.
- **User Authentication**: Login and registration with role-based access control (admin, editor).
- **Secure Data Handling**: Password hashing with bcrypt, 2FA for added security.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Framework to build the server and handle routing.
- **EJS**: Embedded JavaScript templating engine for rendering HTML views.
- **Chart.js**: JavaScript library for creating interactive charts and graphs.
- **Axios**: HTTP client for making API requests to external services.
- **bcrypt**: Library for hashing passwords securely.
- **Nodemailer**: Used to send welcome emails on user registration.
- **dotenv**: Used to manage environment variables like API keys and sensitive credentials.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project directory and add your API key for financial data and other sensitive information like the email settings.

Example `.env` file:

```
API_KEY=your_financial_api_key_here
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
SESSION_SECRET=your_session_secret_key
```

Make sure to replace `your_financial_api_key_here` with your actual API key, and set up email credentials for Nodemailer.

### 4. Running the Application

To start the application, run:

```bash
npm start
```

This will start the server at `http://localhost:3000` (or whatever port you've configured in your `server.js`).

### 5. Access the Application

Once the server is running, you can access the website by navigating to `http://localhost:3000` in your browser.

## Features Walkthrough

### 1. User Authentication and Authorization

- **Registration**: Users can sign up by providing a username, password, first name, last name, age, gender, and enabling 2FA.
- **Login**: Registered users can log in using their username and password. If 2FA is enabled, they must also provide a verification code from an authenticator app.
- **Role-Based Access**: There are two roles:
  - **Admin**: Full control over content management.
  - **Editor**: Limited control (can add content but cannot delete).
  
### 2. Financial Chart

The website fetches real-time financial data from an external API and displays it in a dynamic chart on the finance section.

- **API Key**: The application fetches financial data using an external API (you need a valid API key).
- **Chart.js**: The financial data is visualized with a line chart on the frontend.

### 3. Contact Form

Visitors can contact you directly through the form, which sends the submission to your email.

## Security

- **Password Hashing**: All user passwords are hashed using bcrypt before being stored in the database.
- **Two-Factor Authentication (2FA)**: If enabled, users must provide a code from an authenticator app in addition to their password.
- **Session Management**: User sessions are managed securely with session cookies.

## Testing

Test the application by following these steps:

1. Register a new user via the registration form.
2. Log in using the credentials you created.
3. Ensure that the financial data chart is rendering correctly.
4. Submit a contact message and check that it is delivered to the provided email.

## Troubleshooting

- **API Key Issue**: Make sure your API key is correct and stored in `.env`.
- **CORS Issues**: If you encounter CORS errors while making API requests, ensure that the request is made from the server side (backend) instead of directly from the frontend.
- **Email Issues**: If Nodemailer is not sending emails, check your email configuration in `.env` (especially `EMAIL_USER` and `EMAIL_PASS`).

