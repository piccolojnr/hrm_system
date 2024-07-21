import { PaginatedResponse, Department, User, Employee as Em } from ".";



export interface Employee extends Em {
    department: Department;
    user: Omit<User, "employee" | "roles">;
}



type EmployeePaginatedResponse = PaginatedResponse<Employee>;
