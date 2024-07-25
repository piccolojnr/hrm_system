import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { RoleSlug } from "@/types";
import CustomMultiSelect from "@/Components/extension/multi-select";
import {
    Select,
    SelectGroup,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { CreateEmployeePageProps } from "@/types/employees";
export default function CreateUserForm({
    className = "",
}: {
    className?: string;
}) {
    const { roles, departments } = usePage<CreateEmployeePageProps>().props;
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        username: "",
        email: "",
        roles: [] as RoleSlug[],
        department: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Employee</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new employee account.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="username"
                        value="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <CustomMultiSelect
                    label="Roles"
                    roles={roles}
                    selectedRoles={data.roles}
                    setSelectedRoles={(roles) => setData("roles", roles)}
                    error={errors.roles}
                />
                <div className="mt-4">
                    <InputLabel htmlFor="department" value="Department" />
                    <Select
                        name="department"
                        value={data.department}
                        onValueChange={(value) => setData("department", value)}
                        required
                    >
                        <SelectTrigger className="w-full bg-input">
                            <SelectValue placeholder="Select a department...  " />
                        </SelectTrigger>
                        <SelectContent
                            className="mt-1 block w-full bg-input"
                            style={{ zIndex: 9999 }}
                        >
                            <SelectGroup>
                                <SelectLabel className="text-gray-400">
                                    Select a department...
                                </SelectLabel>
                                {departments.map((department) => (
                                    <SelectItem
                                        className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                        key={department.id}
                                        value={department.slug}
                                    >
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.department} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
