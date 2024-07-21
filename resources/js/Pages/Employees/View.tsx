import { ContentLayout } from "@/components/panel/content-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function View() {
    return (
        <AuthenticatedLayout title="Employees">
            <ContentLayout title="Employees">
                <div>Employees</div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
