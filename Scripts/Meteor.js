export class Meteor {
  constructor(container, meteorClass) {
    this.container = container;
    this.meteorClass = meteorClass;
    this.element = document.createElement("div");
    this.interval = null;
  }

  start() {
    this.#setMeteor();
    this.#updatePosition();
  }

  #setMeteor() {
    this.element.classList.add(`${this.meteorClass}`);
    this.container.appendChild(this.element);
    this.element.style.top = "0px";
    this.element.style.left = `${this.#randomPosition()}px`;
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

  #randomPosition() {
    return Math.abs(
      Math.floor(Math.random() * window.innerWidth - this.element.offsetWidth)
    );
  }

  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
