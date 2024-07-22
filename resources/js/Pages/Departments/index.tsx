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
import { DepartmentsPageProps } from "@/types/departments";
import { Card, CardContent } from "@/components/ui/card";
import { DepartmentTable } from "./partials/department-table";
export default function Departments({ pagination }: DepartmentsPageProps) {
    return (
        <AuthenticatedLayout title="Departments">
            <ContentLayout title="Departments">
                <Head title="Departments" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Departments</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <DepartmentTable pagination={pagination} />
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
