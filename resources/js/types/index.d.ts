export type RoleSlug = "admin" | "hr_manager" | "department_manager" | "employee";

export interface Role {
    id: number;
    name: string;
    slug: RoleSlug;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Department {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Employee {
    id: number,
    address: string,
    mobile: string,
    birth_date: string,
    hire_date: string,
    photo: string,
    department: Department,
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    employee: Employee;
    email_verified_at: string;
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


export type RegisterPageProps = PageProps<{
    roles: Role[];
    departments: Department[];
}>;


export type EditProfilePageProps = PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    roles: Role[];
    departments: Department[];
}>;
