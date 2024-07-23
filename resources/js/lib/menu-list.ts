import { RoleSlug } from "@/types";
import {
    LayoutGrid,
    Users,
    Briefcase,
    Settings,
    Calendar,
    FileText,
    LucideIcon,
    SquareLibrary,
    CircleDollarSign,
    TreePalm
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
                    href: route("dashboard"),
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
                    href: route("departments.index"),
                    label: "Departments",
                    active: pathname.includes(route("departments.index"),),
                    icon: Briefcase,
                    submenus: [
                        {
                            href: route("departments.index"),
                            label: "All Departments",
                            active: pathname === route("departments.index"),
                            requiredRole: ["hr_manager"]
                        },
                        {
                            href: route("departments.create"),
                            label: "New Department",
                            active: pathname === route("departments.create"),
                            requiredRole: ["hr_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager"]
                },
                {
                    href: route("employees.index"),
                    label: "Employees",
                    active: pathname.includes(route("employees.index")),
                    icon: Users,
                    submenus: [
                        {
                            href: route("employees.index"),
                            label: "All Employees",
                            active: pathname === route("employees.index"),
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
                    href: route("trainings.index"),
                    label: "Trainings",
                    active: pathname.includes(route("trainings.index")),
                    icon: SquareLibrary,
                    submenus: [
                        {
                            href: route("trainings.index"),
                            label: "All Trainings",
                            active: pathname === route("trainings.index"),
                            requiredRole: ["hr_manager"]
                        },
                        {
                            href: route("trainings.create"),
                            label: "New Training",
                            active: pathname === route("trainings.create"),
                            requiredRole: ["hr_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager"]
                },
                {
                    href: route("salaries.index"),
                    label: "Salaries",
                    active: pathname.includes(route("salaries.index")),
                    icon: CircleDollarSign,
                    submenus: [
                        {
                            href: route("salaries.index"),
                            label: "All Salaries",
                            active: pathname === route("salaries.index"),
                            requiredRole: ["hr_manager"]
                        },
                        {
                            href: route("salaries.create"),
                            label: "New Salary",
                            active: pathname === route("salaries.create"),
                            requiredRole: ["hr_manager"]
                        }
                    ],
                    requiredRole: ["admin"]
                },
                {
                    href: "/vacations",
                    label: "Vacations",
                    active: pathname.includes("/vacations"),
                    icon: TreePalm,
                    submenus: [],
                    requiredRole: all
                },
                {
                    href: route("attendances.index"),
                    label: "Attendance",
                    active: pathname.includes(route("attendances.index"),),
                    icon: Calendar,
                    submenus: [
                        {
                            href: route("attendances.index"),
                            label: "All Attendance",
                            active: pathname === route("attendances.index"),
                            requiredRole: all
                        },
                        {
                            href: route("attendances.create"),
                            label: "New Attendance",
                            active: pathname === route("attendances.create"),
                            requiredRole: all
                        }
                    ],
                    requiredRole: all
                },
                {
                    href: route("evaluations.index"),
                    label: "Evaluations",
                    active: pathname.includes(route("evaluations.index")),
                    icon: FileText,
                    submenus: [
                        {
                            href: route("evaluations.index"),
                            label: "All Evaluations",
                            active: pathname === route("evaluations.index"),
                            requiredRole: all
                        },
                        {
                            href: route("evaluations.create"),
                            label: "New Evaluation",
                            active: pathname === route("evaluations.create"),
                            requiredRole: all
                        }
                    ],
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
