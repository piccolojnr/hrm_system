import { PaginatedResponse, User, PageProps, Role } from ".";

export interface Training {
    id: number,
    name: string,
    description: string,
    year: number,
    type: string,
    users_count: number,
    created_at: string;
    updated_at: string;
}

export type UserPaginatedResponse = PaginatedResponse<User & {
    pivot: {
        training_id: number;
        user_id: number;
    }
}>;

export type EditTrainingPageProps = PageProps<{
    training: Training;
    users: UserPaginatedResponse;
}>;

export type CreateTrainingPageProps = PageProps<{}>;

export type TrainingPaginatedResponse = PaginatedResponse<Training>;


export type TrainingsPageProps = PageProps<{
    pagination: TrainingPaginatedResponse;
}>;

export type UserTrainingPageProps = PageProps<{
    pagination: UserPaginatedResponse;

}>;

