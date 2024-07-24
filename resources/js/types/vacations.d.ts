import { PaginatedResponse, User, PageProps } from '.';

export interface Vacation {
    id: number;
    user_id: number;
    user: User;
    start_date: string;
    end_date: string;
    status: string;
    reason: string;
    created_at: string;
    updated_at: string;
}

export type VacationPaginatedResponse = PaginatedResponse<Vacation>;

export interface VacationsPageProps {
    pagination: PaginatedResponse<Vacation>;
}



export type EditVacationPageProps = PageProps<{
    vacation: Vacation;
}>;


export type CreateVacationPageProps = PageProps<{}>;

export type UserVacationsPageProps = PageProps<{
    pagination: VacationPaginatedResponse;
}>;


