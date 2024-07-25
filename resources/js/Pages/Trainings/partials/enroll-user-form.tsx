import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function EnrollUserForm({
    className = "",
    training_id,
}: {
    className?: string;
    training_id: number;
}) {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("trainings.enroll", training_id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Enroll Employee</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Enroll employee to this training.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="username"
                        value="Username of employee"
                    />
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Enroll</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
