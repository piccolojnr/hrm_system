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
import { PageProps } from "@/types";
import { EditSalaryPageProps } from "@/types/salaries";
import UpdateSalaryForm from "./partial/update-salary-form";
export default function UserEvaluation({
    salary,
}: PageProps<EditSalaryPageProps>) {
    return (
        <AuthenticatedLayout title={salary.user.name + " Salary"}>
            <ContentLayout title={salary.user.name + " Salary"}>
                <Head title={salary.user.name + " Salary"} />
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
                                <Link href={route("salaries.index")}>
                                    Salaries
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {salary.user.name} Salary
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <UpdateSalaryForm salary={salary} />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
