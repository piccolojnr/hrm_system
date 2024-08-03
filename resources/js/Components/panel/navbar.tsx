import { ModeToggle } from "@/Components/mode-toggle";
import { UserNav } from "@/Components/panel/user-nav";
import { SheetMenu } from "@/Components/panel/sheet-menu";
import { cn } from "@/lib/utils";
import { useStore } from "zustand";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

interface NavbarProps {
    title: string;
}

export function Navbar({ title }: NavbarProps) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    return (
        <header
            className={cn(
                "sticky top-0 z-10  bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary",
                "transition-[margin-left] ease-in-out duration-300",
                sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
        >
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    {/* <ModeToggle /> */}
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
