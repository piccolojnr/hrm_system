import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Textarea } from "@/components/ui/textarea";
import { Training } from "@/types/trainings";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateTrainingForm({
    className = "",
    training,
}: {
    className?: string;
    training: Training;
}) {
    const { data, setData, patch, errors, processing } = useForm({
        description: training.description || "",
        type: training.type || "",
        username: training.user.username || "",
        name: training.name || "",
        year: training.year || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("trainings.update", training.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Update Training</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update training.
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
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2" />
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
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
