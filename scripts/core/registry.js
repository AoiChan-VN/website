const registry = new Map();

export const register = (
    key,
    instance
) => {
    if (!key || !instance) {
        return;
    }

    registry.set(
        key,
        instance
    );
};

export const resolve = (
    key
) => {
    return registry.get(key);
};

export const unregister = (
    key
) => {
    if (!registry.has(key)) {
        return;
    }

    registry.delete(key);
};

export const clearRegistry = () => {
    registry.clear();
};

export default Object.freeze({
    register,
    resolve,
    unregister,
    clearRegistry
}); 
