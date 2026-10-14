import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(initialValue);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null){
                setValue(JSON.parse(saved));
            }
        } catch (err) {
            console.error(`Could not read "${key}" from storage`, err);
        }
        setLoaded(true);
    }, [key]);

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(`Could not save "${key}" to storage`, err);
        }
    }, [key, value, loaded]);

    return [value, setValue, loaded];
}