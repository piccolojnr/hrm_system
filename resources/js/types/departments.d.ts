import { PageProps, PaginatedResponse, User } from ".";

export interface Department {
    id: number;
    name: string;
    slug: string;
    head: Omit<User, "department">
    description: string;
    created_at: string;
    updated_at: string;
}

export type DepartmentPaginatedResponse = PaginatedResponse<Department>;


export type DepartmentsPageProps = PageProps<{
    pagination: DepartmentPaginatedResponse;
    filter: string | null;
}>;
