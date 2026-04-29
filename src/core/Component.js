export default class Component {
    constructor($target, props = {}) {
        this.$target = $target; // Phần tử HTML chứa component này
        this.props = props;     // Dữ liệu truyền từ ngoài vào
        this.setup();           // Khởi tạo state ban đầu
        this.render();          // Vẽ giao diện
    }

    setup() {} // Sẽ được override ở các class con

    template() { return ''; } // Trả về chuỗi HTML

    render() {
        this.$target.innerHTML = this.template();
        this.setEvent(); // Sau khi vẽ xong thì gắn sự kiện
    }

    setEvent() {} // Gắn các sự kiện click, hover...

    // Phương thức cập nhật dữ liệu và vẽ lại
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
}
