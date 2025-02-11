import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateSalaryForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        amount: "",
        bonus: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("salaries.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Salary</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new Salary.
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
                    <InputLabel htmlFor="amount" value="Amount" />
                    <TextInput
                        id="amount"
                        type="number"
                        name="amount"
                        className="mt-1 block w-full"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        required
                    />
                    <InputError message={errors.amount} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bonus" value="Bonus" />
                    <TextInput
                        id="bonus"
                        type="number"
                        name="bonus"
                        className="mt-1 block w-full"
                        value={data.bonus}
                        onChange={(e) => setData("bonus", e.target.value)}
                        required
                    />
                    <InputError message={errors.bonus} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
