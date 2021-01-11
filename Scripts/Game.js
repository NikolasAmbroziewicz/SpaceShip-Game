import { Start } from "./Start.js";
import { Spaceship } from "./Spaceship.js";
import { Enemy } from "./Enemy.js";

class Game extends Start {
  HTMLElements = {
    spaceship: document.querySelector("[data-ship]"),
    container: document.querySelector("[data-container]"),
  };
  #start = new Start(this.HTMLElements.container);
  #ship = new Spaceship(
    this.HTMLElements.spaceship,
    this.HTMLElements.container
  );
  #enemyInterval = null;
  #checkPositionInterval = null;
  #createEnemyInterval = null;
  #enemies = [];
  startGame() {
    this.#start.startGame();
    this.#ship.start();
    this.#newGame();
  }

  #newGame() {
    this.#enemyInterval = 30;
    this.#createEnemyInterval = setInterval(() => this.#createNewEnemy(), 1000);
    this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
  }

  #createNewEnemy() {
    const enemy = new Enemy(
      this.HTMLElements.container,
      "alien-lv-1",
      "explosion"
    );
    enemy.start();
    this.#enemies.push(enemy);
  }

  #endGame() {}

  #checkPosition() {
    this.#enemies.forEach((enemy, enemyIndex, enemiesArr) => {
      const enemyPosition = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft,
      };
      if (enemyPosition.top > window.innerHeight) {
        enemy.explode();
        enemiesArr.splice(enemyIndex, 1);
        this.#start.updateLives();
      }
      this.#ship.missiles.forEach((missile, missileIndex, missileArr) => {
        const missilePosition = {
          top: missile.element.offsetTop,
          right: missile.element.offsetLeft + missile.element.offsetWidth,
          bottom: missile.element.offsetTop + missile.element.offsetHeight,
          left: missile.element.offsetLeft,
        };
        if (
          missilePosition.bottom >= enemyPosition.top &&
          missilePosition.top <= enemyPosition.bottom &&
          missilePosition.right >= enemyPosition.left &&
          missilePosition.left <= enemyPosition.right
        ) {
          enemy.hit();
          if (!enemy.lives) {
            enemiesArr.splice(enemyIndex, 1);
          }
          missile.remove();
          missileArr.splice(missileIndex, 1);
          this.#start.updateScore();
        }
        if (missilePosition.bottom < 0) {
          missile.remove();
          missileArr.splice(missileIndex, 1);
        }
      });
    });
  }
}

const game = new Game();

document.querySelector("[data-modal-button]").addEventListener("click", () => {
  game.startGame();
});
