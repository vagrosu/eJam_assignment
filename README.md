# Task Assignment: Building a Humble Superhero API

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
