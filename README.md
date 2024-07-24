# Employee Management System

### Description:

The Employee Management System is a web application that allows organizations to manage employee information, training sessions, vacation requests, and salary details. The system is designed to provide a centralized platform for HR managers, department managers, and employees to access and update relevant information. The application is built using larael and react.

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/piccolo/hrm_system.git
   ```
2. Navigate to the project directory:
   ```bash
    cd hrm_system
    ```
3. Install the dependencies:
    ```bash
    composer install
    npm install
    ```
4. Create a new database and update the `.env` file with the database details:
    ```bash
    DB_CONNECTION=mysql
    DB_HOST=
    DB_PORT=
    DB_DATABASE=
    DB_USERNAME=
    DB_PASSWORD=
    ```
5. Run the migrations and seed the database:
    ```bash
    php artisan migrate --seed
    ```
6. Generate the application key:
    ```bash
    php artisan key:generate
    ```
7. Start the development server:
    ```bash
    npm run dev
    php artisan serve
    ```
8. Open the application in your browser:
    ```
    http://localhost:8000
    ```
9. Login with the following credentials:
    ```
    Username:
    Password:
    ```
10. You can now access the Employee Management System.

### Roles and Permissions:

| **Role**             | **Permissions**                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Admin**            | - Access all information and functionalities.<br>- Add, edit, and delete employee records, departments, salaries, training sessions, and vacations.<br>- View, accept, or deny vacations.<br>- Manage evaluations and training enrollments.<br>- Update user roles and authentication.<br>- Generate reports and perform searches across the database. |
| **HR Manager**       | - Access most of the information except user role updates.<br>- Add, edit, and delete employee records, departments, salaries, training sessions, and vacations.<br>- View, accept, or deny vacations.<br>- Manage evaluations and training enrollments.<br>- Generate reports and perform searches across the database. |
| **Department Manager** | - Access employee information within their department.<br>- Add and manage training sessions and vacations for employees in their department.<br>- Generate reports and perform searches for employees in their department. |
| **Employee**         | - Access and edit their personal information.<br>- Add vacation requests.<br>- View their training records, attendance, salary details, and evaluations. |

### Features:

| **Feature**                   | **Description**                                                                                                                                                                                                                                                     |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Authentication and Authorization** | - **Login/Logout**: Users log in with their username and password.<br>- **User Role Check**: Interface changes based on user role after login.<br>- **Update Authentication**: Admin can update user roles. |
| **Employee Management**       | - **Add/Edit Employee**: Admin and HR can add and edit employee details.<br>- **View Employee List**: Admin and HR can view all employees and their roles.<br>- **View/Edit Employee Data**: Admin, HR, and Department Managers can view/edit employee information based on their permissions. |
| **Departments**               | - **Add Department**: Admin and Department Managers can add new departments.<br>- **View/Edit Department List**: Admin and Department Managers can view and edit department details. |
| **Training**                  | - **Add Training**: Admin and HR can add new training sessions.<br>- **View Training List**: Admin and HR can view all training records.<br>- **Enroll in Training**: Admin and HR can assign employees to training sessions. |
| **Vacations**                 | - **Add Vacation**: All users can add vacation requests.<br>- **Manage Vacations**: Admin and HR can view, accept, or deny vacation requests.<br>- **View Vacation Lists**: Separate lists for accepted, denied, and pending vacations. |
| **Attendance**                | - **View Attendance**: Admin and HR can view attendance records, excluding vacation days. |
| **Salary**                    | - **Add Salary**: Admin and HR can add monthly salary details. Each employee should only have one current salary record.<br>- **View Salary List**: Admin and HR can view the monthly salary for employees. |
| **Evaluations**               | - **Manage Evaluations**: Admin and HR can add, edit, and view evaluation data for employees.<br>- **View Evaluations**: Employees can view their own evaluation records. |
| **Reports and Search**        | - **Generate Reports**: Admin, HR, and Department Managers can generate reports based on search results.<br>- **Search**: Admin, HR, and Department Managers can search the database for specific employee information. |

### Database Design:

| **Table**     | **Description**                                               |
|---------------|---------------------------------------------------------------|
| **User**      | Stores login details.                                         |
| **Employee**  | Stores employee profiles.                                     |
| **Department**| Stores department details.                                    |
| **Training**  | Stores training session details.                              |
| **Vacation**  | Stores vacation requests.                                     |
| **Attendance**| Stores attendance records.                                    |
| **Salary**    | Stores salary details, with a field to indicate current salary status or the last update date.                                        |
| **Evaluation**| Stores employee evaluations.                                  |
