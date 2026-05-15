// extensions/sample-extension/extension.js

class SampleExtension {

    constructor() {
        this.id = 'sample-extension';

        this.enabled = false;
    }

    async enable() {

        if (this.enabled) {
            return;
        }

        this.enabled = true;

        document.documentElement.dataset.extensionSample =
            'enabled';

        console.info(
            '[AOI] Sample Extension Enabled'
        );
    }

    async disable() {

        if (!this.enabled) {
            return;
        }

        this.enabled = false;

        delete document.documentElement.dataset.extensionSample;

        console.info(
            '[AOI] Sample Extension Disabled'
        );
    }

    async initialize() {

        await this.enable();
    }
}

const extension =
    new SampleExtension();

export default extension; 
