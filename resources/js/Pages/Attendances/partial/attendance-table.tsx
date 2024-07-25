import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Filter, X } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Attendance, AttendancePaginatedResponse } from "@/types/attendances";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Modal from "@/components/Modal";
import moment from "moment";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";

const TimeModal = ({
    name,
    attendance,
}: {
    name: string;
    attendance: Attendance;
}) => {
    const { roles } = usePage<PageProps>().props.auth.user;
    const [open, setOpen] = useState(false);
    const { data, patch, setData } = useForm({
        type: attendance.type || "",
        check_in: attendance.check_in || "",
        check_out: attendance.check_out || "",
        user_id: attendance.user.id || "",
        date: attendance.date || "",
    } as any);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        patch(route("attendances.update", attendance.id), {
            preserveState: true,
        });
    };

    return (
        <div className="capitalize">
            <Button
                variant={"secondary"}
                size="sm"
                className={cn(
                    "capitalize px-4 py-1 rounded-3xl",
                    data[name] ? "text-green-500" : "text-red-500"
                )}
                onClick={() => setOpen(true)}
            >
                {data[name] ? data[name] : "Not yet"}
            </Button>
            {roles.map((x) => x.slug).includes("admin" || "hr_manager") && (
                <Modal show={open} onClose={() => setOpen(false)}>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h1>
                            {name === "check_in" ? "Check In" : "Check Out"}
                        </h1>
                        <Input
                            type="time"
                            value={data[name]}
                            onChange={(e) => setData(name, e.target.value)}
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export function AttendanceTable({
    pagination,
}: {
    pagination: AttendancePaginatedResponse;
}) {
    const columns: ColumnDef<Attendance>[] = [
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        // type
        {
            accessorKey: "type",
            id: "type",
            header: "Type",
            cell: ({ row }) => <div>{row.getValue("type")}</div>,
        },
        // check_in
        {
            accessorKey: "check_in",
            id: "check_in",
            header: "Check In",
            cell: ({ row }) => (
                <TimeModal attendance={row.original} name="check_in" />
            ),
        },
        // check_out
        {
            accessorKey: "check_out",
            id: "check_out",
            header: "Check Out",
            cell: ({ row }) => (
                <TimeModal attendance={row.original} name="check_out" />
            ),
        },
        // date
        {
            accessorKey: "date",
            id: "date",
            header: "Date",
            cell: ({ row }) => (
                <div className="capitalize">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="capitalize"
                                    style={{ color: "#4cd964" }}
                                >
                                    {moment(row.getValue("date")).format(
                                        "dddd"
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {moment(row.getValue("date")).format(
                                    "MMMM Do, YYYY"
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
        },
        {
            accessorFn: (row) => row.user.name,
            id: "user.name",
            header: "Employee",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("user.name")}</div>
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
                                [
                                    "admin",
                                    "hr_manager",
                                    "department_manager",
                                ].includes(x.slug)
                            ) && (
                                <DropdownMenuItem>
                                    {/* delete */}
                                    <Link
                                        href={route(
                                            "attendances.destroy",
                                            department.id
                                        )}
                                        method="delete"
                                        as="button"
                                        className="flex items-center space-x-2 text-red-500"
                                    >
                                        <span>Delete</span>
                                    </Link>
                                </DropdownMenuItem>
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
            moreFilters={[<DateFilter key="day" filterName="day" />]}
        />
    );
}
const DateFilter = ({ filterName }: { filterName: string }) => {
    // Replace dot with underscore for the filter name
    filterName = filterName.replace(".", "_");

    // Initialize the form state with useForm
    const { data, setData, get, reset } = useForm({
        [filterName]: "",
        page: 1,
    });

    // Handle form submission
    const handleFilterSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        get("", {
            preserveState: true,
            [filterName]: data[filterName],
            page: 1,
        } as any);
    };

    // Handle clearing the filter
    const handleClearFilter = () => {
        reset();
        get("");
    };

    return (
        <form
            onSubmit={handleFilterSubmit}
            className="flex items-center space-x-0.5"
        >
            <Input
                placeholder="Day"
                type="date"
                value={data[filterName]}
                onChange={(event) => setData(filterName, event.target.value)}
                className="max-w-sm"
            />

            <div className="flex space-x-0.5">
                <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="rounded-r-none p-2"
                >
                    <Filter size={10} />
                </Button>
                <Button
                    onClick={handleClearFilter}
                    variant="outline"
                    size="sm"
                    className="rounded-l-none p-2"
                >
                    <X size={10} />
                </Button>
            </div>
        </form>
    );
};
