## Spritecloud Test Automation Assignment 
This is a test automation framework built using Playwright and TypeScript. It focuses on testing both frontend and backend functionalities of the saucedemo.com and reqres.in. The Frontend framework automates key features such as user login, Price Validation, checkout process, and sorting options to ensure the web app performs reliably under different conditions. And for Backend it includes getUsers, login, Updateuser, deleteuser and delayed request API

## Table of Contents
1. Overview
2. Frontend Features
3. Backend Features
4. Project Structure
5. Test Scripts
6. Installation
7. Running Tests
8. Playwright Configuration
9. CI Integration

### Overview
This repository contains the automated test framework developed for testing saucedemo.com and reqres.in, a leading real estate platform. The framework is designed to ensure seamless functionality of the website's core features, from frontend UI tests to backend API validations, by leveraging Playwright—a powerful end-to-end testing tool.

The framework is fully integrated with GitHub Actions, a CI/CD pipeline tool that automates test execution on every code push or pull request, ensuring the quality and stability of the application.

### Frontend Features 
- Add two items to cart, validate price and do checkout.
- Sort items by name Z-A and validate sorting.
- Validate failed login attempt.

### Backend Features
- Get all users.
- Perform a successful login.
- Create User and then Delete User.
- Update user details successfully.
- Get Users with delay and measure response time
- Login with incorrect email/password.
- Getting invalid user with id should return 404.
- Login with missing password.

### Project Structure
Here’s an outline of the project’s structure:

<pre>
├── .github
│   └── workflows
│       └── playwright.yml                    # GitHub Actions workflow for Playwright tests
│
├── helpers
│   ├── API_Helper.ts                         # Helper file for managing backend test utilities
│
├── pages
│   ├── LoginPage.ts                          # Page object for the Login page
│   ├── InventoryPage.ts                      # Page object for the Inventory page
│   ├── CartPage.ts                           # Page object for the Cart page
│   ├── ChekoutPage.ts                        # Page object for the Checkout page
│
├── tests
│   ├── backend
│   │   ├── reqres.spec.ts                     # Backend API tests 
│   │
│   ├── frontend
│   │   ├── saucedemo.spec.ts                  # Frontend tests
│   │
├── README.md                                  # This README file
├── package.json                               # Node.js project configuration and dependencies
├── playwright.config.ts                       # Playwright configuration file
└── tsconfig.json                              # TypeScript configuration file
</pre>

### Test Scripts
- Frontend Tests: These tests check the user interface and interactions on the web application. They cover critical functionalities such as logging in, add item to cart and checkout process, price validation at checkout time, sorting and verify error message for invalid username and password.

You can find these tests in the `tests/frontend/ directory`

- Backend Tests: The backend tests include API tests for verifying the response and status code.

They are located in the `tests/backend/ directory`

### Installation
#### Prerequisites
Before getting started, make sure the following tools are installed on your machine:
- Node.js: This is essential to run JavaScript and TypeScript code, as well as install the necessary packages.
- Git: You will need Git for version control to clone the project repository and manage changes.

### Steps to Install
- Clone the repository: Using git command `git clone gitProjectURL`
- Install dependencies: Run `npm install` in order to install all required packages and dependencies.
- Set up environment variables: Create a .env file, and update it with your environment-specific variables.

### Running Test 
Once you have the project set up, here’s how you can run it.
- Run the tests: To execute all the Playwright tests from project, run: `npx playwright test` this will run all the tests defined in the tests/ directory.
- Running a specific test file: `npx playwright test saucedemo.spec.ts` this will run all the tests defined in the saucedemo.spec.ts file.
- Running a specific test case with title: `npx playwright test -g "Complete a checkout process"` this will the test thave have title 'Complete a checkout process' .
- View HTML Test Report: After running tests, you can view the detailed HTML report with: `npx playwright show-report`


### Playwright Configuration
The core configuration of Playwright is defined in the playwright.config.ts file. It includes settings such as:
- Test Timeouts: Specifies how long a test can run before being considered as failed due to timeout.
- Retries: Configures how many times a test should be retried if it fails.
- Browser Settings: Defines which browsers the tests will run in, along with other browser-related options like headless mode.

You can modify this file to adjust the test environment according to your needs.

### CI/ Integration
This project employs GitHub Actions to automatically run tests whenever code is pushed to the repository. The CI configuration is located in the `.github/workflows/` directory. Here’s how the process works:
- Whenever new code is committed to the repository or a pull request is made, the GitHub Actions workflow triggers automatic test execution. This ensures immediate feedback on code quality, preventing potential bugs from being merged into the main codebase.
- Tests run in a headless browser on the CI server, ensuring the code doesn’t break any functionality.
- Test results, including screenshots and videos (if any), are stored as artifacts for review.
