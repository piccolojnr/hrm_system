import { RoleSlug } from "@/types";
import {
    LayoutGrid,
    Users,
    Briefcase,
    Settings,
    Calendar,
    FileText,
    LucideIcon
} from "lucide-react";


type Submenu = {
    href: string;
    label: string;
    active: boolean;
    requiredRole: RoleSlug[];
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
    requiredRole: RoleSlug[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, userRole: string): Group[] {
    const all = ["admin", "hr_manager", "department_manager", "employee"];
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                    requiredRole: all
                }
            ]
        },
        {
            groupLabel: "HR Management",
            menus: [
                {
                    href: "/departments",
                    label: "Departments",
                    active: pathname.includes("/departments"),
                    icon: Briefcase,
                    submenus: [],
                    requiredRole: ["hr_manager"]
                },
                {
                    href: route("employees"),
                    label: "Employees",
                    active: pathname.includes(route("employees")),
                    icon: Users,
                    submenus: [
                        {
                            href: route("employees"),
                            label: "All Employees",
                            active: pathname === route("employees"),
                            requiredRole: ["hr_manager"]
                        },
                        {
                            href: route("employees.create"),
                            label: "New Employee",
                            active: pathname === route("employees.create"),
                            requiredRole: ["hr_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager"]
                },
                {
                    href: "/trainings",
                    label: "Trainings",
                    active: pathname.includes("/trainings"),
                    icon: FileText,
                    submenus: [
                        {
                            href: "/trainings",
                            label: "All Trainings",
                            active: pathname === "/trainings",
                            requiredRole: ["hr_manager"]
                        },
                        {
                            href: "/trainings/new",
                            label: "New Training",
                            active: pathname === "/trainings/new",
                            requiredRole: ["hr_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager"]
                },
                {
                    href: "/salaries",
                    label: "Salaries",
                    active: pathname.includes("/salaries"),
                    icon: Calendar,
                    submenus: [],
                    requiredRole: ["admin"]
                },
                {
                    href: "/vacations",
                    label: "Vacations",
                    active: pathname.includes("/vacations"),
                    icon: Calendar,
                    submenus: [],
                    requiredRole: all
                },
                {
                    href: "/attendance",
                    label: "Attendance",
                    active: pathname.includes("/attendance"),
                    icon: Calendar,
                    submenus: [],
                    requiredRole: all
                },
                {
                    href: "/evaluations",
                    label: "Evaluations",
                    active: pathname.includes("/evaluations"),
                    icon: FileText,
                    submenus: [],
                    requiredRole: ["department_manager", "admin"]
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: route("profile.edit"),
                    label: "profile",
                    active: pathname.includes("/profile"),
                    icon: Settings,
                    submenus: [],
                    requiredRole: all
                }
            ]
        }
    ].map(group => ({
        ...group,
        // menus: group.menus.filter(menu => menu.requiredRole.includes(userRole) || menu.requiredRole.includes('employee'))
        menus: group.menus
    })) as Group[];
}
