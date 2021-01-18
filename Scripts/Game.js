import { Start } from "./Start.js";
import { Spaceship } from "./Spaceship.js";
import { Enemy } from "./Enemy.js";
import { MeteorRain } from "./MeteorRain.js";

export class Game {
  //Properties
  HTMLElements = {
    sky: document.querySelector("[data-sky]"),
    spaceship: document.querySelector("[data-ship]"),
    container: document.querySelector("[data-container]"),
    infoPopup: document.querySelector("[data-start-number]"),
    gameLives: document.querySelector("[data-lives]"),
    gameScore: document.querySelector("[data-score]"),
    gameLevel: document.querySelector("[data-level]"),
    modal: document.querySelector("[data-modal]"),
    dataFinalScore: document.querySelector("[data-modal]"),
    dataFinalText: document.querySelector("[data-text]"),
    buttonModalGame: document.querySelector("[data-modal-button]"),
  };
  #enemyMoveInterval = 10;
  #checkPositionInterval = null;
  #createEnemyInterval = null;
  #meteorInterval = null;
  #checkEnemyShot = null;
  #enemies = [];
  #bossResp = false;
  //Objects
  #start = new Start(
    this.HTMLElements.container,
    this.HTMLElements.infoPopup,
    this.HTMLElements.gameLives,
    this.HTMLElements.gameScore,
    this.HTMLElements.gameLevel,
    this.HTMLElements.modal
  );
  ship = new Spaceship(
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
    this.HTMLElements.buttonModalGame.addEventListener("click", () => {
      this.#start.startGame();
      setTimeout(() => {
        this.ship.start();
        this.#newGame();
      }, 3000);
    });
  }

  #newGame() {
    this.#createEnemyInterval = setInterval(() => this.#randomEnemy(), 1500);
    this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
  }

  #endGame() {
    clearInterval(this.#checkPositionInterval);
    clearInterval(this.#createEnemyInterval);
    clearInterval(this.#meteorInterval);
    clearInterval(this.#checkEnemyShot);
    this.HTMLElements.modal.classList.remove("hide");
    this.HTMLElements.dataFinalText.innerHTML = `Game Over!`;
    this.#enemies.forEach((enemy) => enemy.explode());
    this.HTMLElements.spaceship.classList.add("hide");
    this.#start.endGame();
  }

  //chose Enemy
  #randomEnemy() {
    if (this.#start.level === 2) {
      let number = Math.floor(Math.random() * 4);
      number % 3 === 0
        ? this.#createNewEnemy(
            this.HTMLElements.container,
            "alien-lv-2",
            "explosion-big",
            this.#enemyMoveInterval * 2,
            3
          )
        : this.#createNewEnemy(
            this.HTMLElements.container,
            "alien-lv-1",
            "explosion",
            this.#enemyMoveInterval
          );
    } else if (this.#start.level === 3) {
      let number = Math.floor(Math.random() * 6);
      if (number === 3) {
        this.#createNewEnemy(
          this.HTMLElements.container,
          "alien-lv-2",
          "explosion-big",
          this.#enemyMoveInterval * 2,
          3
        );
      } else if (number === 5) {
        his.#createNewEnemy(
          this.HTMLElements.container,
          "alien-lv-3",
          "explosion-big",
          this.#enemyMoveInterval * 2,
          5
        );
      } else {
        this.#createNewEnemy(
          this.HTMLElements.container,
          "alien-lv-1",
          "explosion",
          this.#enemyMoveInterval
        );
      }
    } else if (this.#start.level >= 4) {
      if (this.#start.level % 4 === 0) {
        this.#checkEnemyShot = setInterval(() => {
          this.#enemyMissileMove();
        });
        this.#createNewEnemy(
          this.HTMLElements.container,
          "boss",
          "explosion-big",
          this.#enemyMoveInterval * 2,
          10,
          this.ship
        );
      } else {
        let number = Math.floor(Math.random() * 6);
        if (number === 3) {
          this.#createNewEnemy(
            this.HTMLElements.container,
            "alien-lv-2",
            "explosion-big",
            this.#enemyMoveInterval * 2,
            3
          );
        } else if (number === 5) {
          this.#createNewEnemy(
            this.HTMLElements.container,
            "alien-lv-3",
            "explosion-big",
            this.#enemyMoveInterval * 2,
            5
          );
        } else {
          this.#createNewEnemy(
            this.HTMLElements.container,
            "alien-lv-1",
            "explosion",
            this.#enemyMoveInterval
          );
        }
      }
    } else {
      this.#createNewEnemy(
        this.HTMLElements.container,
        "alien-lv-1",
        "explosion",
        this.#enemyMoveInterval
      );
    }
  }

  #createNewEnemy(...params) {
    if (
      (this.#start.score > 20 && this.#start.level === 1) ||
      (this.#start.score > 40 && this.#start.level === 2) ||
      (this.#start.score > 60 && this.#start.level === 3) ||
      (this.#start.score > 80 && this.#start.level === 4) ||
      (this.#start.score > 100 && this.#start.level === 5)
    ) {
      this.#toggleEnemyInterval();
      this.#meteorRain();
      this.#enemyMoveInterval--;
    } else {
      const enemy = new Enemy(...params);
      enemy.start();
      this.#enemies.push(enemy);
    }
  }

  #toggleEnemyInterval() {
    if (this.#createEnemyInterval === null) {
      this.#createEnemyInterval = setInterval(() => this.#randomEnemy(), 2000);
      clearInterval(this.#meteorInterval);
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

  #enemyMissileMove() {
    this.#enemies.forEach((enemy) => {
      enemy.enemyMissileList.forEach(
        (enemyMiss, enemyMissIndex, enemiesMissArr) => {
          const enemyMissPosition = {
            top: enemyMiss.element.offsetTop,
            right: enemyMiss.element.offsetLeft + enemyMiss.element.offsetWidth,
            bottom:
              enemyMiss.element.offsetTop + enemyMiss.element.offsetHeight,
            left: enemyMiss.element.offsetLeft,
          };
          console.log(`${enemyMissPosition.top}`);
          if (enemyMissPosition.top > window.innerHeight) {
            enemyMiss.remove();
            enemiesMissArr.splice(enemyMissIndex, 1);
          }
          const shipPosition = {
            top: this.ship.space.offsetTop,
            right: this.ship.space.offsetLeft + this.ship.space.offsetWidth,
            bottom: this.ship.space.offsetTop + this.ship.space.offsetHeight,
            left: this.ship.space.offsetLeft,
          };
          if (
            enemyMissPosition.bottom >= shipPosition.top &&
            enemyMissPosition.top <= shipPosition.bottom &&
            enemyMissPosition.right >= shipPosition.left &&
            enemyMissPosition.left <= shipPosition.right
          ) {
            if (this.#start.lives > 0) {
              this.#start.updateLives();
            } else {
              this.#endGame();
            }
            enemyMiss.remove();
            enemiesMissArr.splice(enemyMissIndex, 1);
          }
        }
      );
    });
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
        top: this.ship.space.offsetTop,
        right: this.ship.space.offsetLeft + this.ship.space.offsetWidth,
        bottom: this.ship.space.offsetTop + this.ship.space.offsetHeight,
        left: this.ship.space.offsetLeft,
      };
      if (
        meteorPosition.bottom >= shipPosition.top &&
        meteorPosition.top <= shipPosition.bottom &&
        meteorPosition.right >= shipPosition.left &&
        meteorPosition.left <= shipPosition.right
      ) {
        if (this.#start.lives > 0) {
          this.#start.updateLives();
        } else {
          this.#endGame();
        }
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
        if (this.#start.lives > 0) {
          this.#start.updateLives();
        } else {
          this.#endGame();
        }
      }
      this.ship.missiles.forEach((missile, missileIndex, missileArr) => {
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

window.onload = () => {
  const game = new Game();
  game.startGame();
};
