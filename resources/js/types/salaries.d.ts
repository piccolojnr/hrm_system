import { PageProps, PaginatedResponse, User } from ".";

export interface Salary {
    id: number;
    user: Omit<User, "department">;
    amount: number;
    bonus: number;
    created_at: string;
    updated_at: string;
}

export type EditSalaryPageProps = PageProps<{
    salary: Salary;
}>;

export type CreateSalaryPageProps = PageProps<{}>;

export type SalaryPaginatedResponse = PaginatedResponse<Salary>;


export type SalariesPageProps = PageProps<{
    pagination: SalaryPaginatedResponse;
}>;

export type UserSalariesPageProps = PageProps<{
    pagination: SalaryPaginatedResponse;
}>;
