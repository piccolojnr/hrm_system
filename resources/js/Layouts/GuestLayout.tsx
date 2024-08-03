import ApplicationLogo from "@/Components/ApplicationLogo";
import { ModeToggle } from "@/Components/mode-toggle";
import { Footer } from "@/Components/panel/footer";
import ToastContainer from "@/Components/ToastContainer";
import { Toaster } from "@/Components/ui/toaster";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
    const { flash } = usePage<PageProps>().props;
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 p-6">
                <Link href="/">
                    <ApplicationLogo className="w-5 h-5 fill-current text-gray-900" />
                </Link>
                <div className="flex items-center justify-end space-x-4">
                    <Link
                        href="/login"
                        className="text-sm text-gray-700 dark:text-gray-200"
                    >
                        Login
                    </Link>
                    {/* <div className="inline-block ml-4 text-gray-700 dark:text-gray-200">
                        <ModeToggle />
                    </div> */}
                </div>
            </nav>
            <div
                className="flex flex-col items-center justify-center w-full"
                style={{ minHeight: "calc(100vh - 4rem)" }}
            >
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-900" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 mb-6 px-6 py-4 dark:bg-gray-900 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <footer className="flex items-center justify-center w-full  bg-gray-100 dark:bg-gray-800">
                <Footer />
            </footer>
            <Toaster />

            {flash?.success && (
                <ToastContainer message={flash.success} type="success" />
            )}
            {flash.error && (
                <ToastContainer message={flash.error} type="error" />
            )}
            {flash.info && <ToastContainer message={flash.info} type="info" />}
            {flash.warning && (
                <ToastContainer message={flash.warning} type="warning" />
            )}
        </div>
    );
}
