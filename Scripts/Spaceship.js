import { Missile } from "./Missile.js";

export class Spaceship {
  missiles = [];
  #shipProperties = {
    stepMove: 5,
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
  };

  constructor(ship, container) {
    this.space = ship;
    this.container = container;
  }

  start() {
    this.#setPosition();
    this.#shipMove();
    this.#gameLoop();
  }

  #setPosition() {
    this.space.classList.remove("hide");
    this.space.style.bottom = "0px";
    this.space.style.left = `${
      window.innerWidth / 2 - this.checkPositionX()
    }px`;
  }

  checkPositionX() {
    return this.space.offsetLeft + this.space.offsetWidth / 2;
  }

  checkPositionY() {
    return this.space.offsetTop + this.space.offsetHeight / 2;
  }

  #shipMove() {
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.#shipProperties.leftArrow = true;
          break;
        case 38:
          this.#shipProperties.upArrow = true;
          break;
        case 39:
          this.#shipProperties.rightArrow = true;
          break;
        case 40:
          this.#shipProperties.downArrow = true;
          break;
      }
    });
    window.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 32:
          this.#shot();
          break;
        case 37:
          this.#shipProperties.leftArrow = false;
          break;
        case 38:
          this.#shipProperties.upArrow = false;
          break;
        case 39:
          this.#shipProperties.rightArrow = false;
          break;
        case 40:
          this.#shipProperties.downArrow = false;
          break;
      }
    });
  }

  #gameLoop = () => {
    this.#pushKey();
    requestAnimationFrame(this.#gameLoop);
  };

  #pushKey() {
    if (this.#shipProperties.leftArrow && this.checkPositionX() > 0) {
      this.space.style.left = `${
        parseInt(this.space.style.left, 10) - this.#shipProperties.stepMove
      }px`;
    }
    if (this.#shipProperties.upArrow && this.checkPositionY() > 0) {
      this.space.style.bottom = `${
        parseInt(this.space.style.bottom, 10) + this.#shipProperties.stepMove
      }px`;
    }
    if (
      this.#shipProperties.rightArrow &&
      this.checkPositionX() < window.innerWidth
    ) {
      this.space.style.left = `${
        parseInt(this.space.style.left, 10) + this.#shipProperties.stepMove
      }px`;
    }
    if (
      this.#shipProperties.downArrow &&
      this.checkPositionY() < window.innerHeight
    ) {
      this.space.style.bottom = `${
        parseInt(this.space.style.bottom, 10) - this.#shipProperties.stepMove
      }px`;
    }
  }

  #shot() {
    const missile = new Missile(
      this.checkPositionX(),
      this.checkPositionY(),
      this.container
    );
    missile.start();
    this.missiles.push(missile);
  }

  endGame() {
    this.container.classList.add("hide");
  }
}
