import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Components/ui/textarea";
import { Evaluation } from "@/types/evaluations";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateEvaluationForm({
    className = "",
    evaluation,
}: {
    className?: string;
    evaluation: Evaluation;
}) {
    const { data, setData, patch, errors, processing } = useForm({
        value: evaluation.value || "",
        username: evaluation.user.username || "",
        notes: evaluation.notes || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("evaluations.update", evaluation.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Update Evaluation</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update Evaluation.
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
                        disabled
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
                        name="notes"
                        className="mt-1 block w-full"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                    />
                    <InputError message={errors.notes} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
