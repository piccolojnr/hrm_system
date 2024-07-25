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
import { EditEmployeePageProps } from "@/types/employees";
import UpdateEmployeeInformationForm from "../Profile/partials/update-employee-information-form";
import UpdateEmployeePhoto from "../Profile/partials/update-employee-photo";
import UpdatePasswordForm from "../Profile/partials/update-password-form";
import DeleteUserForm from "../Profile/partials/delete-user-form";
import UpdateProfileInformation from "../Profile/partials/update-profileInformation-form";

export default function Edit({ user }: EditEmployeePageProps) {
    return (
        <AuthenticatedLayout title={`Edit ${user.name}`}>
            <ContentLayout title={`Edit ${user.name}`}>
                <Head title="Employees" />
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
                                <Link href="/employees">Employees</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit {user.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateProfileInformation
                                user={user}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateEmployeeInformationForm
                                user={user}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateEmployeePhoto
                                user={user}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdatePasswordForm
                                user={user}
                                className="max-w-xl"
                            />
                        </div>
                        {user.roles.some((role) =>
                            ["admin", "hr_manager"].includes(role.slug)
                        ) && (
                            <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                                <DeleteUserForm
                                    user={user}
                                    className="max-w-xl"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
