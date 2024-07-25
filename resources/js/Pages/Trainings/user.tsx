import { ContentLayout } from "@/Components/panel/content-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { PageProps } from "@/types";
import { TrainingTable } from "./partials/training-table";
import { TrainingsPageProps } from "@/types/trainings";

export default function UserTrainings({
    pagination,
    auth,
}: PageProps<TrainingsPageProps>) {
    return (
        <AuthenticatedLayout title={auth.user.name + " Trainings"}>
            <ContentLayout title={auth.user.name + " Trainings"}>
                <Head title={auth.user.name + " Trainings"} />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {auth.user.name} Training
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <TrainingTable pagination={pagination} />
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
