import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Ellipsis } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Link, usePage } from "@inertiajs/react";
import { Training, TrainingPaginatedResponse } from "@/types/trainings";
import moment from "moment";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { PageProps } from "@/types";

export function TrainingTable({
    pagination,
}: {
    pagination: TrainingPaginatedResponse;
}) {
    const columns: ColumnDef<Training>[] = [
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "type",
            id: "type",
            header: "Type",
            cell: ({ row }) => <div>{row.getValue("type")}</div>,
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
            accessorKey: "year",
            id: "year",
            header: "Year",
            cell: ({ row }) => <div>{row.getValue("year")}</div>,
        },
        // user enrolled
        {
            accessorKey: "users_count",
            id: "users_count",
            header: "Users Enrolled",
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("users_count")}</div>
            ),
        },
        {
            accessorKey: "description",
            id: "description",
            header: "Description",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="capitalize truncate"
                                style={{ maxWidth: "300px" }}
                            >
                                {row.getValue("description")}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p
                                className="capitalize"
                                style={{ maxWidth: "300px" }}
                            >
                                {row.getValue("description")}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
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
                const Training = row.original;
                const { roles } = usePage<PageProps>().props.auth.user;
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
                            {roles.some((x) =>
                                ["admin", "hr_manager"].includes(x.slug)
                            ) && (
                                <>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "trainings.show",
                                                Training.id
                                            )}
                                        >
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "trainings.destroy",
                                                Training.id
                                            )}
                                            method="delete"
                                            as="button"
                                            className="text-red-600"
                                        >
                                            Delete
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}
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
