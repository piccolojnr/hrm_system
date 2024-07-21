import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SidebarToggleProps {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
}

export const TOGGLE_BUTTON_WIDTH = 32;

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
    return (
        <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
            <Button
                onClick={() => setIsOpen?.()}
                className="rounded-md h-8"
                style={{ width: TOGGLE_BUTTON_WIDTH }}
                variant="outline"
                size="icon"
            >
                <ChevronLeft
                    className={cn(
                        "h-4 w-4 transition-transform ease-in-out duration-700",
                        isOpen === false ? "rotate-180" : "rotate-0"
                    )}
                />
            </Button>
        </div>
    );
}
