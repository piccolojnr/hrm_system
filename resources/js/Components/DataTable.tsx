import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    Table as ITable,
} from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { ChevronDownIcon } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { PaginatedResponse } from "@/types";
import { cn } from "@/lib/utils";

export function DataTable<T>({
    columns,
    filterName,
    pagination,
    visibleColumns = {},
    moreFilters = [],
    disableDefaultFilters = false,
}: {
    columns: ColumnDef<T>[];
    pagination: PaginatedResponse<T>;
    filterName: string;
    visibleColumns?: VisibilityState;
    moreFilters?: JSX.Element[];
    disableDefaultFilters?: boolean;
}) {
    const { data } = pagination;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>(visibleColumns);
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div
                    className={cn(
                        "flex items-center space-x-2",
                        table.getRowModel().rows.length === 0 && "justify-end"
                    )}
                >
                    {!disableDefaultFilters && (
                        <DataTableFilter
                            filterName={filterName}
                            pagination={pagination}
                        />
                    )}
                    {moreFilters.map((Filter) => Filter)}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination pagination={pagination} table={table} />
        </div>
    );
}

function Pagination<T>({
    pagination: { current_page, last_page, next_page_url, prev_page_url },
    table,
}: {
    pagination: PaginatedResponse<T>;
    table: ITable<T>;
}) {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="text-sm text-muted-foreground">
                Page {current_page} of {last_page}
            </div>

            <Link
                href={prev_page_url || ""}
                disabled={!prev_page_url}
                as="button"
                className={cn(
                    "text-sm border rounded-md px-4 py-2",
                    !prev_page_url && "text-muted-foreground cursor-not-allowed"
                )}
            >
                Previous
            </Link>
            <Link
                href={next_page_url || ""}
                disabled={!next_page_url}
                as="button"
                className={cn(
                    "text-sm border rounded-md px-4 py-2",
                    !next_page_url && "text-muted-foreground cursor-not-allowed"
                )}
            >
                Next
            </Link>
        </div>
    );
}

function DataTableFilter<T>({
    filterName,
    pagination,
}: {
    filterName: string;
    pagination: PaginatedResponse<T>;
}) {
    filterName = filterName.replace(".", "_");

    const { data, setData, get } = useForm({
        [filterName]: "",
        page: 1,
    });
    const handleFilterSubmit = (event: any) => {
        event.preventDefault();
        get("", { [filterName]: data[filterName], preserveState: true });
    };

    return (
        <div
            className={cn(
                "flex items-center space-x-2",
                pagination.data.length === 0 && "justify-end"
            )}
        >
            <form
                onSubmit={handleFilterSubmit}
                className="flex items-center space-x-2"
            >
                <Input
                    placeholder="Filter..."
                    value={data[filterName]}
                    onChange={(event) => {
                        setData(filterName, event.target.value);
                    }}
                    className="max-w-sm"
                />
            </form>
            <Link
                href={pagination.path}
                as="button"
                className="border rounded-md px-4 py-1"
            >
                Clear
            </Link>
        </div>
    );
}
