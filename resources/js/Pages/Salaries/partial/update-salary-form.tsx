import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Salary } from "@/types/salaries";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateSalaryForm({
    className = "",
    salary,
}: {
    className?: string;
    salary: Salary;
}) {
    const { data, setData, patch, errors, processing } = useForm({
        username: salary.user.username || "",
        amount: salary.amount || "",
        bonus: salary.bonus || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("salaries.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Update Salary</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update Salary.
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
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
