export class Start {
  #startInformation = ["3", "2", "1", "Start!"];
  #startInfoNumber = 0;
  lives = 3;
  level = 1;
  score = 0;
  constructor(container, startInfo, gameLives, gameScore, gameLevel, modal) {
    this.container = container;
    this.startInfo = startInfo;
    this.gameLives = gameLives;
    this.gameScore = gameScore;
    this.gameLevel = gameLevel;
    this.modal = modal;
  }

  startGame() {
    this.modal.classList.add("hide");
    this.startInfo.classList.remove("hide");
    this.startInfo.innerHTML = "Are you ready?";
    this.#startAnimation();
    setTimeout(() => {
      this.startInfo.classList.add("hide");
      this.gameLives.classList.remove("hide");
      this.gameLives.classList.innerHTML = `Lives: ${this.lives}`;
      this.gameScore.classList.remove("hide");
      this.gameScore.classList.innerHTML = `Score: ${this.score}`;
      this.gameLevel.classList.remove("hide");
      this.gameLevel.classList.innerHTML = `Level: ${this.level}`;
    }, 3000);
  }

  endGame() {
    this.#startInfoNumber = 0;
    this.gameScore.classList.add("hide");
    this.gameLives.classList.add("hide");
    this.gameLevel.classList.add("hide");
    this.gameLives.classList.innerHTML = ``;
    this.lives = 3;
    this.score = 0;
    this.level = 1;
    this.#printScore();
    this.#printLives();
  }

  #startAnimation() {
    setTimeout(() => {
      this.startInfo.innerHTML = this.#startInformation[this.#startInfoNumber];
      this.#startInfoNumber++;
      if (this.#startInfoNumber < this.#startInformation.length) {
        this.#startAnimation();
      }
    }, 600);
  }

  updateLevel() {
    this.level++;
    this.gameLevel.innerHTML = `Level: ${this.level}`;
  }

  updateScore() {
    this.score++;
    this.#printScore();
  }

  #printScore() {
    this.gameScore.innerHTML = `Score: ${this.score}`;
  }

  updateLives() {
    this.lives--;
    this.#printLives();
    this.gameLives.style.color = "red";
    this.container.classList.add("hit");
    setTimeout(() => {
      this.gameLives.style.color = "white";
      this.container.classList.remove("hit");
    }, 150);
  }

  #printLives() {
    this.gameLives.innerHTML = `Lives: ${this.lives}`;
  }
}
