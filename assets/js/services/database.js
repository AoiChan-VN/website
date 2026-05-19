export async function loadDatabase(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed database: ${path}`);
    }

    return await response.json();
}