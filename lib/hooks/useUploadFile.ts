import {useState, useCallback} from 'react';

export function useUploadFile() {
    const [error, setError] = useState<Error | null>(null)

    const mutate = useCallback(async (imageFile: File) => {
        setError(null)
        const formData = new FormData();

        formData.append(
            "imageFile",
            imageFile,
            imageFile.name
        );

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });
            const json = await response.json();
            return json.pfp
        } catch (err) {
            setError(err)
        }
    }, [setError])

    return { mutate, error }
}
