import { ContentLayout } from "@/components/panel/content-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { EditEmployeePageProps } from "@/types";
import UpdateEmployeeInformation from "../Profile/Partials/UpdateEmployeeInformationForm";
import UpdateEmployeePhoto from "../Profile/Partials/UpdateEmployeePhoto";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";
import UpdateProfileInformation from "../Profile/Partials/UpdateProfileInformationForm";

export default function Edit({ employee }: EditEmployeePageProps) {
    return (
        <AuthenticatedLayout title={`Edit ${employee.user.name}`}>
            <ContentLayout title={`Edit ${employee.user.name}`}>
                <Head title="Employees" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/employees">Employees</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Edit {employee.user.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateProfileInformation className="max-w-xl" />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateEmployeeInformation
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateEmployeePhoto
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
