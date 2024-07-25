import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import {
    Select,
    SelectGroup,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Badge } from "../ui/badge";
import { Role, RoleSlug } from "@/types";

interface CustomMultiSelectProps {
    label: string;
    roles: Role[];
    selectedRoles: RoleSlug[];
    setSelectedRoles: (roles: RoleSlug[]) => void;
    error?: string;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
    label,
    roles,
    selectedRoles,
    setSelectedRoles,
    error,
}) => {
    return (
        <div className="mt-4">
            <InputLabel htmlFor="roles" value={label} />
            <div className="mt-1 mb-4 grid grid-cols-2 gap-4">
                {selectedRoles.map((slug) => {
                    const role = roles.find((r) => r.slug === slug);
                    return (
                        <Badge
                            variant="secondary"
                            key={slug}
                            className="cursor-pointer flex items-center justify-between"
                        >
                            <div>{role?.name}</div>
                            <button
                                type="button"
                                className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-300 dark:hover:bg-red-600"
                                onClick={() => {
                                    setSelectedRoles(
                                        selectedRoles.filter((r) => r !== slug)
                                    );
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </Badge>
                    );
                })}
            </div>
            <Select
                name="role"
                onValueChange={(value: RoleSlug) => {
                    setSelectedRoles([...new Set([...selectedRoles, value])]);
                }}
            >
                <SelectTrigger className="w-full bg-input">
                    <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent
                    className="mt-1 block w-full bg-input"
                    style={{ zIndex: 9999 }}
                >
                    <SelectGroup>
                        <SelectLabel className="text-gray-400">
                            Select a role...
                        </SelectLabel>
                        {roles.map((role) => (
                            <SelectItem
                                className={`hover:bg-gray-100 dark:hover:bg-gray-900 ${
                                    selectedRoles.includes(role.slug)
                                        ? "hidden"
                                        : ""
                                }`}
                                key={role.id}
                                value={role.slug}
                            >
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <InputError message={error} className="mt-2" />
        </div>
    );
};

export default CustomMultiSelect;
