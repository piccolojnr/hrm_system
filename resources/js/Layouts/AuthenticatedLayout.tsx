import { useState, PropsWithChildren } from "react";
import { PageProps, User } from "@/types";
import Sidebar from "@/components/panel/sidebar";
import { useStore } from "zustand";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Footer } from "@/components/panel/footer";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/panel/navbar";
import { usePage } from "@inertiajs/react";
import ToastContainer from "@/components/ToastContainer";
import { Toaster } from "@/components/ui/toaster";

export default function Authenticated({
    children,
    title,
}: PropsWithChildren<{ title: string }>) {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const { flash } = usePage<PageProps>().props;
    return (
        <div className="min-h-screen">
            <Sidebar />
            <Navbar title={title} />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
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
