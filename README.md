# Equation Calculator

Equation Calculator is a web application that allows users to input mathematical equations, perform calculations, and save these equations for future reference. This application is built using Node.js, Express.js, and SQLite for local equation storage.

## Getting Started

The following instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The application is containerized using Docker. You need to install Docker and Docker Compose. You can download Docker from [here](https://docs.docker.com/get-docker/) and Docker Compose from [here](https://docs.docker.com/compose/install/).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/CatMizu/equation-calculator.git
```
2. Navigate to the project directory:

```bash
cd equation-calculator
```
3. Running the Application

The application has been Dockerized, which means you can easily run the entire application just by using Docker Compose:

```bash
docker-compose up
```
The application will be accessible at `http://localhost:4000`.



## Use the Calculator
The following instructions will help you to use the equation calculator

### Sign-up and Login
1. Visit `http://localhost:4000` in your web browser.
2. Click on the 'Create a new account' button on the homepage.
3. Fill in your details, such as username and password, then click 'Sign Up'.
4. You will be redirected to the login page. Enter your login credentials and click 'Login'.

### Solve your equation

1. Once you're logged in, you will be redirected to the home page, there will be a example equation on the home page.
2. The app is interaged with [MathQuill](http://mathquill.com/), you could use the integrated MathQuill functionality to easily input mathematical symbols and expressions.
3. Once you have entered your equation, enter the varaible that you want to sovle for under "Solve for" 
4. You could also enter or delete any parameters before solve.
5. Once you have your equaiton ready, hit the "Solve" button and you will see the reasult in the equation panel.

### Save & Delete your equation

You could save a equation to your account by clicking "Save Equation" button, you could also delete one by clicking the "X" button at the top-right corner of the equation panel.



## Check the API documentation and Database schema
The backend of the application integrates Swagger to manage and provide API documentation and schema documentation. To access this documentation and schema, please proceed as follows:

1. modify the Dockerfile located in `/back-end/Dockerfile`. change `CMD ["yarn", "start"]` to `CMD ["yarn", "dev"]`, this will start the backend in dev environment in the container.
2. delete the old docker image `node-app`
3. run `docker-compose up` again under the `/equation-calculator`, this will use the MySQL server from the docker container, and you don't need to set up your local MySQL database.
4. visit `localhost:3000/v1/docs` from the browser. Here, you will find detailed information on the backend API and the database schema.


## Futrure Improvment
While this project already fully meets the requirements, there are still many areas for improvement that I plan to enhance in the future:

1. Need unit tests

2. Use a CSS library like Bootstrap to improve the front-end styling. The reason I haven't used it until now is because I wanted to show some raw CSS code.

3. There's an extensive use of `alert()` and error response handling in the front end, which can be further improved.

4. Additional account functionalities, such as "reset password", "forgot password", and "registration validation" through email, need to be implemented.

5. Regarding the back-end calculation logic, the answers returned by nerdamer sometimes don't follow conventional reading habits, and many formulas can't be simplified. I need to find a better solution.
