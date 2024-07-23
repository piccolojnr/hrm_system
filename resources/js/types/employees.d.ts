import { PaginatedResponse, User, PageProps, Role } from ".";
import { Department } from "./departments";

export interface Employee {
    id: number,
    address: string | null,
    mobile: string | null,
    birth_date: string | null,
    hire_date: string | null,
    photo: string | null,
    department: Department,
    created_at: string;
    updated_at: string;
}


export type EditProfilePageProps = PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    roles: Role[];
    departments: Department[];
}>;




export type CreateEmployeePageProps = PageProps<{
    roles: Role[];
    departments: Department[];
}>;

export type EditEmployeePageProps = PageProps<{
    roles: Role[];
    departments: Department[];
    user: User;
}>;

export interface IEmployee extends Employee {
    department: Department;
    user: Omit<User, "employee" | "roles">;
}



export type EmployeePaginatedResponse = PaginatedResponse<IEmployee>;


export type EmployeesPageProps = PageProps<{
    pagination: EmployeePaginatedResponse;
}>;
