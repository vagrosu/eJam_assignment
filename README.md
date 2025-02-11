# Task Assignment: Building a Humble Superhero API

## Backend

Although this is a small API, I have designed the project to be highly readable and scalable. Built with Express.js, the project is organized as follows:

- <span style="color:yellow">**database**</span>: A simple object with dummy data for testing, along with type definitions.
  I chose an object-based approach to allow easy expansion with other resources (e.g., Villains).

- <span style="color:green">**\_\_tests\_\_**</span>: Jest + Supertest tests for the `GET /superheroes` endpoint, including a storage seeding function and test cases covering different request scenarios. I followed the AAA (Arrange-Act-Assert) pattern to ensure clarity in each test.

![Passing tests](/media/tests.png)

- <span style="color:yellow">**config**</span>: Server and Swagger configuration.
  I extracted server setup into a separate file for cleaner code and to make the `createServer` function reusable for testing.
  Since API documentation is important, I integrated Swagger to facilitate both documentation and manual testing.

- <span style="color:green">**controllers**</span>: Contains the main logic for each endpoint.

  - Requests and responses are strongly typed.
  - Includes pagination logic.
  - Storage logic is separated into its own class.
  - Ensures that each new superhero does not already exist before adding them.

- <span style="color:green">**middleware**</span>: Middleware functions to remove boilerplate, such as request validation helper utility and pagination handling.

- <span style="color:green">**routes**</span>: Contains all API endpoints along with their Swagger documentation.
  - Uses helper functions for cleaner code.
  - The structure allows easy addition of new endpoints and documentation in the future.

![Swagger GET](/media/getSuperheroes_swagger.png)
![Swagger POST](/media/createSuperhero_swagger.png)

- <span style="color:green">**services**</span>: Acts as the communication layer between storage and the rest of the application.

  - Helps maintain a clean architecture.
  - Improves reusability and scalability.
  - Includes unique ID generation for each resource.

- <span style="color:yellow">**types**</span>: Defines reusable TypeScript types for requests and responses.

- <span style="color:yellow">**utils**</span>:

  - Contains utility functions and type guards for objects, strings, errors, and Swagger documentation.
  - Also includes a Winston logger that saves errors in a separate file for better debugging and structured logging.

- <span style="color:green">**validators**</span>: Handles validation for request variables such as query parameters, path variables, and request bodies to ensure data integrity and prevent invalid input.

The **index.ts** file is the entry point of the application.
For simplicity, I included the **.env** file in Git (aware that this is against best practices, but I did this for easier testing).

## Frontend

The frontend client consists of a Vite + React application, that uses:

- `@tanstack/react-query` and `axios` for managing server requests and handling data.
- Material UI components for a clean design.
- `react-toastify` for showing errors and success messages.

Features:

- Users can view all superheroes in their default order, or sort them in ascending or descending order by humility score.
- The list of superheroes is paginated (e.g., 10 items per page), making it easy to navigate through large datasets.
- Users can add new superheroes, the list being automatically updated on success.

![Frontend](/media/frontend.png)

## Team collaboration

Although this was an individual task, I structured the project in a way that makes team collaboration easy in the future. Here is what I would do to improve it more:

- I would follow a proper Git workflow, using feature branches and pull requests to improve transparency and allow code reviews.
- Since clear communication is essential, I would ensure that major decisions are discussed in meetings or through a ticketing system like JIRA or ClickUp.
- I would continue improving the API documentation, as it is important not only for the backend team but also for frontend developers who need to integrate with it.

## If I had more time

If I had more time, I would:

- Replace the in-memory storage with a real database, using an ORM like Prisma with PostgreSQL or MongoDB, depending on the project's needs.
- Use Docker to run the database, server and client in separate containers, ensuring consistent development environment and easier deployment.
- Add CI/CD pipelines like GitHub Actions to automate testing and deployment.
- Secure superhero creation with JWT authentication, session-based auth, or OAuth integrations (e.g., Google login).

# Task

## Objective

Create a simple API that lets users:

- Add a new superhero, specifying their name, superpower, and a "humility score" (e.g., a rating out of 10 that shows how humble they are).

- Fetch the list of superheroes, ordered by their humility score in descending order.

## Requirements

- Backend:

  - Use NestJS or any Node.js framework you're comfortable with.
  - Store the superhero data in a simple in-memory database (e.g., an array).
  - Create two endpoints:
    - POST /superheroes: Add a new superhero (name, superpower, and humility score required).
    - GET /superheroes: Fetch the list of superheroes sorted by humility score.
  - Frontend (Optional):
    - If you have time, create a quick React interface where users can add superheroes and see the sorted list in real-time.
  - Bonus Points:
    - Add validation to ensure the humility score is a number between 1 and 10.
    - Write a brief test using Jest for one of the endpoints.
