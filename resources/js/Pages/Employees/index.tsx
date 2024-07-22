import { ContentLayout } from "@/components/panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { EmployeesTable } from "./partials/employees-table";
import { EmployeesPageProps } from "@/types/employees";

export default function Employees({
    pagination,
}: PageProps<EmployeesPageProps>) {
    return (
        <AuthenticatedLayout title="Employees">
            <ContentLayout title="Employees">
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
                            <BreadcrumbPage>Employees</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <EmployeesTable pagination={pagination} />
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
