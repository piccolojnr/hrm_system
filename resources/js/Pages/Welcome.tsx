import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <GuestLayout>
                <Head title="Welcome" />
                <div className="container mx-auto p-8">
                    <h1 className="text-3xl font-semibold mb-4">
                        Welcome to your Inertia app!
                    </h1>
                </div>
            </GuestLayout>
        </>
    );
}
