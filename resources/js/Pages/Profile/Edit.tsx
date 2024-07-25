import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./partials/delete-user-form";
import UpdatePasswordForm from "./partials/update-password-form";
import UpdateProfileInformationForm from "./partials/update-profileInformation-form";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import UpdateEmployeeInformationForm from "./partials/update-employee-information-form";
import UpdateEmployeePhoto from "./partials/update-employee-photo";
import { EditProfilePageProps } from "@/types/employees";

export default function Edit({
    mustVerifyEmail,
    status,
    auth: { user },
}: PageProps<EditProfilePageProps>) {
    return (
        <AuthenticatedLayout title="Profile">
            <ContentLayout title="Profile">
                <Head title="Profile" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
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
