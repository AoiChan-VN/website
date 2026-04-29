export default class Component {
    constructor($target, props = {}) {
        this.$target = $target;
        this.props = props;
        this.setup();
        this.render();
    }
    setup() {}
    async template() { return ''; } 
    async render() {
        // Đợi template xử lý xong (đọc file, lọc data)
        const html = await this.template();
        this.$target.innerHTML = html;
        this.mounted();
        this.setEvent();
    }
    mounted() {} 
    setEvent() {}
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
}
