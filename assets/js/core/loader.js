import { hasCache, getCache, setCache } from './cache.js'

export async function fetchJSON(path) {

    if (hasCache(path)) {

        return getCache(path)

    }

    const response = await fetch(path)

    if (!response.ok) {

        throw new Error(
            `Fetch failed: ${path}`
        )

    }

    const data = await response.json()

    setCache(path, data)

    return data

}
