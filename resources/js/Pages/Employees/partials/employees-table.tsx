import { IEmployee, EmployeePaginatedResponse } from "@/types/employees";
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
import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
export function EmployeesTable({
    pagination,
}: {
    pagination: EmployeePaginatedResponse;
}) {
    const columns: ColumnDef<IEmployee>[] = [
        {
            accessorFn: (row) => row.photo,
            id: "photo",
            header: "Photo",
            cell: ({ row }) => (
                <Avatar>
                    <AvatarImage src={"photos/" + row.getValue("photo")} />
                    <AvatarFallback>
                        {initials(row.getValue("user.name"))}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorFn: (row) => row.user.name,
            id: "user.name",

            header: "Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("user.name")}</div>
            ),
        },
        // username
        {
            accessorFn: (row) => row.user.username,
            id: "user.username",
            header: "Username",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("user.username")}</div>
            ),
        },
        {
            accessorFn: (row) => row.user.email,
            id: "user.email",
            header: "Email",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("user.email")}</div>
            ),
        },
        {
            accessorFn: (row) => row.department.name,
            id: "department.name",
            header: "Department",
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("department.name")}
                </div>
            ),
        },
        // birth_date
        {
            accessorKey: "birth_date",
            id: "birth_date",
            header: "Birth Date",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("birth_date")).format("MMMM Do, YYYY")}
                </div>
            ),
        },
        // hire_date
        {
            accessorKey: "hire_date",
            id: "hire_date",
            header: "Hire Date",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("hire_date")).format("MMMM Do, YYYY")}
                </div>
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
                const employee = row.original;

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
                                        "employees.show",
                                        employee.user.id
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
            filterName="user.name"
            visibleColumns={{
                photo: false,
                "user.username": false,
                hire_date: false,
                birth_date: false,
                created_at: false,
                updated_at: false,
            }}
        />
    );
}
