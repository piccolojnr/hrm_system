import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const EmailForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route("send-email"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="email"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="subject" value="Subject" />
                <TextInput
                    type="text"
                    id="subject"
                    name="subject"
                    value={data.subject}
                    className="mt-1 block w-full"
                    autoComplete="subject"
                    isFocused={true}
                    onChange={(e) => setData("subject", e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="message" value="Message" />
                <Textarea
                    id="message"
                    name="message"
                    value={data.message}
                    className="mt-1 block w-full"
                    autoComplete="message"
                    onChange={(e) => setData("message", e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" disabled={processing}>
                    Send Email
                </PrimaryButton>
            </div>
        </form>
    );
};

export default EmailForm;
