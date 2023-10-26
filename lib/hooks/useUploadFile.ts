import {useState, useCallback} from 'react';

export function useUploadFile() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = useCallback(async (imageFile: File) => {
        setIsLoading(true)
        setError(null);

        try {
            const formData = new FormData();

            formData.append(
                "imageFile",
                imageFile,
                imageFile.name
            );

            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });
            const json = await response.json();
            return json.pfp;
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false)
        }
    }, [setError]);

    return { mutate, isLoading, error };
}
