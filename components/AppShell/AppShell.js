import { Component } from '../../core/Component.js';
import { AppShellTemplate } from './AppShell.template.js';

/**
 * AppShell: Root Component của hệ điều hành.
 */
export class AppShell extends Component {
    constructor(props) {
        super(props);
    }

    onMount() {
        console.info('AppShell: Mounted to DOM.');
        // Load CSS dynamically cho component
        this.#loadStyles();
    }

    #loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/AppShell/AppShell.style.css';
        document.head.appendChild(link);
    }

    render() {
        return AppShellTemplate(this.props, this.state);
    }
}
 
