export function setStorage(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

export function getStorage(key) {

    const value =
        localStorage.getItem(key);

    if (!value) {
        return null;
    }

    try {

        return JSON.parse(value);

    } catch {

        return null;

    }

} 
