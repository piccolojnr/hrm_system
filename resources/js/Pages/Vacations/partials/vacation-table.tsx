import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Ellipsis } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    Vacation,
    VacationPaginatedResponse,
    VacationsPageProps,
} from "@/types/vacations";
import moment from "moment";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";

const StatusBadge = ({ status }: { status: string }) => {
    const statusColor = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
    };

    return (
        <>
            <span
                className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    statusColor[status as keyof typeof statusColor]
                )}
            >
                {status}
            </span>
        </>
    );
};

const FilterMenu = ({
    pagination,
}: {
    pagination: VacationPaginatedResponse;
}) => {
    const getUrl = (key: string, value: string) => {
        const url = new URL(pagination.path);
        url.searchParams.set(key, value);
        return url.toString();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <DropdownMenuCheckboxItem
                        checked={pagination.links[
                            pagination.current_page
                        ]?.url?.includes("status=pending")}
                    >
                        <Link
                            href={getUrl("status", "pending")}
                            method="get"
                            className="text-gray-600"
                        >
                            Pending
                        </Link>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DropdownMenuCheckboxItem
                        checked={pagination.links[
                            pagination.current_page
                        ]?.url?.includes("status=approved")}
                    >
                        <Link
                            href={getUrl("status", "approved")}
                            method="get"
                            className="text-gray-600"
                        >
                            Approved
                        </Link>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DropdownMenuCheckboxItem
                        checked={pagination.links[
                            pagination.current_page
                        ]?.url?.includes("status=rejected")}
                    >
                        <Link
                            href={getUrl("status", "rejected")}
                            method="get"
                            className="text-gray-600"
                        >
                            Rejected
                        </Link>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button variant="ghost">
                        <Link
                            href={pagination.path}
                            method="get"
                            className="text-gray-600"
                        >
                            Clear
                        </Link>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export function VacationTable({
    pagination,
}: {
    pagination: VacationPaginatedResponse;
}) {
    const { roles } = usePage<PageProps>().props.auth.user;

    const columns: ColumnDef<Vacation>[] = [
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorFn: (row) => row.user.name,
            id: "user.name",
            header: "User",
            cell: ({ row }) => <div>{row.getValue("user.name")}</div>,
        },
        {
            accessorKey: "start_date",
            id: "start_date",
            header: "Start Date",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("start_date")).format("MMMM Do, YYYY")}
                </div>
            ),
        },
        {
            accessorKey: "end_date",
            id: "end_date",
            header: "End Date",
            cell: ({ row }) => (
                <div className="capitalize">
                    {moment(row.getValue("end_date")).format("MMMM Do, YYYY")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            id: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "reason",
            id: "reason",
            header: "Reason",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("reason")}</div>
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
                const Vacation = row.original;
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
                            {row.getValue("status") === "pending" && (
                                <DropdownMenuItem>
                                    <Link
                                        href={route(
                                            "vacations.show",
                                            Vacation.id
                                        )}
                                    >
                                        View
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {roles.some((x) =>
                                ["admin", "hr_manager"].includes(x.slug)
                            ) && (
                                <>
                                    {row.getValue("status") === "pending" && (
                                        <>
                                            <DropdownMenuItem>
                                                <Link
                                                    href={route(
                                                        "vacations.approve",
                                                        Vacation.id
                                                    )}
                                                    method="post"
                                                    as="button"
                                                    className="text-green-600"
                                                >
                                                    Approve
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    href={route(
                                                        "vacations.reject",
                                                        Vacation.id
                                                    )}
                                                    method="post"
                                                    as="button"
                                                    className="text-red-600"
                                                >
                                                    Reject
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {row.getValue("status") === "rejected" && (
                                        <DropdownMenuItem>
                                            <Link
                                                href={route(
                                                    "vacations.approve",
                                                    Vacation.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="text-green-600"
                                            >
                                                Approve
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {row.getValue("status") === "approved" && (
                                        <DropdownMenuItem>
                                            <Link
                                                href={route(
                                                    "vacations.reject",
                                                    Vacation.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="text-red-600"
                                            >
                                                Reject
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                </>
                            )}
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Link
                                    href={route(
                                        "vacations.destroy",
                                        Vacation.id
                                    )}
                                    method="delete"
                                    as="button"
                                    className="text-red-600"
                                >
                                    Delete
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
                created_at: false,
                updated_at: false,
            }}
            moreFilters={[<FilterMenu key="filter" pagination={pagination} />]}
        />
    );
}
