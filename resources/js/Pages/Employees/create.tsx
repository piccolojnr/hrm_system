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
import CreateUserForm from "./partials/create-user-form";
export default function CreateEmployee() {
    return (
        <AuthenticatedLayout title="New Employee">
            <ContentLayout title="New Employee">
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
                                <Link href={route("employees.index")}>
                                    Employees
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>New Employee</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <CreateUserForm className="max-w-xl" />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
