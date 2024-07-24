import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import { Link } from "@inertiajs/react";
import { UserPaginatedResponse } from "@/types/trainings";
import moment from "moment";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { initials } from "@/lib/utils";

export function UserTable({
    pagination,
}: {
    pagination: UserPaginatedResponse;
}) {
    const columns: ColumnDef<
        User & {
            pivot: {
                training_id: number;
                user_id: number;
            };
        }
    >[] = [
        {
            accessorFn: (row) => row.employee.photo,
            id: "employee.photo",
            header: "Photo",
            cell: ({ row }) => (
                <Avatar>
                    <AvatarImage
                        src={"photos/" + row.getValue("employee.photo")}
                    />
                    <AvatarFallback>
                        {initials(row.getValue("name"))}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            id: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "created_at",
            id: "created_at",
            header: "Created At",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("created_at")).format("MMMM Do, YYYY")}
                </div>
            ),
        },
        {
            accessorFn: (row) => row.username,
            id: "username",
            header: "Username",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("username")}</div>
            ),
        },
        {
            accessorKey: "updated_at",
            id: "updated_at",
            header: "Updated At",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("updated_at")).format("MMMM Do, YYYY")}
                </div>
            ),
        },

        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Ellipsis className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link href={route("employees.show", user.id)}>
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={route("trainings.unenroll", {
                                        training_id: user.pivot.training_id,
                                        user_id: user.id,
                                    })}
                                    method="delete"
                                    as="button"
                                    className="text-red-600"
                                >
                                    unenroll
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            pagination={pagination}
            filterName="name"
            visibleColumns={{
                created_at: false,
                updated_at: false,
            }}
        />
    );
}
