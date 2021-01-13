export class Enemy {
  constructor(container, enemyClass, explosionClass, enemyInterval, lives = 1) {
    this.container = container;
    this.enemyClass = enemyClass;
    this.explosionClass = explosionClass;
    this.enemyInterval = enemyInterval;
    this.lives = lives;
    this.element = document.createElement("div");
    this.interval = null;
  }

  start() {
    this.#setEnemy();
    this.#updatePosition();
  }

  #setEnemy() {
    this.element.classList.add(`${this.enemyClass}`);
    this.container.appendChild(this.element);
    this.element.style.top = "0px";
    this.element.style.left = `${this.#randomPosition()}px`;
  }

  #randomPosition() {
    return Math.abs(
      Math.floor(Math.random() * window.innerWidth - this.element.offsetWidth)
    );
  }

  #updatePosition() {
    this.interval = setInterval(
      () => this.#setNewPosition(),
      `${this.enemyInterval}`
    );
  }

  #setNewPosition() {
    this.element.style.top = `${this.element.offsetTop + 1}px`;
  }

  hit() {
    this.lives--;
    if (!this.lives) {
      this.explode();
    }
  }

  explode() {
    this.element.classList.remove(this.enemyClass);
    this.element.classList.add(this.explosionClass);
    clearInterval(this.interval);
    const animationmTime = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--animation-duration"
      ),
      10
    );
    setTimeout(() => this.element.remove(), animationmTime);
  }
}
