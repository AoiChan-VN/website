export default class Component {
  $target; // Nơi render component
  $props;  // Dữ liệu truyền từ cha vào con
  $state;  // Trạng thái nội bộ

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {} // Khởi tạo dữ liệu ban đầu
  mounted() {} // Gọi sau khi đã render (dùng để call API, vẽ biểu đồ)
  
  template() { return ''; } // Trả về chuỗi HTML

  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); 
  }

  setEvent() {} // Gắn sự kiện (Event Delegation)

  // Hàm hỗ trợ gắn sự kiện nhanh
  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }

  // Cập nhật trạng thái và render lại
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
