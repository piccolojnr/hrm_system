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
import { Evaluation, EvaluationPaginatedResponse } from "@/types/evaluations";
import moment from "moment";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { PageProps } from "@/types";

export function EvaluationTable({
    pagination,
}: {
    pagination: EvaluationPaginatedResponse;
}) {
    const columns: ColumnDef<Evaluation>[] = [
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "user.name",
            id: "user.name",
            header: "User",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("user.name")}</div>
            ),
        },
        {
            accessorKey: "value",
            id: "value",
            header: "Score",
            cell: ({ row }) => <div>{row.getValue("value")}</div>,
        },

        {
            accessorKey: "notes",
            id: "notes",
            header: "Remarks",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="truncate"
                                style={{ maxWidth: "300px" }}
                            >
                                {row.getValue("notes")}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="p-2 " style={{ maxWidth: "300px" }}>
                                {row.getValue("notes")}
                            </div>
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
                const Evaluation = row.original;
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
                                                "evaluations.show",
                                                Evaluation.id
                                            )}
                                        >
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "evaluations.destroy",
                                                Evaluation.id
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
            filterName="user.name"
            visibleColumns={{
                created_at: false,
                updated_at: false,
            }}
        />
    );
}
