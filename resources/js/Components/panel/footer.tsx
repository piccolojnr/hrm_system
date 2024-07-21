import { Link } from "@inertiajs/react";

export function Footer() {
    return (
        <div
            className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60
        dark:bg-background-dark/95 dark:backdrop-blur-dark dark:supports-[backdrop-filter]:bg-background-dark/60
        "
        >
            <div
                className="mx-4 md:mx-8 flex h-14 items-center
            justify-between text-xs text-gray-500 dark:text-gray-300
            "
            >
                <span className="text-sm dark:text-gray-200">
                    ©
                    <Link href="" className="text-blue-500">
                        HRM System
                    </Link>{" "}
                    2021. All rights reserved.
                </span>
            </div>
        </div>
    );
}
