# Equation Calculator

Equation Calculator is a web application that allows users to input mathematical equations, perform calculations, and save these equations for future reference. This application is built using Node.js, Express.js, and SQLite for local equation storage.

## Getting Started

The following instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The application is containerized using Docker. You need to install Docker and Docker Compose. You can download Docker from [here](https://docs.docker.com/get-docker/) and Docker Compose from [here](https://docs.docker.com/compose/install/).

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/<Your GitHub Username>/EquationCalculator.git](https://github.com/CatMizu/equation-calculator.git)
```
2. Navigate to the project directory:

```bash
cd Equation\ Calculator/
```
3. Running the Application

The application has been Dockerized, which means you can easily run the entire application just by using Docker Compose:

```bash
docker-compose up
```
The application will be accessible at http://localhost:4000.