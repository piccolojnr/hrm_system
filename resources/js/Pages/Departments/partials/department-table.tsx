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
import { Link } from "@inertiajs/react";
import { Department, DepartmentPaginatedResponse } from "@/types/departments";
import moment from "moment";

export function DepartmentTable({
    pagination,
}: {
    pagination: DepartmentPaginatedResponse;
}) {
    const columns: ColumnDef<Department>[] = [
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        // slug
        {
            accessorKey: "slug",
            id: "slug",
            header: "Slug",
            cell: ({ row }) => <div>{row.getValue("slug")}</div>,
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
            accessorKey: "description",
            id: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("description")}</div>
            ),
        },
        {
            accessorFn: (row) => row.head.name,
            id: "head.name",
            header: "Department Head",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("head.name")}</div>
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
                const department = row.original;
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
                                <Link
                                    href={route(
                                        "departments.show",
                                        department.id
                                    )}
                                >
                                    View
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
                slug: false,
                created_at: false,
                updated_at: false,
            }}
        />
    );
}
