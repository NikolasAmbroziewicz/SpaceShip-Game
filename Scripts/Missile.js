export class Missile {
  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.container = container;
    this.element = document.createElement("div");
    this.interval = null;
  }

  start() {
    this.element.classList.add("missile-ship");
    this.container.appendChild(this.element);
    this.element.style.left = `${this.x - this.element.offsetWidth / 2 - 2}px`;
    this.element.style.top = `${this.y - this.element.offsetTop - 45}px`;
    this.interval = setInterval(
      () => (this.element.style.top = `${this.element.offsetTop - 1}px`),
      1
    );
  }

  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
