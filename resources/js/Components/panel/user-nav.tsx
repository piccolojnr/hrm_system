"use client";

import { LayoutGrid, LogOut, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { initials } from "@/lib/utils";

export function UserNav() {
    const {
        props: {
            auth: { user },
        },
    } = usePage<PageProps>();
    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={
                                            "/photos/" + user.employee.photo ||
                                            undefined
                                        }
                                        alt="Avatar"
                                    />
                                    <AvatarFallback className="bg-transparent">
                                        {initials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/dashboard" className="flex items-center">
                            <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center"
                        >
                            <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex items-center"
                    >
                        <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                        Sign out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
