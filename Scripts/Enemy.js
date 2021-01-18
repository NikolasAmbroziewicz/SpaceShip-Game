import { EnemyMissile } from "./EnemyMissile.js";
export class Enemy {
  #shotInterval = null;
  enemyMissileList = [];
  constructor(
    container,
    enemyClass,
    explosionClass,
    enemyInterval,
    lives = 1,
    ship
  ) {
    this.container = container;
    this.enemyClass = enemyClass;
    this.explosionClass = explosionClass;
    this.enemyInterval = enemyInterval;
    this.lives = lives;
    this.ship = ship;
    this.element = document.createElement("div");
    this.interval = null;
  }

  start() {
    this.#setEnemy();
    this.#updatePosition();
    if (this.enemyClass === "boss") {
      this.#shotInterval = setInterval(() => {
        const enemyMissile = new EnemyMissile(
          this.#checkPositionX(),
          this.#checkPositionY(),
          this.container,
          "missile-boss",
          this.ship,
          this.enemyClass
        );
        this.enemyMissileList.push(enemyMissile);
        enemyMissile.start();
        enemyMissile.shot();
      }, 3000);
    }
  }

  #setEnemy() {
    this.element.classList.add(`${this.enemyClass}`);
    this.container.appendChild(this.element);
    if (this.enemyClass === "boss") {
      this.element.style.top = "50px";
      this.element.style.left = `${
        window.innerWidth / 2 - this.checkPositionX()
      }px`;
    } else if (this.enemyClass !== "boss") {
      this.element.style.top = "0px";
      this.element.style.left = `${this.#randomPosition()}px`;
    }
  }

  #randomPosition() {
    return Math.abs(
      Math.floor(
        Math.random() * window.innerWidth - this.element.offsetWidth / 2
      )
    );
  }

  #updatePosition() {
    if (this.enemyClass === "boss") {
      this.interval = setInterval(() => this.#setBossPosition(), 20);
    } else if (this.enemyClass !== "boss") {
      this.interval = setInterval(
        () => this.#setNewPosition(),
        `${this.enemyInterval}`
      );
    }
  }

  #setNewPosition() {
    this.element.style.top = `${this.element.offsetTop + 1}px`;
  }

  checkPositionX = () => {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  };

  #setBossPosition() {
    if (this.checkPositionX() > this.ship.checkPositionX()) {
      setInterval(() => {
        this.element.style.left = `${parseInt(
          this.ship.checkPositionX() - this.element.offsetWidth / 2 - 1,
          10
        )}px`;
      }, 20);
    } else if (this.checkPositionX() < this.ship.checkPositionX()) {
      this.element.style.left = `${parseInt(
        this.ship.checkPositionX() - this.element.offsetWidth / 2 + 1,
        10
      )}px`;
    }
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
    clearInterval(this.#shotInterval);
    const animationmTime = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--animation-duration"
      ),
      10
    );
    setTimeout(() => this.element.remove(), animationmTime);
  }

  #checkPositionX() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }

  #checkPositionY() {
    return this.element.offsetTop + this.element.offsetHeight / 2;
  }
}
