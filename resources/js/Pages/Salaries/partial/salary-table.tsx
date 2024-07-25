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
import { Link, usePage } from "@inertiajs/react";
import { Salary, SalaryPaginatedResponse } from "@/types/salaries";
import moment from "moment";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageProps } from "@/types";

export function SalaryTable({
    pagination,
}: {
    pagination: SalaryPaginatedResponse;
}) {
    const columns: ColumnDef<Salary>[] = [
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
            accessorKey: "amount",
            id: "amount",
            header: "Amount",
            cell: ({ row }) => <div>{row.getValue("amount")}</div>,
        },
        {
            accessorKey: "bonus",
            id: "bonus",
            header: "Bonus",
            cell: ({ row }) => <div>{row.getValue("bonus")}</div>,
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
                const salary = row.original;
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
                            {roles.some(
                                (x) => x.slug === "admin" || "hr_manager"
                            ) && (
                                <>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "salaries.show",
                                                salary.id
                                            )}
                                        >
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "salaries.destroy",
                                                salary.id
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
