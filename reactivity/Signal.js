/**
 * Signal-based Reactivity: Theo dõi phụ thuộc tự động.
 * Không sử dụng Dirty Checking, chỉ cập nhật nơi cần thiết.
 */
let context = [];

export function createSignal(value) {
    const subscriptions = new Set();

    const read = () => {
        const observer = context[context.length - 1];
        if (observer) subscriptions.add(observer);
        return value;
    };

    const write = (newValue) => {
        if (value === newValue) return;
        value = newValue;
        [...subscriptions].forEach(sub => sub.execute());
    };

    return [read, write];
}

export function createEffect(callback) {
    const effect = {
        execute() {
            context.push(effect);
            try {
                callback();
            } finally {
                context.pop();
            }
        }
    };
    effect.execute();
}
