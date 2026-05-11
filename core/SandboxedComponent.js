import { Component } from './Component.js';
import { SecurityManager } from '../system/SecurityManager.js';

/**
 * SandboxedComponent: Dành cho ứng dụng bên thứ ba.
 * Giới hạn khả năng gây lỗi cho hệ thống chính.
 */
export class SandboxedComponent extends Component {
    constructor(props) {
        super(props);
        return SecurityManager.createSandbox(this);
    }
}
 
