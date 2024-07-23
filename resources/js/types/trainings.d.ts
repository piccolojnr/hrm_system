import { PaginatedResponse, User, PageProps, Role } from ".";

export interface Training {
    id: number,
    name: string,
    description: string,
    user: Omit<User, "department">,
    year: number,
    type: string,
    created_at: string;
    updated_at: string;
}


export type EditTrainingPageProps = PageProps<{
    training: Training;
}>;

export type CreateTrainingPageProps = PageProps<{}>;

export type TrainingPaginatedResponse = PaginatedResponse<Training>;

export type TrainingsPageProps = PageProps<{
    pagination: TrainingPaginatedResponse;
}>;
