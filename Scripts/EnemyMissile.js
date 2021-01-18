export class EnemyMissile {
  constructor(x, y, container, type, ship, enemyClass) {
    this.x = x;
    this.y = y;
    this.container = container;
    this.type = type;
    this.ship = ship;
    this.enemyClass = enemyClass;

    this.element = document.createElement("div");
    this.interval = null;
  }

  start() {
    this.element.classList.add(`${this.type}`);
    this.container.appendChild(this.element);
    this.element.style.left = `${this.x + this.element.offsetWidth / 2 - 30}px`;
    this.element.style.top = `${this.y + this.element.offsetTop + 40}px`;
  }

  shot() {
    this.interval = setInterval(
      () => (this.element.style.top = `${this.element.offsetTop + 1}px`),
      1
    );
  }

  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
