import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/Components/ui/tooltip";
import useDarkSide, { Theme } from "@/hooks/use-dark-side";
import { MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
    const [colorMode, switchTheme] = useDarkSide();

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="rounded-full w-8 h-8 bg-background"
                        variant="outline"
                        size="icon"
                        onClick={() => switchTheme(colorMode)}
                    >
                        <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
                        <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
                        <span className="sr-only">Switch Theme</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Switch Theme</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
