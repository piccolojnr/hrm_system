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
import { PageProps, User } from "@/types";
import { AttendancesPageProps } from "@/types/attendances";
import { AttendanceTable } from "./partial/attendance-table";
export default function Attendances({
    pagination,
    user,
}: PageProps<
    AttendancesPageProps & {
        user?: User | null;
    }
>) {
    return (
        <AuthenticatedLayout title="Attendances">
            <ContentLayout title="Attendances">
                <Head title="Attendances" />
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
                                {user ? (
                                    <Link href={route("attendances.index")}>
                                        Attendances
                                    </Link>
                                ) : (
                                    "Attendances"
                                )}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        {user && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{user.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="rounded-lg border-none mt-6">
                    <CardContent className="p-6">
                        <AttendanceTable pagination={pagination} />
                    </CardContent>
                </Card>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
