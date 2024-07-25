import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { DashboardPageProps, PageProps } from "@/types";
import { ContentLayout } from "@/Components/panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import EmailForm from "./partials/email-form";

export default function Dashboard({
    auth: { user },
    statistics,
}: DashboardPageProps) {
    return (
        <AuthenticatedLayout title="Dashboard">
            <ContentLayout title="Dashboard">
                <Head title="Dashboard" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <div className="p-6">
                            <Head title="Dashboard" />
                            <h1 className="text-2xl font-bold mb-6">
                                Welcome, {user.name}!
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className=" p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold">
                                        Total Employees
                                    </h2>
                                    <p className="text-2xl">
                                        {statistics.totalEmployees}
                                    </p>
                                </div>
                                <div className=" p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold">
                                        Total Departments
                                    </h2>
                                    <p className="text-2xl">
                                        {statistics.totalDepartments}
                                    </p>
                                </div>
                                <div className=" p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold">
                                        Recent Attendance
                                    </h2>
                                    <ul
                                        className="list-disc pl-5

                                    "
                                    >
                                        {statistics.recentAttendance.map(
                                            (attendance, index) => (
                                                <li
                                                    key={index}
                                                    className="text-sm"
                                                >
                                                    {attendance.user.name} -{" "}
                                                    {attendance.date}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <h1 className="text-2xl font-bold mb-6">Send Email</h1>
                        <EmailForm />
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
