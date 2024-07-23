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
import { CreateSalaryPageProps } from "@/types/salaries";
import CreateSalaryForm from "./partial/create-salary-form";

export default function CreateEvaluation({}: PageProps<CreateSalaryPageProps>) {
    return (
        <AuthenticatedLayout title="New Salary">
            <ContentLayout title="New Salary">
                <Head title="Traininig" />
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
                            <BreadcrumbPage>New Salary</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                            <CreateSalaryForm />
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
