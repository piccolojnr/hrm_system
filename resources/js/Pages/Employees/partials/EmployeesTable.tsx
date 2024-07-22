import { Employee, EmployeePaginatedResponse } from "@/types/employees";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import { Link } from "@inertiajs/react";
import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function EmployeesTable({
    pagination,
}: {
    pagination: EmployeePaginatedResponse;
}) {
    const columns: ColumnDef<Employee>[] = [
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
        />
    );
}
