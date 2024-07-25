import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateDepartmentForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        head: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("departments.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Department</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new department.
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
                        htmlFor="description"
                        value="Description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        htmlFor="head"
                        value="User name of the head of department"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="head"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.head}
                        onChange={(e) => setData("head", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.head} />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
