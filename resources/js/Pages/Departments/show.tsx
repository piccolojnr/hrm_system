import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
import { EditDepartmentPageProps } from "@/types/departments";
import UpdateDepartmentForm from "./partials/update-department-form";
import DeleteDepartmentForm from "./partials/delete-department-form";

export default function ShowDepartment({
    department,
}: EditDepartmentPageProps) {
    return (
        <AuthenticatedLayout title={department.name}>
            <ContentLayout title={department.name}>
                <Head title={department.name} />
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
                                <Link href={route("departments.index")}>
                                    Departments
                                </Link>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{department.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateDepartmentForm department={department} />
                        </div>
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <DeleteDepartmentForm department={department} />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
