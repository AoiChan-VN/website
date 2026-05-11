/**
 * EventBus: Cơ chế Publish/Subscribe toàn hệ thống.
 * Đảm bảo các Component không bị tightly coupled.
 */
class EventBus {
    #events = {};

    on(event, callback) {
        if (!this.#events[event]) this.#events[event] = [];
        this.#events[event].push(callback);
        return () => this.off(event, callback); // Unsubscribe function
    }

    off(event, callback) {
        if (!this.#events[event]) return;
        this.#events[event] = this.#events[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this.#events[event]) return;
        this.#events[event].forEach(callback => callback(data));
    }
}

export const eventBus = new EventBus();
 
