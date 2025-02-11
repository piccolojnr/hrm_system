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
import { EditTrainingPageProps } from "@/types/trainings";
import UpdateTrainingForm from "./partials/update-training-form";
import { UserTable } from "./partials/user-table";
import EnrollUserForm from "./partials/enroll-user-form";
export default function UserTraining({
    training,
    users,
}: PageProps<EditTrainingPageProps>) {
    return (
        <AuthenticatedLayout title={training.name + " Training"}>
            <ContentLayout title={training.name + " Training"}>
                <Head title={training.name + " Training"} />
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
                                <Link href={route("trainings.index")}>
                                    Trainings
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {training.name} Training
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateTrainingForm training={training} />
                        </div>
                        {/* enroll user */}
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg mt-6">
                            <h2 className="text-lg font-medium mb-4">
                                Enroll Employee
                            </h2>
                            <EnrollUserForm training_id={training.id} />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg mt-6">
                            <h2 className="text-lg font-medium mb-4">
                                Employees Enrolled
                            </h2>
                            <UserTable pagination={users} />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
