import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import { User } from "@/types";
import { EditProfilePageProps } from "@/types/employees";

export default function UpdateEmployeePhoto({
    className = "",
    user,
}: {
    className?: string;
    user: User;
}) {
    const {} = usePage<EditProfilePageProps>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            photo: null as File | null,
        });

    const [photoPreview, setPhotoPreview] = useState(
        user.employee.photo ? `/photos/${user.employee.photo}` : ""
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("photo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", data.photo as any);
        post(route("employee.update.photo", user.id), formData as any);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Update Photo</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your profile photo.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="mt-4">
                    <InputLabel
                        htmlFor="photo"
                        value="Photo"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    />
                    <input
                        id="photo"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt="Photo Preview"
                            className="mt-2 h-20 w-20 object-cover"
                        />
                    )}
                    <InputError className="mt-2" message={errors.photo} />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
