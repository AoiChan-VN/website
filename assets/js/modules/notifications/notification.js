import { notificationTemplate }
from "./notification.template.js";

export function pushNotification(
  message = ""
) {

  const wrapper =
    document.createElement("div");

  wrapper.innerHTML =
    notificationTemplate(message);

  const element =
    wrapper.firstElementChild;

  document.body.appendChild(
    element
  );

  requestAnimationFrame(() => {

    element.classList.add(
      "notification-visible"
    );

  });

  setTimeout(() => {

    element.classList.remove(
      "notification-visible"
    );

    setTimeout(() => {

      element.remove();

    }, 400);

  }, 2500);

} 
