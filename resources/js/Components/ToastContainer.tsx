import { useEffect } from "react";
import { useToast } from "./ui/usetoast";
import "../../css/ToastStyles.css";

interface ToastContainerProps {
    message: string;
    type: string;
}

const ToastContainer = ({ message, type }: ToastContainerProps) => {
    const { toast } = useToast();

    useEffect(() => {
        if (message) {
            let toastClass = "toast-success";

            switch (type) {
                case "error":
                    toastClass = "toast-error";
                    break;
                case "info":
                    toastClass = "toast-info";
                    break;
                case "warning":
                    toastClass = "toast-warning";
                    break;
                default:
                    toastClass = "toast-success";
            }
            toast({
                variant: type === "error" ? "destructive" : "default",
                title: type.charAt(0).toUpperCase() + type.slice(1),
                description: message,
                className: `toast ${toastClass}`,
            });
        }
    }, [message, type]);

    return null;
};

export default ToastContainer;
