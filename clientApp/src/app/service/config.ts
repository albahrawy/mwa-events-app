const apiUrl: string = 'http://localhost:3000';

export function getUrl(...route) {
    return joinPath(apiUrl, ...route);
}

function joinPath(...args: string[]): string {
    return args.map(s => fixString(s)).join('/');

    function fixString(v: string) {
        if (!v) { return ''; }
        let needFix = false;
        if (v.endsWith('://')) { needFix = true; }
        return trimLeftEx((trimRightEx(v.trim(), '/').trim()), '/') + (needFix ? '/' : '').trim();
    }

    function trimRightEx(value: String, charlist: String) {
        charlist = charlist ?? '\s';
        if (charlist === '\\') { charlist = '\\\\'; }
        return value?.replace(new RegExp('[' + charlist + ']+$'), '');
    }

    function trimLeftEx(value: String, charlist: string): string {
        charlist = charlist ?? '\s';
        if (charlist === '\\') { charlist = '\\\\'; }

        return value?.replace(new RegExp('^[' + charlist + ']+'), '');
    };

}