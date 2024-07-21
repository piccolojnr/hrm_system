import { cn } from "@/lib/utils";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "zustand";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import { PanelsTopLeft } from "lucide-react";
import { Menu } from "./menu";

export const SIDE_BAR = {
    width: 90,
    expandedWidth: 288,
};

export default function Sidebar() {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 "
            )}
            style={{
                width: sidebar?.isOpen
                    ? SIDE_BAR.expandedWidth
                    : SIDE_BAR.width,
            }}
        >
            <SidebarToggle
                isOpen={sidebar?.isOpen}
                setIsOpen={sidebar?.setIsOpen}
            />
            <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        sidebar?.isOpen === false
                            ? "translate-x-1"
                            : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <PanelsTopLeft className="w-6 h-6 mr-1" />
                        <h1
                            className={cn(
                                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                sidebar?.isOpen === false
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            )}
                        >
                            HRM System
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}
