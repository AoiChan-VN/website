export default class Component {
  $target; $props; $state;
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {} // Khởi tạo state
  mounted() {} // Gọi sau khi render (gọi API, init plugin ngoài)
  template() { return ''; } // HTML string
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
  setEvent() {} // Gán sự kiện tại đây
}
