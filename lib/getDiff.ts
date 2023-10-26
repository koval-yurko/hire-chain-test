export function getDiff(initialData?: Record<string, string>, newData?: Record<string, string>): Record<string, string> | null {
    let res: Record<string, string> | null = null;
    if (!newData) {
        return res;
    }
    Object.keys(newData).forEach((key) => {
        if (newData[key] && (!initialData || !initialData[key] || initialData[key] !== newData[key])) {
            res = res || {};
            res[key] = newData[key];
        }
    });
    return res;
}
