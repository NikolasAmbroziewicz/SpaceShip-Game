export class Start {
  #startInformation = ["3", "2", "1", "Start!"];
  #startInfoNumber = 0;
  lives = 3;
  level = 1;
  score = 9;
  constructor(container, startInfo) {
    this.container = container;
    this.startInfo = startInfo;
    this.modal = document.querySelector("[data-modal]");
    this.gameLives = document.querySelector("[data-lives]");
    this.gameScore = document.querySelector("[data-score]");
    this.gameLevel = document.querySelector("[data-level]");
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

  resetGame() {}
}
