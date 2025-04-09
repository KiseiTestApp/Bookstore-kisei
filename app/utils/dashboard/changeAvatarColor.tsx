export const getLastName = (name: string | undefined): string => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1].charAt(0).toUpperCase();
}

export const nameToColor = (name: string): string => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.abs(hash % 360)}, 40%, 60%)`;
};