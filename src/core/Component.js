// core/Component.js
export default class Component {
  constructor({ target, props = {} }) {
    this.target = target;
    this.props = props;

    this.setup();
    this.render();
    this.setEvent();
    this.mounted();
  }

  // Lifecycle hooks
  setup() {}
  template() {
    return "";
  }
  mounted() {}

  render() {
    this.target.innerHTML = this.template();
  }

  // 🔥 Event Delegation System
  setEvent() {
    this.addEvent("click", "[data-action]", this.handleAction.bind(this));
  }

  addEvent(eventType, selector, callback) {
    this.target.addEventListener(eventType, (e) => {
      const potentialTargets = this.target.querySelectorAll(selector);
      const target = e.target.closest(selector);

      if (!target) return;

      if ([...potentialTargets].includes(target)) {
        callback(e, target);
      }
    });
  }

  handleAction(e, target) {
    const action = target.dataset.action;
    if (this[action]) {
      this[action](e, target);
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  } 
