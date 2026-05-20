export class ErrorBoundary {
    initialize() {
        window.addEventListener(
            'error',
            this.handleError
        );

        window.addEventListener(
            'unhandledrejection',
            this.handlePromiseError
        );
    }

    handleError = (event) => {
        console.error(
            '[Runtime Error]',
            event.error
        );
    };

    handlePromiseError = (event) => {
        console.error(
            '[Unhandled Promise]',
            event.reason
        );
    };

    destroy() {
        window.removeEventListener(
            'error',
            this.handleError
        );

        window.removeEventListener(
            'unhandledrejection',
            this.handlePromiseError
        );
    }
} 
