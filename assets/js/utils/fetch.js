export async function fetchText(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed fetch: ${path}`);
    }

    return await response.text();
}