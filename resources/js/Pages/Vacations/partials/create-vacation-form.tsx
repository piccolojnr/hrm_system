import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateVacationForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        start_date: "",
        end_date: "",
        reason: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("vacations.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Vacation</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new Vacation.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="start_date" value="Start Date" />
                    <TextInput
                        id="start_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                        required
                    />
                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                        id="end_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                        required
                    />
                    <InputError message={errors.end_date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="reason" value="Reason" />
                    <Textarea
                        id="reason"
                        className="mt-1 block w-full"
                        value={data.reason}
                        onChange={(e) => setData("reason", e.target.value)}
                        required
                    />
                    <InputError message={errors.reason} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
