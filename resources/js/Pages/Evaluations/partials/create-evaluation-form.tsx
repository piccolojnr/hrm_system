import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateEvaluationForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        notes: "",
        username: "",
        value: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("evaluations.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Evaluation</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new Evaluation.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="value" value="Score" />
                    <TextInput
                        id="value"
                        name="value"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.value}
                        onChange={(e) => setData("value", e.target.value)}
                        required
                    />
                    <InputError message={errors.value} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="notes" value="Remarks" />
                    <Textarea
                        id="notes"
                        className="mt-1 block w-full"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        required
                    />
                    <InputError message={errors.notes} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
