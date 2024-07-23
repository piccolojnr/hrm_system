import { PaginatedResponse, User, PageProps } from ".";

export interface Evaluation {
    id: number;
    notes: string;
    value: number;
    user: Omit<User, "department">;
    created_at: string;
    updated_at: string;
}


export type EvaluationPaginatedResponse = PaginatedResponse<Evaluation>;

export type EvaluationsPageProps = PageProps<{
    pagination: EvaluationPaginatedResponse;
}>;

export type EditEvaluationPageProps = PageProps<{
    evaluation: Evaluation;
}>;
export type CreateEvaluationPageProps = PageProps<{}>;
