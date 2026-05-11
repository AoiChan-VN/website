/**
 * BaseService: Quy định interface cho mọi service.
 */
export class BaseService {
    constructor() {
        if (this.constructor === BaseService) {
            throw new Error("Cannot instantiate abstract class BaseService.");
        }
    }
}
 
