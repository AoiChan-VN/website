import { requestJSON } from '../utils/request.js';

export async function loadTreeRegistry() {
    return requestJSON('./database/aoi_tree.json');
} 
