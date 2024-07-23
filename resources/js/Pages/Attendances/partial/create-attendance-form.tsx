import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateAttendanceForm({
    className = "",
}: {
    className?: string;
}) {
    const { data, setData, post, errors, processing } = useForm({
        type: "",
        username: "",
        check_in: "",
        check_out: "",
        date: new Date().toISOString().split("T")[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("attendances.create"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium ">Create Attendance</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create a new attendance.
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
                    <InputLabel htmlFor="date" value="Date" />
                    <TextInput
                        id="date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        required
                    />
                    <InputError message={errors.date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="check_in" value="Check In" />
                    <TextInput
                        id="check_in"
                        type="time"
                        className="mt-1 block w-full"
                        value={data.check_in}
                        onChange={(e) => setData("check_in", e.target.value)}
                    />
                    <InputError message={errors.check_in} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="check_out" value="Check Out" />
                    <TextInput
                        id="check_out"
                        type="time"
                        className="mt-1 block w-full"
                        value={data.check_out}
                        onChange={(e) => setData("check_out", e.target.value)}
                    />
                    <InputError message={errors.check_out} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
