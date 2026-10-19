# merna-static-website-on-azure-template
# Health Insurance Risk Calculator – Static Client

## Project Information

**Team Name:** PurpleCobras  
**University:** Lewis University  
**Course:** Software Engineering

### Team Members
- Isaac Joseph
- Nick Dahlin
- Justin Hobbs

## Project Description

The Health Insurance Risk Calculator is a web application developed by the PurpleCobras team for our Software Engineering course at Lewis University.

The purpose of this application is to allow users to enter their health information and receive an insurance risk assessment based on age, Body Mass Index (BMI), blood pressure, and family medical history.

This repository contains the **static client application**, which provides the user interface and communicates with the Node.js API server.

The client is responsible for collecting user information, sending requests to the server, and displaying the calculated results. All risk calculations and input validation are handled by the API server.

## Technologies Used

- HTML5 – Website structure
- CSS3 – Website styling and layout
- JavaScript – User interactions and API requests
- Git and GitHub – Version control and collaboration
- Microsoft Azure – Website deployment
- Visual Studio Code – Development environment

## Application Features

The client application is designed to:

- Collect customer age, height, and weight.
- Collect systolic and diastolic blood pressure readings.
- Allow users to provide family medical history.
- Send customer information to the Node.js API server.
- Display calculated BMI and blood pressure categories.
- Display the overall health insurance risk score and category.
- Allow multiple customers to be evaluated.

## Application Architecture

The application follows a client-server architecture.

1. The user enters health information through the website.
2. The client sends the information to the Node.js API server.
3. The server validates the information and performs the calculations.
4. The server returns the calculated results.
5. The client displays the results to the user.

## Installation and Setup

### Prerequisites

- A modern web browser
- Git
- Visual Studio Code or another code editor
- Access to the Node.js API server

### Running the Client

1. Clone this repository from GitHub.
2. Open the project folder in Visual Studio Code.
3. Locate the `index.html` file.
4. Open the website using a local development server, such as VS Code Live Server, or directly in a browser if supported.
5. Ensure that the Node.js API server is running and the client is configured with its correct URL.
6. Test the application by entering the requested health information.

## API Integration

The static client communicates with four RESTful APIs provided by the Node.js server.

| API | Purpose |
|---|---|
| ping | Verify server connectivity |
| bp-category | Determine blood pressure category |
| bmi | Calculate Body Mass Index |
| risk-category | Determine overall insurance risk |

The client does not perform the health risk calculations itself. All calculations are processed by the API server.

## Deployment

The static client is intended to be hosted using Microsoft Azure.

The deployed website communicates with the separately hosted Node.js API server.

**Static Website URL:** [Add Azure URL]

**Node.js API Repository:** [Add GitHub URL]

## Development Standards

This project follows the coding standards established for the Software Engineering course.

These include:

- Using descriptive variable and function names.
- Following camelCase naming conventions.
- Maintaining consistent code formatting and indentation.
- Including meaningful comments when necessary.
- Using UTF-8 encoding.
- Testing code to prevent errors and warnings.
- Properly documenting external resources and AI assistance.
- Using GitHub for version control and team collaboration.

## Credits and Acknowledgments

This application was developed by Isaac Joseph, Nick Dahlin, and Justin Hobbs as part of the Software Engineering course at Lewis University.

### External Resources

- HTML, CSS, and JavaScript documentation: https://developer.mozilla.org/
- Microsoft Azure: https://azure.microsoft.com/
- GitHub: https://github.com/

### AI Assistance

OpenAI's ChatGPT was used to assist with drafting and organizing the README documentation.

Any additional AI-assisted source code must be documented in the relevant source files according to the course coding standards.

Additional external resources must be credited when used.

## License

This project is intended for educational purposes. See the repository's `LICENSE` file for applicable licensing terms.