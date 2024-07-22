import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import { EditProfilePageProps, User } from "@/types";
import {
    Select,
    SelectGroup,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function UpdateEmployeeInformation({
    className = "",
    user,
}: {
    className?: string;
    user: User;
}) {
    const { departments } = usePage<EditProfilePageProps>().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            address: user.employee.address || "",
            birth_date: user.employee.birth_date
                ? new Date(user.employee.birth_date).toISOString().split("T")[0]
                : "",
            hire_date: user.employee.hire_date
                ? new Date(user.employee.hire_date).toISOString().split("T")[0]
                : "",
            department: user.employee.department.slug || "",
            mobile: user.employee.mobile || "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("employee.update", user.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Employee Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's employee information.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <InputLabel
                        htmlFor="address"
                        value="Address"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="mobile"
                        value="Mobile"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="mobile"
                        className="mt-1 block w-full"
                        value={data.mobile}
                        onChange={(e) => setData("mobile", e.target.value)}
                        autoComplete="mobile"
                    />

                    <InputError className="mt-2" message={errors.mobile} />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="birth_date"
                        value="Birth Date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="birth_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        autoComplete="birth_date"
                    />

                    <InputError className="mt-2" message={errors.birth_date} />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="hire_date"
                        value="Hire Date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="hire_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.hire_date}
                        onChange={(e) => setData("hire_date", e.target.value)}
                        autoComplete="hire_date"
                    />

                    <InputError className="mt-2" message={errors.hire_date} />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="department"
                        value="Department"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />
                    <Select
                        name="department"
                        value={data.department}
                        onValueChange={(value) => setData("department", value)}
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
