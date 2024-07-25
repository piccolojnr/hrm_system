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
                    requiredRole: []
                }
            ]
        },
        {
            groupLabel: "HR Management",
            menus: [
                {
                    label: "Departments",
                    active: pathname.includes(route("departments.index"),),
                    icon: Briefcase,
                    submenus: [
                        {
                            href: route("departments.index"),
                            label: "All Departments",
                            active: pathname === route("departments.index"),
                            requiredRole: ["hr_manager", "admin"]
                        },
                        {
                            href: route("departments.create"),
                            label: "New Department",
                            active: pathname === route("departments.create"),
                            requiredRole: ["hr_manager", "admin"]
                        }
                    ],
                    requiredRole: ["hr_manager", "admin"]
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
                            requiredRole: ["hr_manager", "admin", "department_manager"]
                        },
                        {
                            href: route("employees.create"),
                            label: "New Employee",
                            active: pathname === route("employees.create"),
                            requiredRole: ["hr_manager", "admin"]
                        }
                    ],
                    requiredRole: ["hr_manager", "admin", "department_manager"]
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
                            requiredRole: ["hr_manager", "admin"]
                        },
                        {
                            href: route("trainings.create"),
                            label: "New Training",
                            active: pathname === route("trainings.create"),
                            requiredRole: ["hr_manager", "admin"]
                        },
                    ],
                    requiredRole: ["hr_manager", "admin"]
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
                            requiredRole: ["hr_manager", "admin"]
                        },
                        {
                            href: route("salaries.create"),
                            label: "New Salary",
                            active: pathname === route("salaries.create"),
                            requiredRole: ["hr_manager", "admin"]
                        }
                    ],
                    requiredRole: ["hr_manager", "admin"]
                },
                {
                    href: route("vacations.index"),
                    label: "Vacations",
                    active: pathname.includes(route("vacations.index")),
                    icon: TreePalm,
                    submenus: [],
                    requiredRole: ["hr_manager", "admin"]
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
                            requiredRole: ["hr_manager", "admin", "department_manager"]
                        },
                        {
                            href: route("attendances.create"),
                            label: "New Attendance",
                            active: pathname === route("attendances.create"),
                            requiredRole: ["hr_manager", "admin", "department_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager", "admin", "department_manager"]
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
                            requiredRole: ["hr_manager", "admin", "department_manager"]
                        },
                        {
                            href: route("evaluations.create"),
                            label: "New Evaluation",
                            active: pathname === route("evaluations.create"),
                            requiredRole: ["hr_manager", "admin", "department_manager"]
                        }
                    ],
                    requiredRole: ["hr_manager", "admin", "department_manager"]
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
                    submenus: [
                        {
                            href: route("profile.edit"),
                            label: "Edit Profile",
                            active: pathname === route("profile.edit"),
                            requiredRole: []
                        },
                        {
                            href: route('vacations.create'),
                            label: 'Request Vacation',
                            active: pathname === route('vacations.create'),
                            requiredRole: []
                        },
                        {
                            href: route('profile.vacations'),
                            label: 'Vacation History',
                            active: pathname.includes(route('profile.vacations')),
                            requiredRole: []
                        },
                        {
                            href: route('profile.salaries'),
                            label: 'Salary History',
                            active: pathname.includes(route('profile.salaries')),
                            requiredRole: []
                        },
                        {
                            href: route('profile.salaries.slip'),
                            label: 'Salary Slip',
                            active: pathname.includes(route('profile.salaries.slip')),
                            requiredRole: []
                        },
                        {
                            href: route('profile.attendances'),
                            label: 'Attendance',
                            active: pathname.includes(route('profile.attendances')),
                            requiredRole: []
                        },
                        {
                            href: route('profile.evaluations'),
                            label: 'Evaluation',
                            active: pathname.includes(route('profile.evaluations')),
                            requiredRole: []
                        },
                        {
                            href: route('profile.trainings'),
                            label: 'Training Enrolled',
                            active: pathname.includes(route('profile.trainings')),
                            requiredRole: []
                        },

                    ],
                    requiredRole: []
                }
            ],
        }
    ]
        .map(group => ({
            ...group,
            menus: group.menus.filter(menu => menu.requiredRole.length === 0 ? true : menu.requiredRole.includes(userRole)).map(menu => ({
                ...menu,
                submenus: menu.submenus.filter(submenu => submenu.requiredRole.length === 0 ? true : submenu.requiredRole.includes(userRole))
            }))
        }))
        .filter(group => group.menus.length > 0) as Group[];
}
