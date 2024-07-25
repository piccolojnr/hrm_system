import { Attendance } from "./attendances";
import { Department } from "./departments";
import { Employee } from "./employees";

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}
export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type RoleSlug = "admin" | "hr_manager" | "department_manager" | "employee";



export interface Role {
    id: number;
    name: string;
    slug: RoleSlug;
    description: string;
    created_at: string;
    updated_at: string;
}


export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    employee: Employee;
    email_verified_at: string | null;
    roles: Role[];
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
    };
};

export type DashboardPageProps = PageProps<{
    statistics: {
        totalEmployees: number,
        totalDepartments: number,
        recentAttendance: Attendance[],
    }
}>;


export type RegisterPageProps = PageProps<{
    roles: Role[];
    departments: Department[];
}>;


