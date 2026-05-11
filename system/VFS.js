/**
 * Virtual File System: Quản lý cấu trúc cây thư mục ảo của OS.
 */
class VFS {
    #tree = {
        'aoi:': {
            'desktop': { type: 'page', component: 'DesktopPage' },
            'settings': { type: 'page', component: 'SettingsPage' },
            'sys': {
                'bin': {},
                'etc': { 'config.json': '{ "version": "1.0.0" }' }
            }
        }
    };

    resolve(path) {
        const segments = path.split('/').filter(p => p !== '');
        let current = this.#tree;

        for (const segment of segments) {
            if (current[segment]) {
                current = current[segment];
            } else {
                return null;
            }
        }
        return current;
    }
}

export const vfs = new VFS();
 
