export class EnemyMissile {
  constructor(x, y, container, type) {
    this.x = x;
    this.y = y;
    this.container = container;
    this.type = type;
    this.element = document.createElement("div");
    this.interval = null;
    this.type = null;
  }
  start() {
    this.element.classList.add(`${this.type}`);
    this.container.appendChild(this.element);
    this.element.style.left = `${this.x - this.element.offsetWidth / 2 - 2}px`;
    this.element.style.top = `${this.y - this.element.offsetTop - 45}px`;
  }

  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
