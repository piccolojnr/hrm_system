import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateTrainingForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        description: "",
        type: "",
        name: "",
        year: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("trainings.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Training</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new training.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="type" value="Type" />
                    <TextInput
                        id="type"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        required
                    />
                    <InputError message={errors.type} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <Textarea
                        id="description"
                        className="mt-1 block w-full rounded-md"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="year" value="Year" />
                    <TextInput
                        id="year"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.year}
                        onChange={(e) => setData("year", e.target.value)}
                        required
                    />
                    <InputError message={errors.year} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
