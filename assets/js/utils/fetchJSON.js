export async function fetchJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
