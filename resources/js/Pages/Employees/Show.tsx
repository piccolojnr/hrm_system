import { PageProps } from "@/types";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "../Profile/partials/delete-user-form";
import UpdatePasswordForm from "../Profile/partials/update-password-form";
import UpdateProfileInformationForm from "../Profile/partials/update-profileInformation-form";
import { Head, Link } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ContentLayout } from "@/Components/panel/content-layout";
import { Card, CardContent } from "@/Components/ui/card";
import UpdateEmployeeInformationForm from "../Profile/partials/update-employee-information-form";
import UpdateEmployeePhoto from "../Profile/partials/update-employee-photo";
import { EditEmployeePageProps } from "@/types/employees";

export default function Show({ user }: PageProps<EditEmployeePageProps>) {
    return (
        <AuthenticatedLayout title={user.name}>
            <ContentLayout title={user.name}>
                <Head title={user.name} />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                <Link href={route("employees.index")}>
                                    Employees
                                </Link>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{user.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
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
                                className="max-w-xl"
                                user={user}
                            />
                        </div>
                        {user.roles.some((role) =>
                            ["admin", "hr_manager"].includes(role.slug)
                        ) && (
                            <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                                <DeleteUserForm
                                    className="max-w-xl"
                                    user={user}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
