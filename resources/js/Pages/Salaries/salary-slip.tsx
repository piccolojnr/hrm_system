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
import { PageProps } from "@/types";
import { EditSalaryPageProps } from "@/types/salaries";
export default function SalarySlip({ salary }: PageProps<EditSalaryPageProps>) {
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
                                <Link href={route("profile.salaries")}>
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
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        {salary.user.name} Salary Slip
                                    </h1>
                                    <p className="text-gray-500">
                                        {salary.user.email}
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        {salary.amount}
                                    </h1>
                                    <p className="text-gray-500">Amount</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h1 className="text-xl font-semibold">
                                    Bonus: {salary.bonus}
                                </h1>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
