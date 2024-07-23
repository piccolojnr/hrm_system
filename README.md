Sure, here's the information organized in a table format for clarity:

### Roles and Permissions:

| **Role**           | **Permissions**                                                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Admin**          | - Access all information and functionalities.<br>- Add, edit, and delete employee records, departments, salaries, training sessions, and vacations.<br>- View, accept, or deny vacations.<br>- Manage evaluations and training enrollments.<br>- Update user roles and authentication.<br>- Generate reports and perform searches across the database. |
| **HR Manager**     | - Access most of the information except user role updates.<br>- Add, edit, and delete employee records, departments, salaries, training sessions, and vacations.<br>- View, accept, or deny vacations.<br>- Manage evaluations and training enrollments.<br>- Generate reports and perform searches across the database. |
| **Department Manager** | - Access employee information within their department.<br>- Add and manage training sessions and vacations for employees in their department.<br>- Generate reports and perform searches for employees in their department. |
| **Employee**       | - Access and edit their personal information.<br>- Add vacation requests.<br>- View their training records, attendance, and salary details. |

### Features:

| **Feature**                    | **Description**                                                                                                                                                                                                                                                                                                                                                                             |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Authentication and Authorization** | - **Login/Logout**: Users log in with their username and password.<br>- **User Role Check**: Interface changes based on user role after login.<br>- **Update Authentication**: Admin can update user roles. |
| **Employee Management**         | - **Add/Edit Employee**: Admin and HR can add and edit employee details.<br>- **View Employee List**: Admin and HR can view all employees and their roles.<br>- **View/Edit Employee Data**: Admin, HR, and Department Managers can view/edit employee information based on their permissions. |
| **Departments**                 | - **Add Department**: Admin and Department Managers can add new departments.<br>- **View/Edit Department List**: Admin and Department Managers can view and edit department details. |
| **Training**                    | - **Add Training**: Admin and HR can add new training sessions.<br>- **View Training List**: Admin and HR can view all training records.<br>- **Enroll in Training**: Admin and HR can assign employees to training sessions. |
| **Vacations**                   | - **Add Vacation**: All users can add vacation requests.<br>- **Manage Vacations**: Admin and HR can view, accept, or deny vacation requests.<br>- **View Vacation Lists**: Separate lists for accepted, denied, and pending vacations. |
| **Attendance**                  | - **View Attendance**: Admin and HR can view attendance records, excluding vacation days. |
| **Salary**                      | - **Add Salary**: Admin and HR can add monthly salary details.<br>- **View Salary List**: Admin and HR can view the monthly salary for employees. |
| **Evaluations**                 | - **Manage Evaluations**: Admin and HR can add, edit, and view evaluation data for employees. |
| **Reports and Search**          | - **Generate Reports**: Admin, HR, and Department Managers can generate reports based on search results.<br>- **Search**: Admin, HR, and Department Managers can search the database for specific employee information. |

### Database Design:

| **Table**     | **Description**                                               |
|---------------|---------------------------------------------------------------|
| **User**      | Stores login details.                                         |
| **Employee**  | Stores employee profiles.                                     |
| **Department**| Stores department details.                                    |
| **Training**  | Stores training session details.                              |
| **Vacation**  | Stores vacation requests.                                     |
| **Attendance**| Stores attendance records.                                    |
| **Salary**    | Stores salary details.                                        |
| **Evaluation**| Stores employee evaluations.                                  |
