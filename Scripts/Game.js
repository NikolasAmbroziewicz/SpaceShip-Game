import { Start } from "./Start.js";
import { Spaceship } from "./Spaceship.js";
import { Enemy } from "./Enemy.js";
import { MeteorRain } from "./MeteorRain.js";

class Game extends Start {
  //Properties
  HTMLElements = {
    sky: document.querySelector("[data-sky]"),
    spaceship: document.querySelector("[data-ship]"),
    container: document.querySelector("[data-container]"),
    infoPopup: document.querySelector("[data-start-number]"),
  };
  #enemyMoveInterval = 10;
  #checkPositionInterval = null;
  #createEnemyInterval = null;
  #meteorInterval = null;
  #enemies = [];
  //Objects
  #start = new Start(this.HTMLElements.container, this.HTMLElements.infoPopup);
  #ship = new Spaceship(
    this.HTMLElements.spaceship,
    this.HTMLElements.container
  );
  #meteors = new MeteorRain(
    this.HTMLElements.container,
    this.HTMLElements.infoPopup,
    this.HTMLElements.sky,
    this.#start.level
  );

  //Methods
  startGame() {
    this.#start.startGame();
    setTimeout(() => {
      this.#ship.start();
      this.#newGame();
    }, 3000);
  }

  #newGame() {
    this.#createEnemyInterval = setInterval(() => this.#createNewEnemy(), 2000);
    this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
  }

  #createNewEnemy() {
    if (this.#start.score > 10 && this.#start.level === 1) {
      this.#toggleEnemyInterval();
      this.#meteorRain();
    } else if (this.#start.score > 15 && this.#start.level === 2) {
      this.#toggleEnemyInterval();
      this.#meteorRain();
    } else {
      const enemy = new Enemy(
        this.HTMLElements.container,
        "alien-lv-1",
        "explosion",
        this.#enemyMoveInterval
      );
      enemy.start();
      this.#enemies.push(enemy);
    }
  }

  #toggleEnemyInterval() {
    if (this.#createEnemyInterval === null) {
      this.#createEnemyInterval = setInterval(
        () => this.#createNewEnemy(),
        2000
      );
    } else {
      clearInterval(this.#createEnemyInterval);
      this.#createEnemyInterval = null;
    }
  }

  #meteorRain() {
    this.#meteors.start();
    this.#meteorInterval = setInterval(() => {
      this.#checkMeteorPosition();
    }, 1);
  }

  #checkMeteorPosition() {
    this.#meteors.listMeteors.forEach((meteor, meteorIndex, meteorArr) => {
      const meteorPosition = {
        top: meteor.element.offsetTop,
        right: meteor.element.offsetLeft + meteor.element.offsetWidth,
        bottom: meteor.element.offsetTop + meteor.element.offsetHeight,
        left: meteor.element.offsetLeft,
      };
      if (meteorPosition.top > window.innerHeight) {
        meteor.remove();
        meteorArr.splice(meteorIndex, 1);
      }
      const shipPosition = {
        top: this.#ship.space.offsetTop,
        right: this.#ship.space.offsetLeft + this.#ship.space.offsetWidth,
        bottom: this.#ship.space.offsetTop + this.#ship.space.offsetHeight,
        left: this.#ship.space.offsetLeft,
      };
      if (
        meteorPosition.bottom >= shipPosition.top &&
        meteorPosition.top <= shipPosition.bottom &&
        meteorPosition.right >= shipPosition.left &&
        meteorPosition.left <= shipPosition.right
      ) {
        this.#start.updateLives();
        meteor.remove();
        meteorArr.splice(meteorIndex, 1);
        console.log(meteorArr);
      }
      if (meteorArr.length === 0) {
        this.#toggleEnemyInterval();
        clearInterval(this.#meteorInterval);
        this.#meteors.toggleSkyClassList();
        this.#start.updateLevel();
      }
    });
  }

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
