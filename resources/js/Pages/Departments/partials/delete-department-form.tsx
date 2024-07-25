import { useState, FormEventHandler } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Department } from "@/types/departments";

export default function DeleteDepartmentForm({
    className = "",
    department,
}: {
    className?: string;
    department: Department;
}) {
    const [confirmingDepartmentDeletion, setConfirmingDepartmentDeletion] =
        useState(false);

    const {
        delete: destroy,
        processing,
        reset,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingDepartmentDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("departments.destroy", department.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDepartmentDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium ">Delete Department</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once this is deleted, all of its resources and data will be
                    permanently deleted.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Delete Department
            </DangerButton>

            <Modal show={confirmingDepartmentDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium ">Delete Department</h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this is deleted, all of its resources and data will
                        be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Department
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
