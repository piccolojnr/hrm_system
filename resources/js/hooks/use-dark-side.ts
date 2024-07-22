import { useEffect, useState } from 'react';


export type Theme = 'light' | 'dark';

export default function useDarkSide(): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorMode = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorMode);
        root.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme, colorMode]);

    const switchTheme = (theme: Theme) => {
        setTheme(theme);
    };

    return [colorMode, switchTheme];
}
