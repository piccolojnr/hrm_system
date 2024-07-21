import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link } from "@inertiajs/react";
import { EditProfilePageProps, PageProps } from "@/types";
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
import UpdateEmployeeInformation from "./Partials/UpdateEmployeeInformationForm";
import UpdateEmployeePhoto from "./Partials/UpdateEmployeePhoto";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<EditProfilePageProps>) {
    return (
        <AuthenticatedLayout title="Profile">
            <ContentLayout title="Profile">
                <Head title="Profile" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
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
                                className="max-w-xl"
                            />
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
