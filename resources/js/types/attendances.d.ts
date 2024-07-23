import { PageProps, PaginatedResponse, User } from ".";

export interface Attendance {
    id: number;
    user: User;
    date: string;
    type: string;
    check_in: string;
    check_out: string;
    created_at: string;
    updated_at: string;
}

export type AttendancePaginatedResponse = PaginatedResponse<Attendance>;

export type AttendancesPageProps = PageProps<{
    pagination: AttendancePaginatedResponse;
}>;
