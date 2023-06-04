# Employee Manager Application

The Employee Manager is a CRUD-based application for managing employees. It provides features to view, add, edit, and delete employees. The application is built using NextJS, Redux, and various other technologies.

## Features

- View a list of employees with their details, such as first name, last name, email address, phone number, and gender.
- Switch between list view and grid view layout for the employee list.
- Edit or delete an employee using the provided buttons in each row.
- Add new employees using the add employee form.
- Validate form inputs for proper data entry and display error messages for invalid inputs.
- API endpoints for retrieving, adding, updating, and deleting employees.
- Support for database connectivity with a relational or non-relational database.

## Technology Stack

- Frontend: NextJS, Redux, React hooks
- CSS Framework: Material-UI with Atomic design
- Backend: NextJS
- Database: MongoDB

## Installation

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## API Endpoints

- List Employees: `[GET] api/employee`
- Add Employee: `[POST] api/employee`
- Update Employee: `[PUT] api/employee/:empId`
- Delete Employee: `[DELETE] api/employee/:empId`

## Testing

Unit tests and integration tests are implemented using the React Testing Library. To run the tests, use the following command:

```bash
npm run test
```
## Architecture

The Employee Manager application is designed using a `monolithic architecture`, which is well-suited for the requirements of this project. Here are the reasons why monolithic architecture is chosen:

- Simplicity and Ease of Development: Monolithic architecture offers simplicity in design and development. With a single codebase, developers can easily understand the application's structure and dependencies, leading to faster development cycles.

- Seamless Integration: Since the Employee Manager is a CRUD-based application, it requires tight integration between different components such as the frontend, backend API, and database. Monolithic architecture allows for easy integration of these components within a single codebase, reducing complexity and eliminating the need for additional communication protocols.

- Efficient Resource Utilization: In a monolithic architecture, all components of the application run on the same server instance, utilizing server resources efficiently. This eliminates the need for additional servers or infrastructure, resulting in cost savings and improved performance.

- Easier Deployment and Scalability: With a monolithic architecture, deploying the application is straightforward. The entire application can be deployed as a single unit, simplifying the deployment process. Scaling the application is also easier since all components are tightly coupled, allowing for horizontal scaling by adding more instances of the monolith.

- Simplified Debugging and Testing: In a monolithic architecture, debugging and testing become more manageable. Developers can easily trace and debug issues within the application since all components are interconnected. Testing can be performed comprehensively on the entire system, ensuring the proper functioning of all modules.

- Reduced Latency: Monolithic architecture minimizes network latency since all requests are processed within the same server instance. This leads to faster response times and improved user experience.

## Folder Structure

The application follows the following folder structure:

- `src/components`: Contains reusable components used throughout the application.
- `src/redux`: Includes Redux-related files, such as actions, reducers, and store configuration.
- `src/util`: Contains utility functions and helper modules.
- `src/theme`: Includes theme configuration files for styling.
- `src/styles`: Contains global styles and CSS modules.
- `src/pages`: Contains the main pages of the application, such as the employee list page, add employee page, and edit employee page.
- `src/controllers`: Contains backend controllers for handling API requests.
- `src/services`: Includes services for API communication or external integrations.
- `src/models`: Includes data models or schemas used in the application.
- `src/database`: Includes database configuration files or scripts.
- `src/documentation`: Contains documentation related to the project.

## TODO

- Implement a robust logging mechanism that integrates with the database to track and store application logs.
- Enhance the API endpoints to support search, sort, pagination, and limit functionality for improved data retrieval and manipulation.
- Increase the usage of toast component to enhance user interaction and improve the overall user experience.
- Implement request limiting to ensure the application can handle high traffic and prevent abuse.
- Improve the utilization of the safeExecutionHandler pattern for exception handling, replacing scattered try-catch blocks with a centralized approach for better code readability and maintainability.

## Authors

Aravinda Meewalaarachchi